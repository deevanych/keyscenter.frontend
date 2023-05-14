import {$API} from "~/api/instance";

export namespace PageAPI {
    export const get = async (pageSlug: string) => {
        return await $API(`/pages/${pageSlug}`, {}, 'GET')
    }
}
