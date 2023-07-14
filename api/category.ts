import {$API} from "./instance";

export namespace CategoryAPI {
    export const list = async () => {
        return await $API('/product-categories')
    }
}