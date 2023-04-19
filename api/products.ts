import {$API} from "~/api/instance";

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
    export interface IShortProductResponse {
        id: number,
        attributes: {
            title: string,
            price: number,
            createdAt: Date,
            updatedAt: Date,
            salePrice: number,
            slug: string,
            product_keys: {
                data: [
                    {
                        '__typename': "ProductKeyEntity"
                    }
                ]
            }
            images: {
                data: [
                    {
                        attributes: {
                            formats: IImageFormats
                            url: string
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
            createdAt: Date,
            updatedAt: Date,
            slug: string,
            views: number,
            product_type: {
                data: {
                    attributes: {
                        title: string
                    }
                }
            }
            delivery_method: {
                data: {
                    attributes: {
                        title: string
                    }
                }
            },
            description: string,
            instruction: string,
            product_keys: {
                data: [
                    {
                        '__typename': "ProductKeyEntity"
                    }
                ]
            }
            platforms: {
                data: [
                    {
                        attributes: {
                            title: string
                        }
                    }
                ]
            }
            images: {
                data: [
                    {
                        attributes: {
                            formats: IImageFormats
                            url: string
                        }
                    }
                ]
            }
        }
    }

    export const list = async (): Promise<{ data: IShortProductResponse[] }> => {
        return $API('/products', {
            'fields': [
                'title',
                'price',
                'salePrice',
                'slug',
            ],
            'populate': [
                'images',
                'product_keys'
            ]
        })
    }

    export const show = async (productSlug: string): Promise<{ data: IProductResponse[] }> => {
        return $API('/products', {
            'filters[slug][$eq]': productSlug,
            'fields': [
                'title',
                'price',
                'salePrice',
                'slug',
                'description',
                'instruction',
                'views'
            ],
            'pagination[limit]': 1,
            'populate': [
                'images',
                'product_keys',
                'platforms',
                'delivery_method',
                'product_type'
            ]
        })
    }
}