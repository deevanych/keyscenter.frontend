import {defineStore, StoreDefinition} from 'pinia'
import {OrdersAPI} from "~/api/orders"
import IOrderItem = OrdersAPI.IOrderItem
import {CartAPI} from "~/api/cart"

export interface ICartItem {
	id: number
	quantity: number
	availableCount: number
	product: {
		id: number
		price: number
		salePrice: number
		slug: string
		title: string
		category: string
		thumbnail: string
	}
}

interface ICartStoreState {
	id: number
	items: ICartItem[]
	sum: number
	uuid: string
}

export const useCartStore: StoreDefinition<"cart", ICartStoreState> = defineStore('cart', {
	state: (): ICartStoreState => {
		return {
			id: 0,
			items: [],
			sum: 0,
			uuid: ''
		}
	},
	getters: {
		isCartExists: (state): boolean => !!state.uuid,
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
		async updateCart(): void {
			if (this.isCartExists) {
				this.getCart(this.uuid)
			} else {
				this.createNewCart()
			}
		},
		async getCart(cartId: string): void {
			const cart = await CartAPI.getCart(cartId)

			await this.setCart(cart)
		},
		async createNewCart(): void {
			const cart = await CartAPI.create()

			await this.setCart(cart)
		},
		async setCart(cart: ICartStoreState) {
			const { id, items, uuid, sum } = cart

			this.id = id
			this.items = items
			this.uuid = uuid
			this.sum = sum
		},
		async addToCart(productId: number, quantity: number = 1): void {
			await CartAPI.addItemToCart(this.uuid, productId, quantity)
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
