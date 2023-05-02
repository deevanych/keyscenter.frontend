import {$API} from "~/api/instance";

export namespace CartAPI {
    export const create = async () => {
        return await $API('/cart', {}, 'POST')
    }

    export const getCart = async (cartID: string) => {
        return await $API(`/cart/${cartID}`, {})
    }

    export const addItemToCart = async (cartID: string, productID: number, quantity = 1) => {
        return await $API(`/cart/${cartID}`, {}, 'POST', {
            productID,
            quantity
        })
    }

    export const removeItemFromCart = async (cartID: string, productID: number) => {
        return await $API(`/cart/${cartID}/${productID}`, {}, 'DELETE')
    }
}