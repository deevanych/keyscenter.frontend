<script lang="ts" setup>
import {ShortProduct} from "~/models/Product";

interface IProps {
		products: ShortProduct[]
	}
	
	const props: IProps = defineProps<IProps>()
</script>

<template>
  <div class="product__list">
    <ProductCard v-for="product in props.products"
                 :key="product.id"
                 :product="product"/>
  </div>
</template>

<style lang="scss" scoped>
 .product__list {
	 @apply flex md:grid grid-cols-1 gap-10 md:grid-cols-4 max-w-full flex-col md:flex-row px-6 md:px-0;
 }
</style>
