import {defineStore} from 'pinia'
import {CartAPI} from "~/api/cart"
import { usePopupsStore } from '~/store/popups';

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

export const useCartStore = defineStore('cart', {
	state: (): ICartStoreState => {
		return {
			id: 0,
			items: [],
			sum: 0,
			uuid: ''
		}
	},
	getters: {
		isCartExists: (state: ICartStoreState): boolean => !!state.uuid,
		getItemById: (state: ICartStoreState): (productId: number) => ICartItem | undefined => {
			return (productId: number): ICartItem | undefined => state.items.find((item: ICartItem) => item.product.id === productId)
		},
		getItemsCount: (state: ICartStoreState): number => state.items.length,
		getItems: (state: ICartStoreState): ICartItem[] => state.items,
		getTotalSum: (state: ICartStoreState): number => state.items.reduce((sum: number, item: ICartItem) => {
			return sum + item.quantity * (item.product.salePrice ?? item.product.price)
		}, 0),
		getOrderItems: (state: ICartStoreState): {id: number, quantity: number}[] => state.items.map(({id, quantity}: ICartItem) => {
			return {id, quantity}
		})
	},
	actions: {
		async updateCart(): Promise<void> {
			if (this.isCartExists) {
				await this.getCart(this.uuid)
			} else {
				await this.createNewCart()
			}
		},
		async getCart(cartId: string): Promise<void> {
			const cart = await CartAPI.getCart(cartId)

			await this.setCart(cart)
		},
		async createNewCart(): Promise<void> {
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
		async addToCart(productId: number, quantity: number = 1): Promise<void> {
			const cart = await CartAPI.addItemToCart(this.uuid, productId, quantity)

			await this.setCart(cart)
		},
		async removeFromCart(itemId: number): Promise<void> {
			const cart = await CartAPI.removeItemFromCart(this.uuid, itemId)

			await this.setCart(cart)

			if (this.getItemsCount === 0) {
				usePopupsStore().toggleCartPopup(false)
			}
		}
	},
	persist: true
})
