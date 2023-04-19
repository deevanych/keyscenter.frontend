import {$fetch} from "ofetch";
import {URLHelpers} from "~/helpers/URL";
import {ProductsAPI} from "~/api/products";

export const $API = (url = '', params = {}) => {
    return $fetch(url, {
        baseURL: URLHelpers.getBackendURLHref('/api/'),
        params
    })
}

export namespace API {
    export const products = ProductsAPI
}