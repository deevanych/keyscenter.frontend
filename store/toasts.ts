import {defineStore} from 'pinia'
import {FetchError} from 'ofetch';

export namespace Toast {
    export type TType = 'success' | 'warning' | 'error' | 'info'

    export interface IToast {
        type: TType;
        text: string;
        timestamp: number;
    }

    export interface IState {
        toasts: IToast[];
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
        showErrorToast(error: FetchError): void {
            this.showToast(error.data.error.message, 'error')
        },
        showToast(text: string, type: Toast.TType = 'success', showDuration = 2000): void {
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
