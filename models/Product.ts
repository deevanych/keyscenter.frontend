import {price} from '~/helpers/price';
import {Model} from '~/models/Model';
import {URLHelpers} from '~/helpers/URL';
import {ProductsAPI} from "~/api/products";
import {useRouter} from 'vue-router'
import IImage = ProductsAPI.IImage;
import IImageFormats = ProductsAPI.IImageFormats;

interface IShortProduct {
	id: number;
	title: string;
	price: number;
	salePrice: number;
	categorySlug: string;
	categoryId: number;
	images: IImageFormats[];
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
	url: string;
	currentPriceNonFormatted: number;
	metaDescription: string;
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
	public readonly images: IImageFormats[];
	public readonly availableCount: number;
	public readonly categorySlug: string;
	public readonly categoryId: number;
	public readonly description: string;

	constructor (data: ProductsAPI.IShortProductResponse) {
		super(data.id);
		this.title = data.attributes.title
		this.price = data.attributes.price
		this.salePrice = data.attributes.salePrice
		this.slug = data.attributes.slug
		this.images = data.attributes.images.data.map(images => images.attributes.formats)
		this.availableCount = data.attributes.product_keys.data.length
		this.categorySlug = data.attributes.product_category.data.attributes.slug
		this.categoryId = data.attributes.product_category.data.id
		this.description = data.attributes.description
	}

	get metaDescription(): string {
		return (this.description.replace(/<[^>]*>/g, '') as string)
	}

	get url(): string {
		return useRouter().resolve({
			name: 'catalog-category-product',
			params: {category: this.categorySlug, product: this.slug}
		}).href
	}

	get isInStock(): boolean {
		return !!this.availableCount
	}

	get isInStockHumanized(): string {
		return this.isInStock ? 'В наличии' : 'Нет в наличии'
	}

	get isInStockWithCountHumanized(): string {
		return this.isInStock ? `${this.isInStockHumanized}: ${this.availableCount} шт` : this.isInStockHumanized
	}

	get currentPrice(): string {
		return price(this.currentPriceNonFormatted)
	}

	get currentPriceNonFormatted(): number {
		return this.salePrice ?? this.price
	}

	get preview(): string {
		return URLHelpers.getBackendURLHref(this.imagesByFormat('small')[0].url)
	}

	get discountPercent(): string {
		return ((this.salePrice - this.price) / (this.price / 100)).toFixed(0) + '%'
	}

	imagesByFormat(imageType: 'small' | 'large' | 'medium' | 'thumbnail' = 'small'): IImage[] {
		return this.images.map((image: IImageFormats) => {
			return image[imageType]
		})
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
	public readonly instruction: string;

	constructor(data: ProductsAPI.IProductResponse) {
		super(data);
		this.platforms = data.attributes.platforms.data.map(platform => platform.attributes.title)
		this.views = data.attributes.views
		this.productType = data.attributes.product_type.data.attributes.title
		this.productDelivery = data.attributes.delivery_method.data.attributes.title
		this.instruction = data.attributes.instruction
	}
}
