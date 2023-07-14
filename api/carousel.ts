import {$API} from "./instance";

export namespace CarouselAPI {
    type TCarouselHandler = 'homepage'

    export interface ICarouselItem {
        id: number,
        header: string,
        subheader: string,
        button_text: string,
        image: {
            url: string
        },
        product: {
            slug: string,
            product_category: {
                slug: string
            }
        } | null,
        page: {
            slug: string
        } | null
    }

    export interface ICarousel {
        id: number,
        handler: TCarouselHandler,
        carousel_items: ICarouselItem[]
    }

    export const list = async (): Promise<ICarousel[]> => {
        return await $API('/carousels')
    }

    export const get = async (slug: string): Promise<ICarousel> => {
        return await $API(`/carousels/${slug}`)
    }
}
