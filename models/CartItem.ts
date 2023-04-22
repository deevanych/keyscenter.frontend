import {Product} from "~/models/Product";
import {URLHelpers} from "~/helpers/URL";

interface ICartItem {
    id: number
    title: string
    quantity: number
    price: number
    preview: string
    url: string
    availableCount: number
}


export class CartItem implements ICartItem {
    public readonly id: number
    public readonly title: string
    public readonly price: number
    public readonly preview: string
    public readonly url: string
    public readonly availableCount: number
    public quantity: number

    constructor(product: Product, quantity = 1) {
        this.id = product.id
        this.title = product.title
        this.price = product.salePrice
        this.preview = URLHelpers.getBackendURLHref(product.imagesByFormat('thumbnail')[0].url)
        this.url = product.url
        this.quantity = quantity
        this.availableCount = product.availableCount
    }
}