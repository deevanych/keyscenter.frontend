import {$API} from "~/api/instance";

export namespace OrderAPI {
    export const create = async (cartId: string, email: string) => {
        return await $API('/orders', {}, 'POST', {
            data: {
                cartId,
                email
            }
        })
    }
}