import {$API} from "./instance";

export namespace ProductsAPI {
    export interface IImage {
        ext: '.webp',
        url: string,
        hash: string,
        mime: string,
        name: string,
        path: null,
        size: number,
        width: number,
        height: number
    }

    export interface IImageFormats {
        large: IImage,
        small: IImage,
        medium: IImage,
        thumbnail: IImage
    }

    export interface IReview {
        attributes: {
            text: string,
            is_positive: boolean,
            createdAt: string
        }
    }

    export interface IShortProductResponse {
        id: number,
        attributes: {
            title: string,
            price: number,
            salePrice: number,
            slug: string,
            description: string,
            product_keys: {
                data: [
                    {
                        id: number
                    }
                ]
            },
            reviews: {
                data: IReview[]
            },
            product_category: {
                data: {
                    attributes: {
                        slug: string
                        title: string
                    }
                    id: number
                }
            },
            images: {
                data: [
                    {
                        attributes: {
                            formats: IImageFormats
                        }
                    }
                ]
            }
        }
    }

    export interface IProductResponse extends IShortProductResponse {
        attributes: {
            title: string,
            price: number,
            salePrice: number,
            slug: string,
            download_link: string,
            activation_by_phone: boolean,
            product_type: {
                data: {
                    attributes: {
                        title: string
                    }
                }
            },
            reviews: {
                data: IReview[]
            },
            product_category: {
                data: {
                    attributes: {
                        slug: string
                        title: string
                    }
                    id: number
                }
            },
            description: string,
            instruction_page: {
                data: {
                    attributes: {
                        slug: string
                    }
                }
            },
            product_keys: {
                data: [
                    {
                        id: number
                    }
                ]
            },
            images: {
                data: [
                    {
                        attributes: {
                            formats: IImageFormats
                        }
                    }
                ]
            }
        }
    }

    export const list = async (): Promise<{ data: IShortProductResponse[] }> => {
        return await $API('/products')
    }

    export const show = async (productSlug: string): Promise<{ data: ProductsAPI.IProductResponse }> => {
        return await $API(`/products/${productSlug}`)
    }
}
