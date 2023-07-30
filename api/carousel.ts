import {$API} from "./instance";
import {CtaAPI} from "./cta";

export namespace CarouselAPI {
    type TCarouselHandler = 'homepage'

    export interface ICarouselItem extends CtaAPI.ICTA {
    }

    export interface ICarousel {
        id: number,
        handler: TCarouselHandler,
        carousel_items: ICarouselItem[],
        error: {}
    }

    export const list = async (): Promise<ICarousel[]> => {
        return await $API('/carousels')
    }

    export const get = async (slug: string): Promise<ICarousel> => {
        return await $API(`/carousels/${slug}`)
    }
}
