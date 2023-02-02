<script lang="ts" setup>
	import {Product} from "~/models/Product";

  interface IProps {
		products: Product[]
	}
	
	const props: IProps = defineProps<IProps>()
</script>

<template>
  <div class="grid grid-cols-4 gap-10">
    <product-card v-for="product in props.products"
											 :key="product.id"
											 :product="product"/>
  </div>
</template>
