import {$API} from "~/api/instance";

export namespace CouponAPI {
    export const apply = async (coupon: string, cartId: string) => {
        return await $API(`/carts/${cartId}/coupons/`, {}, 'POST', {
            data: {
                coupon
            }
        })
    }

    export const cancel = async (coupon: string, cartId: string) => {
        return await $API(`/carts/${cartId}/coupons/`, {}, 'DELETE', {
            data: {
                coupon
            }
        })
    }
}
