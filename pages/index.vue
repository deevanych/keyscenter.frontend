<script async lang="ts" setup>
import {Ref} from 'vue';
import {ShortProduct} from '../models/Product';
import {ProductsAPI} from "../api/products";
import {CarouselAPI} from "../api/carousel";
import {CtaAPI} from "../api/cta";
import Carousel from "../components/Carousel.vue";
import Cta from "../components/Cta.vue";

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
const carousel: Ref<CarouselAPI.ICarousel | null> = ref(null)
const CTA: Ref<CtaAPI.ICTA | null> = ref(null)

try {
  const [productsResult, carouselResult, CTAResult] = await Promise.allSettled([
    await useAsyncData('products', async () => await ProductsAPI.list()),
    await useAsyncData('carousel', async () => await CarouselAPI.get('homepage')),
    await useAsyncData('CTA', async () => await CtaAPI.get('chat'))
  ])

  if (productsResult.status === 'fulfilled' && typeof productsResult.value.data.value?.data !== 'undefined') {
    products.value = productsResult.value.data.value.data.map((product: ProductsAPI.IShortProductResponse) => new ShortProduct(product))
  }

  if (carouselResult.status === 'fulfilled' && typeof carouselResult.value.data.value?.error === 'undefined') {
    carousel.value = carouselResult.value.data.value
  }

  if (CTAResult.status === 'fulfilled' && typeof CTAResult.value.data.value?.error === 'undefined') {
    CTA.value = CTAResult.value.data.value
  }
} catch (e) {
  throw createError({statusCode: 500, statusMessage: (e as Error).message})
}
</script>

<template>
  <section class="page">
    <section class="page-section">
      <h1 class="page-section__title">Главная</h1>
      <div v-if="carousel" class="page-section__content">
        <Carousel :carousel="carousel"/>
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
    <section v-if="CTA" class="page-section">
      <div class="page-section__content">
        <div class="page-section__content">
          <Cta :cta="CTA"/>
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
