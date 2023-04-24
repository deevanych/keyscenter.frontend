<script lang="ts" setup>
import {ShortProduct} from '~/models/Product';

interface IProps {
    product: ShortProduct
}

const props: IProps = defineProps<IProps>()
const product: ShortProduct = props.product
</script>

<template>
  <div class="flex justify-center">
      <div class="product-card">
          <LazyUiTag v-if="product.isInStock" class="product-card__tag">
              В наличии
          </LazyUiTag>
          <NuxtLink
              :to="{name: 'catalog-category-product', params: { category: product.categorySlug, product: product.slug } }">
              <img :src="product.preview"
                   alt=""
                   class="product-card__preview"
                   height="224"
                   width="224"/>
          </NuxtLink>
          <div class="product-card__meta">
              <h5 class="product-card__title">{{ product.title }}</h5>
              <RatingComponent/>
              <div class="product-card__prices">
                  <div class="product-card__price_current">{{ product.currentPrice }}</div>
                  <div v-if="product.oldPrice"
                       class="product-card__price_old">{{ product.oldPrice }}
                  </div>
              </div>
              <UiButton>Купить</UiButton>
          </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
	.product-card {
		@apply border border-slate-100 rounded-lg bg-white max-w-sm duration-300 hover:shadow hover:border-transparent
		relative;
		
		&__tag {
			@apply absolute top-4 -left-4;
		}
		
		&__meta {
			@apply text-xs flex flex-col gap-1 p-6;
		}
		
		&__title {
			@apply text-gray-900;
		}
		
		&__prices {
			@apply flex gap-2 mb-4;
		}
		
		&__price {
			&_old {
				@apply line-through;
			}
			
			&_current {
				@apply text-sm font-bold;
			}
		}
		
		&__preview {
			@apply rounded-t-lg aspect-square object-center object-contain;
		}
	}
</style>
