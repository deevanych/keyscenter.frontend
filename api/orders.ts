import {$API} from "~/api/instance";

export namespace OrdersAPI {
    export interface IOrderItem {
        id: number
        quantity: number
    }

    export interface IOrderRequest {
        email: string
        items: IOrderItem[]
    }

    export const create = async (body: IOrderRequest) => {
        return await $API('/orders', {}, 'POST', body)
    }
}