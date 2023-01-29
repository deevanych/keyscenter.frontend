<script lang="ts" setup>
	import { IProduct } from '~/models/Product';
	
	interface IProps {
		products: IProduct[]
	}
	
	const props: IProps = defineProps<IProps>()
</script>

<template>
  <div class="grid grid-cols-4 gap-10">
    <product-component v-for="product in props.products"
											 :key="product.id"
											 :product="product"/>
  </div>
</template>
