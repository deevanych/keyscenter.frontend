<script lang="ts" setup>
	import { Product } from '~/models/Product';
	
	interface IProps {
		product: Product
	}
	
	const props: IProps = defineProps<IProps>()
	const product: Product = toRaw(props.product)
</script>

<template>
  <div class="flex justify-center">
    <div class="product-card">
			<ui-tag v-if="product.isInStock" class="product-card__tag">
        В наличии
      </ui-tag>
      <nuxt-link :to="{name: 'catalog-category-product', params: { category: 'windows', product: product.slug } }">
        <img class="product-card__preview"
             :src="product.preview" alt=""/>
			</nuxt-link>
      <div class="product-card__meta">
				<h5 class="product-card__title">{{ product.title }}</h5>
				<rating-component />
				<div class="product-card__prices">
					<div class="product-card__price_current">{{ product.currentPrice }}</div>
					<div v-if="product.oldPrice"
							 class="product-card__price_old">{{ product.oldPrice }}</div>
				</div>
        <ui-button>Купить</ui-button>
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
