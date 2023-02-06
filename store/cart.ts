import { defineStore } from 'pinia'

export interface ICartItem {
	id: number;
	count: number;
}

export const useCartStore = defineStore('cart', {
	state: () => {
		return {
			items: [] as ICartItem[]
		}
	},
	getters: {
		getItemById: (state) => {
			return (id: number) => state.items.find((item: ICartItem) => item.id === id)
		},
		getItemsCount: (state) => state.items.length
	},
	actions: {
		addToCart(id: number, count: number) {
			const existsItem = this.items.find((item: ICartItem) => item.id === id)

			if (existsItem) {
				if (existsItem.count !== count) {
					existsItem.count = count
				}
			} else {
				this.items.push({id, count})
			}
		}
	},
	persist: true
})
