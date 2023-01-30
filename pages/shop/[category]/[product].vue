<script lang="ts" setup async>
  import GetProductBySlug from '~/graphql/queries/products/show.gql'
  import { Ref } from "vue";
  import { Product } from "~/models/Product";

  const route = useRoute()

  const { data } = await useAsyncQuery<IGQLProductsListResponse>(GetProductBySlug, {
    slug: route.params.product
  })

  let product: Ref<Product> = ref({} as Product)

  if (data.value?.products && data.value?.products.data.length) {
    product.value = new Product(data.value?.products.data[0])
  } else {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
</script>

<template>
	{{ product.title }}
</template>
