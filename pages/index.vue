<script async lang="ts" setup>
import {Ref} from 'vue';
import {ShortProduct} from '~/models/Product';
import {ProductsAPI} from "~/api/products";
import Carousel from "../components/Carousel.vue";

useHead({
  title: 'Главная',
  meta: [
    {
      name: "description",
      content: "Оригинальные и лицензионные ключи активации продуктов Microsoft, Adobe, Office купить дешево"
    },
  ]
})
const products: Ref<ShortProduct[]> = ref([])

try {
  const {data} = await useAsyncData('products', async () => (await ProductsAPI.list()).data)
  if (data.value) {
    products.value = data.value.map((product: ProductsAPI.IShortProductResponse) => new ShortProduct(product))
  }
} catch (e) {
  throw createError({statusCode: 500, statusMessage: (e as Error).message})
}
</script>

<template>
  <section class="page">
    <section class="page-section">
      <h1 class="page-section__title">Главная</h1>
      <div class="page-section__content">
        <Carousel/>
      </div>
    </section>
    <section class="page-section">
      <div class="page-section__content">
        <div class="page-section__content">
          <LazyProductsList v-if="products.length"
                            :products="products"/>
        </div>
      </div>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.page {
  @apply flex flex-col gap-20;

  &-section {
    @apply flex flex-col gap-10;

    &__title {
      @apply font-bold leading-tight text-3xl;
    }
  }
}
</style>
