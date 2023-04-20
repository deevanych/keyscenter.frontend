<script lang="ts" setup async>
	import { Ref } from 'vue';
  import {ShortProduct} from '~/models/Product';
  import {ProductsAPI} from "~/api/products";

  useHead({title: 'Главная'})
  const products: Ref<ShortProduct[]> = ref([])

  try {
      const {data} = await ProductsAPI.list()
      products.value = data.map((product: ProductsAPI.IShortProductResponse) => new ShortProduct(product))
  } catch (e) {
      throw createError({ statusCode: 500, statusMessage: (e as Error).message })
  }
</script>

<template>
  <products-list v-if="products.length"
								 :products="products"/>
</template>
