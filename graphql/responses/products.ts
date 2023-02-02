interface IGQLProductShowResponse {
	id: number,
	attributes: {
		title: string,
		price: number,
		salePrice: number,
		createdAt: Date,
		updatedAt: Date,
		slug: string,
		product_keys: {
			data: [
				{
					'__typename': "ProductKeyEntity"
				}
			]
		}
		images: {
			data: [
				{
					attributes: {
						url: string
					}
				}
			]
		}
	}
}

interface IGQLProductsListResponse {
	products: {
		data: IGQLProductShowResponse[]
	}
}
