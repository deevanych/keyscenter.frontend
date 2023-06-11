import { ProductsAPI } from '~/api/products';
import { ShortProduct } from '~/models/Product';
import { PageAPI } from '~/api/page';

export default cachedEventHandler(async () => {
	const routes = []
	const [
		{data: products},
		{data: pages}
	] = await Promise.all([
		ProductsAPI.list(),
		PageAPI.list()
	])
	routes.push(...products.map((product) => {
			const productInstance = new ShortProduct(product)

			return {
				loc: `/catalog/${productInstance.categorySlug}/${productInstance.slug}`,
				lastmod: productInstance.updatedAt
			}
		})
	)
	routes.push(...pages.map((page: { attributes: { slug: string, updatedAt: string }}) => {
			return {
				loc: `/${page.attributes.slug}`,
				lastmod: page.attributes.updatedAt
			}
		})
	)

	return routes
}, {
	name: 'sitemap-dynamic-urls',
	maxAge: 60 * 10 // cache URLs for 10 minutes
})
