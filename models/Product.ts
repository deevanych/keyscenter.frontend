import { price } from '~/helpers/price';
import { Model } from '~/models/Model';
import { URLHelpers } from '~/helpers/URL';
import {ProductsAPI} from "~/api/products";

interface IShortProduct {
	id: number;
	title: string;
	price: number;
	salePrice: number;
	images: string[];
	description?: string;
	instruction?: string;
	slug: string;
	publishedAt?: Date;
	currentPrice: string;
	oldPrice?: string;
	preview: string;
	availableCount: number;
	isInStock: boolean;
	isInStockHumanized: string;
	isInStockWithCountHumanized: string;
}

interface IProduct extends IShortProduct {
	platforms: string[];
	views: number;
	productType: string;
	productDelivery: string;
	description: string;
	instruction: string;
}

export class ShortProduct extends Model implements IShortProduct {
	public readonly title: string;
	public readonly price: number;
	public readonly salePrice: number;
	public readonly slug: string;
	public readonly images: string[];
	public readonly availableCount: number;

	constructor (data: ProductsAPI.IShortProductResponse) {
		super(data.id);
		this.title = data.attributes.title
		this.price = data.attributes.price
		this.salePrice = data.attributes.salePrice
		this.slug = data.attributes.slug
		this.images = data.attributes.images.data.map(images => images.attributes.url)
		this.availableCount = data.attributes.product_keys.data.length
	}

	get isInStock (): boolean {
		return !!this.availableCount
	}

	get isInStockHumanized (): string {
		return this.isInStock ? 'В наличии' : 'Нет в наличии'
	}

	get isInStockWithCountHumanized (): string {
		return this.isInStock ? `${this.isInStockHumanized}: ${this.availableCount} шт` : this.isInStockHumanized
	}

	get currentPrice (): string {
		return price(this.salePrice ?? this.price)
	}

	get preview (): string {
		return URLHelpers.getBackendURLHref(this.images[0])
	}

	get discountPercent (): string {
		return ((this.salePrice - this.price) / (this.price / 100)).toFixed(0) + '%'
	}

	get oldPrice (): string | undefined {
		if (this.salePrice) {
			return price(this.price)
		}

		return
	}
}

export class Product extends ShortProduct implements IProduct {
	public readonly platforms: string[];
	public readonly views: number;
	public readonly productType: string;
	public readonly productDelivery: string;
	public readonly description: string;
	public readonly instruction: string;

	constructor(data: ProductsAPI.IProductResponse) {
		super(data);
		this.platforms = data.attributes.platforms.data.map(platform => platform.attributes.title)
		this.views = data.attributes.views
		this.productType = data.attributes.product_type.data.attributes.title
		this.productDelivery = data.attributes.delivery_method.data.attributes.title
		this.description = data.attributes.description
		this.instruction = data.attributes.instruction
	}
}
