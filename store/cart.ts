import {defineStore, StoreDefinition} from 'pinia'
import {CartItem} from "~/models/CartItem";
import {Product} from "~/models/Product";

interface ICartStoreState {
	items: CartItem[]
}

export const useCartStore: StoreDefinition<"cart", ICartStoreState> = defineStore('cart', {
	state: (): ICartStoreState => {
		return {
			items: [] as CartItem[]
		}
	},
	getters: {
		getItemById: (state: ICartStoreState): (id: number) => CartItem | undefined => {
			return (id: number): CartItem | undefined => state.items.find((item: CartItem) => item.id === id)
		},
		getItemsCount: (state: ICartStoreState): number => state.items.length,
		getItems: (state: ICartStoreState): CartItem[] => state.items
	},
	actions: {
		addToCart(productId: number, quantity: number = 1, product?: Product): void {
			const existsItem: CartItem | undefined = this.items.find((item: CartItem) => item.id === productId)

			if (existsItem) {
				existsItem.quantity = quantity
			} else {
				if (product) {
					this.items.push(new CartItem(product, quantity))
				}
			}
		}
	},
	persist: true
})
