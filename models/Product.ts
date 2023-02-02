import { price } from '~/helpers/price';
import { Model } from '~/models/Model';

interface IProduct {
	id: number;
	title: string;
	price: number;
	salePrice: number;
	images: string[];
	description?: string;
	instruction?: string;
	slug: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt?: Date;
	currentPrice: string;
	oldPrice?: string;
	preview: string;
	availableCount: number;
	isInStock: boolean;
	isInStockHumanized: string;
	isInStockWithCountHumanized: string;
}

export class Product extends Model implements IProduct {
	public readonly title: string;
	public readonly price: number;
	public readonly salePrice: number;
	public readonly slug: string;
	public readonly images: string[];
	public readonly availableCount: number;

	constructor (data: IGQLProductShowResponse) {
		super(data.id, data.attributes.createdAt, data.attributes.updatedAt);
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
		return 'http://localhost:1337' + this.images[0]
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
