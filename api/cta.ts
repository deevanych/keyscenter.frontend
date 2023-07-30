import {$API} from "./instance";

export namespace CtaAPI {
    type TCarouselHandler = 'chat'

    export interface ICTA {
        id: number,
        header: string,
        subheader: string,
        button_text: string,
        image: {
            url: string
        },
        lottie: {
            url: string
        },
        product: {
            slug: string,
            price: number,
            salePrice: number,
            product_category: {
                slug: string
            }
        } | null,
        page: {
            slug: string
        } | null,
        action: string | null,
        error: {}
    }

    export const get = async (slug: string): Promise<ICTA> => {
        return await $API(`/ctas/${slug}`)
    }
}
