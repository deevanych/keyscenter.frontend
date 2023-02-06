<script lang="ts" setup async>
  import GetProductBySlug from '~/graphql/queries/products/show.gql'
  import { Ref } from "vue";
  import { Product } from "~/models/Product";
  import ProductBooking from "~/components/ProductBooking.vue";

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
  <div class="product-page">
    <product-booking :product="product"/>
    <div class="col-span-2">
      <h1 class="font-bold leading-tight text-3xl mt-0 mb-2">{{ product.title }}</h1>
      <rating-component />
      <div>
          Платформа: {{ product.platforms[0] }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .product-page {
    @apply grid grid-cols-3 gap-12;
  }
</style>