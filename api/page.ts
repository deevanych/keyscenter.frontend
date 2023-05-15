import {$API} from "~/api/instance";

export namespace PageAPI {
    export const show = async (pageSlug: string) => {
        return await $API(`/pages/${pageSlug}`, {}, 'GET')
    }

    export const list = async () => {
        return await $API('/pages', {}, 'GET')
    }
}
