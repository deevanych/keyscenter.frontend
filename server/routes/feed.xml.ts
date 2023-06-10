import { ProductsAPI } from '~/api/products';
import xml from 'xml'
import { ShortProduct } from '~/models/Product';
import { H3Event } from 'h3';
import dayjs from 'dayjs';
import { CategoryAPI } from '~/api/category';

export default defineEventHandler(async (event: H3Event) => {
	const {data} = await ProductsAPI.list()
	const { data: categories } = await CategoryAPI.list()

	const xmlObject = {
		yml_catalog: [{
			_attr: {
				date: dayjs().format('YYYY-MM-DD HH:mm')
			}},
			{
				shop: [
					{name: 'Keyscenter'},
					{company: 'Keyscenter'},
					{email: 'support@keyscenter.ru'},
					{url: useRuntimeConfig().public.baseUrl},
					{currencies: [{
							currency: {_attr: {id: 'RUR', rate: 1}}
						}]},
					{categories: categories.map(category => {
return {
	category: [{_attr: {id: category.id}}, category.attributes.title]
}
						})
						},
					{
				offers: data.map(product => {
				const productInstance = new ShortProduct(product)
				const url = new URL(`/catalog/${productInstance.categorySlug}/${productInstance.slug}`,
					useRuntimeConfig().public.baseUrl)
				const images = productInstance.imagesByFormat('medium').map(image => {
					const imageUrl = new URL(image.url,
						useRuntimeConfig().public.backendUrl)

					return {picture: imageUrl.href}
				})

				return {
					offer: [{
						_attr: {id: productInstance.id, available: productInstance.isInStock}
					},
						{url: url.href},
						{categoryId: productInstance.categoryId},
						{price: productInstance.salePrice},
						{oldprice: productInstance.price},
						{currencyId: 'RUR'},
						{count: productInstance.availableCount},
						...images,
						{store: productInstance.isInStock},
						{name: productInstance.title},
						{description: productInstance.metaDescription}
					]
				}
			})
		}]
			}]
	}

	event.node.res.setHeader('Content-Type', 'text/xml')
	event.node.res.end(xml(xmlObject, { declaration: true }))
})
