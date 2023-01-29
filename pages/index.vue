<script lang="ts" setup async>
	import GetProductsList from '~/graphql/queries/products/list.gql'
	import { Ref } from 'vue';
	import { IProduct, Product } from '~/models/Product';
	
	const { data } = await useAsyncQuery<IGQLProductsListResponse>(GetProductsList)
	const products: Ref<IProduct[]> = ref([])
	
	if (data.value && data.value.products) {
		products.value = data.value.products.data.map((product: IGQLProductShowResponse) => new Product(product))
	}
</script>

<template>
  <products-list v-if="products.length"
								 :products="products"/>
</template>
