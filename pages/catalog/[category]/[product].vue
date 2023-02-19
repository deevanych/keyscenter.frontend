<script lang="ts" setup async>
  import GetProductBySlug from '~/graphql/queries/products/show.gql'
  import { Ref } from "vue";
  import { Product } from "~/models/Product";
  import ProductBooking from "~/components/ProductBooking.vue";

  const route = useRoute()

  const { data } = await useAsyncQuery<IGQLProductsListResponse>(GetProductBySlug, {
    slug: route.params.product
  })

  const product: Ref<Product | undefined> = ref()

  if (data.value?.products && data.value?.products.data.length) {
    product.value = new Product(data.value?.products.data[0])
  } else {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }
</script>

<template>
  <div v-if="product" class="product-page">
    <product-booking :product="product"/>
    <div class="col-span-2">
      <h1 class="product-page__title">{{ product.title }}</h1>
      <rating-component />
      <product-details :product="product"
                       class="product-page__details"/>
      <div v-if="product.description"
           class="product-page__description">
        <h3 class="product-page__description-title">Описание</h3>
        <div class="product-page__description-content"
             v-html="product.description"></div>
      </div>
      <div v-if="product.instruction"
           class="product-page__description">
        <h3 class="product-page__description-title">Инструкция</h3>
        <div class="product-page__description-content"
             v-html="product.instruction"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .product-page {
    @apply grid grid-cols-3 gap-12 items-start;

    &__description {
      @apply mt-6 border p-8 pt-6 rounded;

      &-content {
        :deep(a) {
          @apply text-purple-500 underline hover:text-purple-700 transition-colors;
        }
      }

      &-title {
        @apply font-bold leading-tight text-xl mt-0 mb-4;
      }
    }

    &__title {
      @apply font-bold leading-tight text-3xl mt-0 mb-2;
    }

    &__details {
      @apply mt-8;
    }
  }
</style>
