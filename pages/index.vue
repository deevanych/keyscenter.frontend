<script lang="ts" setup async>
	import { Ref } from 'vue';
  import {ShortProduct} from '~/models/Product';
  import {ProductsAPI} from "~/api/products";
	
	const { data } = await ProductsAPI.list()
	const products: Ref<ShortProduct[]> = ref([])
  useHead({ title: 'Главная'})
	
	if (data) {
		products.value = data.map((product: ProductsAPI.IShortProductResponse) => new ShortProduct(product))
	}
</script>

<template>
  <products-list v-if="products.length"
								 :products="products"/>
</template>
