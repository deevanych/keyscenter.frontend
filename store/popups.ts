import {defineStore} from 'pinia'

export const usePopupsStore = defineStore('popups', {
	state: () => {
		return {
			cartPopup: true
		}
	},
	getters: {
		isCartPopupShown: (state) => state.cartPopup
	},
	actions: {
		toggleCartPopup(isShown: boolean | undefined = undefined) {
			this.cartPopup = isShown ?? !this.cartPopup
		}
	}
})
