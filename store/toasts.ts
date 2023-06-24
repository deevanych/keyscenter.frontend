import {defineStore} from 'pinia'

export namespace Toast {
	export type TType = 'success' | 'warning' | 'error' | 'info'

	export interface IToast {
		type: TType;
		text: string;
		timestamp: string;
	}

	export interface IState {
		toasts: IToast[];
		getToasts: IToast[];
	}
}

export const useToastsStore = defineStore('toasts', {
	state: (): Toast.IState => {
		return {
			toasts: []
		}
	},
	getters: {
		getToasts: (state): Toast.IToast[] => state.toasts.reverse()
	},
	actions: {
		showToast(text, type: Toast.TType = 'success', showDuration = 2000): void {
			const timestamp = Date.now()
			this.toasts.push({
				text,
				type,
				timestamp
			})

			setTimeout(() => {
				const index = this.toasts.findIndex((toast: Toast.IToast) => {
					return toast.timestamp === timestamp
				})

				this.toasts.splice(index, 1)
			}, showDuration)
		}
	}
})
