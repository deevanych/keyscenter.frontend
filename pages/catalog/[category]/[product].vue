<script lang="ts" setup async>
import {Ref} from "vue";
import {Product} from "~/models/Product";
import {ProductsAPI} from "~/api/products";
import ProductReviews from '~/components/ProductReviews.vue';

const route = useRoute()

const {data} = await useAsyncData('product', async () => (await ProductsAPI.show(route.params.product as string)).data)

const product: Ref<Product | undefined> = ref()

if (data.value) {
    product.value = new Product(data.value as ProductsAPI.IProductResponse)
    useHead({
        title: product.value?.title,
        meta: [
            {
                name: "description",
                content: product.value?.metaDescription
            },
            {
                property: "og:title",
                content: product.value?.title
            },
            {
                property: "og:image",
                content: product.value?.preview
            },
            {
                property: "og:url",
                content: product.value?.url
            }
        ]
    })
} else {
    throw createError({statusCode: 404, statusMessage: 'Page Not Found'})
}
</script>

<template>
    <div v-if="product" class="product-page" itemscope itemtype="https://schema.org/Product">
        <meta itemprop="url" :content="product.url">
        <meta itemprop="image" :content="product.preview">
        <ProductBooking :product="product"/>
        <div class="col-span-2">
            <h1 class="product-page__title" itemprop="name">{{ product.title }}</h1>
						<LazyRatingComponent v-if="product.reviewsCount" :product="product"/>
            <LazyProductDetails :product="product"
                                class="product-page__details"/>
            <div v-if="product.description"
                 itemprop="description"
                 class="product-page__description">
                <h3 class="product-page__description-title">Описание</h3>
                <div class="product-page__description-content"
                     v-html="product.description"></div>
            </div>
            <div v-if="product.instruction"
                 class="product-page__description">
                <h3 class="product-page__description-title">Инструкция</h3>
                <div class="product-page__description-content"
                     v-html="product.instruction"></div>
            </div>
					<div v-if="product.reviewsCount"
							 class="product-page__description">
						<h3 class="product-page__description-title">Отзывы ({{ product.reviewsHumanize }}, {{ product.positiveReviewsPercent }}% положительных)</h3>
						<div class="product-page__description-content product-page__reviews">
							<ProductReviews :reviews="product.reviews"/>
						</div>
					</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.product-page {
  @apply flex flex-col md:grid grid-cols-3 gap-12 items-start;
	
	&__reviews {
		@apply flex gap-5 flex-col divide-y;
	}

  &__description {
    @apply mt-6 border p-8 pt-6 rounded;

    &-title {
      @apply font-bold leading-tight text-xl mt-0 mb-4;
    }
  }

  &__title {
    @apply font-bold leading-tight text-3xl mt-0 mb-2;
  }

  &__details {
    @apply mt-8;
  }
}
</style>
