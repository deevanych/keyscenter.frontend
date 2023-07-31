import {$API} from "~/api/instance";

export namespace PageAPI {
    export interface IPage {
        attributes: {
            slug: string
            title: string
        }
    }

    export const show = async (pageSlug: string): Promise<IPage> => {
        return await $API(`/pages/${pageSlug}`, {}, 'GET')
    }

    export const list = async (): Promise<{ data: IPage[] }> => {
        return await $API('/pages', {}, 'GET')
    }
}
