import {$fetch} from "ofetch";
import {URLHelpers} from "~/helpers/URL";
import {HTTPMethod} from "h3";

export const $API = async (url = '', params = {}, method: HTTPMethod = "GET", body: undefined | any = undefined) => {
    return await $fetch(url, {
        body,
        method,
        baseURL: URLHelpers.getBackendURLHref('/api/'),
        params
    })
}
