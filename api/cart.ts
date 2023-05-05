import {$API} from "~/api/instance";

export namespace CartAPI {
    export const create = async () => {
        return await $API('/carts', {}, 'POST')
    }

    export const getCart = async (cartID: string) => {
        return await $API(`/carts/${cartID}`, {})
    }

    export const addItemToCart = async (cartID: string, productId: number, quantity = 1) => {
        return await $API(`/carts/${cartID}/items`, {}, 'POST', {
            data: {
                productId,
                quantity
            }
        })
    }

    export const removeItemFromCart = async (cartID: string, productId: number) => {
        return await $API(`/carts/${cartID}/items/${productId}`, {}, 'DELETE')
    }
}