import { ProductsAPI } from '~/api/products';
import xml from 'xml'
import { ShortProduct } from '~/models/Product';
import { H3Event } from 'h3';

export default defineEventHandler(async (event: H3Event) => {
	const {data} = await ProductsAPI.list()
	const xmlObject = {
		offers: data.map(product => {
			const productInstance = new ShortProduct(product)
			const url = new URL(`/catalog/${productInstance.categorySlug}/${productInstance.slug}`,
				useRuntimeConfig().public.baseUrl)
			const images = productInstance.imagesByFormat('medium').map(image => {
				const imageUrl = new URL(image.url,
					useRuntimeConfig().public.backendUrl)

				return { picture: imageUrl.href }
			})

			console.log(images)
			return {
				offer: [{
					_attr: {id: productInstance.id, available: productInstance.isInStock}
				},
					{url: url.href},
					{price: productInstance.salePrice},
					{oldPrice: productInstance.price},
					{currencyId: 'RUB'},
					{categoryId: productInstance.categorySlug},
					...images,
					{store: productInstance.isInStock},
					{name: productInstance.title},
					{description: productInstance.metaDescription}
				]
			}
		})
	}

	event.node.res.setHeader('Content-Type', 'application/xml')
	// event.node.res.write(xml(xmlObject, { declaration: true }))

	event.node.res.end(xml(xmlObject, { declaration: true }))
})
