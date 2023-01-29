import { price } from '~/helpers/price';
import { Model } from '~/models/Model';

export interface IProduct {
	id: number;
	title: string;
	price: number;
	salePrice: number;
	description?: string;
	instruction?: string;

	slug: string;
	createdAt: Date;
	updatedAt: Date;
	publishedAt?: Date;
	currentPrice: string;
	oldPrice?: string;
}

export class Product extends Model implements IProduct {
	readonly title: string;
	readonly price: number;
	readonly salePrice: number;

	readonly slug: string;
	constructor (data: IGQLProductShowResponse) {
		super(data.id, data.attributes.createdAt, data.attributes.updatedAt);
		this.title = data.attributes.title
		this.price = data.attributes.price
		this.salePrice = data.attributes.salePrice
		this.slug = data.attributes.slug
	}

	get currentPrice (): string {
		return price(this.salePrice ?? this.price)
	}

	get oldPrice (): string | undefined {
		if (this.salePrice) {
			return price(this.price)
		}

		return
	}
}
