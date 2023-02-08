<script lang="ts" setup async>
	import GetProductsList from '~/graphql/queries/products/list.gql'
	import { Ref } from 'vue';
  import {ShortProduct} from '~/models/Product';
	
	const { data } = await useAsyncQuery<IGQLProductsListResponse>(GetProductsList)
	const products: Ref<ShortProduct[]> = ref([])
	
	if (data.value?.products) {
		products.value = data.value.products.data.map((product: IGQLProductShowResponse) => new ShortProduct(product))
	}
</script>

<template>
  <products-list v-if="products.length"
								 :products="products"/>
</template>
