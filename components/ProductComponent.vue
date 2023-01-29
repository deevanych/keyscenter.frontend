<script lang="ts" setup>
	import { IProduct } from '~/models/Product';
	
	interface IProps {
		product: IProduct
	}
	
	const props: IProps = defineProps<IProps>()
	const product: IProduct = toRaw(props.product)
</script>

<template>
  <div class="flex justify-center">
    <div class="product-card">
			<ui-tag class="product-card__tag"/>
      <nuxt-link :to="{name: 'shop-category-product', params: { category: 'windows', product: product.slug } }">
        <img class="product-card__preview"
             src="http://localhost:1337/uploads/1b6e15a1_c9b6_11e5_830b_000c29aa01a1_8ba1b1b4_30d1_11e7_8ea5_000c29aa01a1_31522dc507.jpg" alt=""/>
			</nuxt-link>
      <div class="product-card__meta">
				<h5 class="product-card__title">{{ product.title }}</h5>
				<rating-component />
				<div class="product-card__prices">
					<div class="product-card__price_current">{{ product.currentPrice }}</div>
					<div v-if="product.oldPrice"
							 class="product-card__price_old">{{ product.oldPrice }}</div>
				</div>
				<ui-button />
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
			@apply rounded-t-lg aspect-square object-center object-cover;
		}
	}
</style>
