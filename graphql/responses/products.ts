interface IGQLProductShowResponse {
	id: number,
	attributes: {
		title: string,
		price: number,
		salePrice: number,
		createdAt: Date,
		updatedAt: Date,
		slug: string,
		views: number,
		product_type: {
			data: {
				attributes: {
					title: string
				}
			}
		}
		delivery_method: {
			data: {
				attributes: {
					title: string
				}
			}
		},
		description: string,
		instruction: string,
		product_keys: {
			data: [
				{
					'__typename': "ProductKeyEntity"
				}
			]
		}
		platforms: {
			data: [
				{
					attributes: {
						title: string
					}
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
