<script lang="ts" setup>
import {ShortProduct} from "~/models/Product";

interface IProps {
		products: ShortProduct[]
	}
	
	const props: IProps = defineProps<IProps>()
</script>

<template>
  <div class="grid grid-cols-4 gap-10">
    <ProductCard v-for="product in props.products"
                 :key="product.id"
                 :product="product"/>
  </div>
</template>
