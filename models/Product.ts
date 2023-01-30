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
}

export class Product extends Model implements IProduct {
	public readonly title: string;
	public readonly price: number;
	public readonly salePrice: number;
	public readonly slug: string;
	public readonly images: string[];

	constructor (data: IGQLProductShowResponse) {
		super(data.id, data.attributes.createdAt, data.attributes.updatedAt);
		this.title = data.attributes.title
		this.price = data.attributes.price
		this.salePrice = data.attributes.salePrice
		this.slug = data.attributes.slug
		this.images = data.attributes.images.data.map(images => images.attributes.url)
	}

	get currentPrice (): string {
		return price(this.salePrice ?? this.price)
	}

	get preview (): string {
		return 'http://localhost:1337' + this.images[0]
	}

	get oldPrice (): string | undefined {
		if (this.salePrice) {
			return price(this.price)
		}

		return
	}
}
