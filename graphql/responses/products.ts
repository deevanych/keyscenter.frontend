interface IGQLProductShowResponse {
	id: number,
	attributes: {
		title: string,
		price: number,
		salePrice: number,
		createdAt: Date,
		updatedAt: Date,
		slug: string
	}
}

interface IGQLProductsListResponse {
	products: {
		data: IGQLProductShowResponse[]
	}
}
