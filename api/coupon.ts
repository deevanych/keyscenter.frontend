import {$API} from "~/api/instance";

export namespace CouponAPI {
    export const apply = async (code: string, cartId: string) => {
        return await $API(`/carts/${cartId}/coupons/`, {}, 'POST', {
            data: {
                code
            }
        })
    }

    export const cancel = async (code: string, cartId: string) => {
        return await $API(`/carts/${cartId}/coupons/${code}`, {}, 'DELETE')
    }
}
