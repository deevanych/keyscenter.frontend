<script async lang="ts" setup>
import {ProductsAPI} from "../../api/products";
import {ShortProduct} from "../../models/Product";

const products = ref<ShortProduct[]>([])

useHead({
  title: 'Каталог',
  meta: [
    {
      name: "description",
      content: "Оригинальные и лицензионные ключи активации продуктов Microsoft, Adobe, Office купить дешево"
    },
  ]
})

try {
  const productsResponse = await useAsyncData('products', async () => await ProductsAPI.list())

  if (productsResponse.status.value === 'success' && typeof productsResponse.data.value?.data !== 'undefined') {
    products.value = productsResponse.data.value?.data.map((product: ProductsAPI.IShortProductResponse) => new ShortProduct(product))
  }
} catch (e) {
  throw createError({statusCode: 500, statusMessage: (e as Error).message})
}
</script>

<template>
  <ProductsList :products="products"/>
</template>
