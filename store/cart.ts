import {defineStore, StoreDefinition} from 'pinia'
import {CartItem} from "~/models/CartItem";
import {Product} from "~/models/Product";
import {OrdersAPI} from "~/api/orders";
import IOrderItem = OrdersAPI.IOrderItem;

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
		getItems: (state: ICartStoreState): CartItem[] => state.items,
		getTotalSum: (state: ICartStoreState): number => state.items.reduce((sum: number, item: CartItem) => {
			return sum + item.quantity * item.price
		}, 0),
		getOrderItems: (state: ICartStoreState): IOrderItem[] => state.items.map(({id, quantity}: CartItem) => {
			return {id, quantity}
		})
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
		},
		async createOrder(email: string): Promise<void> {
			return await OrdersAPI.create({
				email,
				items: this.getOrderItems
			})
		}
	},
	persist: true
})
