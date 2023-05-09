import {defineStore, StoreDefinition} from 'pinia'
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
		getItemById: (state: ICartStoreState): (productId: number) => CartItem | undefined => {
			return (productId: number): ICartItem | undefined => state.items.find((item: ICartItem) => item.product.id === productId)
		},
		getItemsCount: (state: ICartStoreState): number => state.items.length,
		getItems: (state: ICartStoreState): ICartItem[] => state.items,
		getTotalSum: (state: ICartStoreState): number => state.items.reduce((sum: number, item: ICartItem) => {
			return sum + item.quantity * (item.product.salePrice ?? item.product.price)
		}, 0),
		getOrderItems: (state: ICartStoreState): IOrderItem[] => state.items.map(({id, quantity}: ICartItem) => {
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
			const cart = await CartAPI.addItemToCart(this.uuid, productId, quantity)

			await this.setCart(cart)
		},
		async removeFromCart(itemId: number): void {
			const cart = await CartAPI.removeItemFromCart(this.uuid, itemId)

			await this.setCart(cart)
		}
	},
	persist: true
})
