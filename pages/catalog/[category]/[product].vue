<script async lang="ts" setup>
import {Ref} from "vue";
import {Product} from "../../../models/Product";
import {ProductsAPI} from "../../../api/products";
import Breadcrumbs from "../../../components/Breadcrumbs.vue";
import ProductInfo from "../../../components/ProductInfo.vue";

const route = useRoute()

const {data} = await useAsyncData('product', async () => (await ProductsAPI.show(route.params.product as string)).data)

const product: Ref<Product | undefined> = ref()

if (data.value) {
  product.value = new Product(data.value as ProductsAPI.IProductResponse)
  useHead({
    title: product.value?.title,
    meta: [
      {
        name: "description",
        content: product.value?.metaDescription
      },
      {
        property: "og:title",
        content: product.value?.title
      },
      {
        property: "og:image",
        content: product.value?.preview
      },
      {
        property: "og:url",
        content: product.value?.url
      }
    ]
  })
} else {
  throw createError({statusCode: 404, statusMessage: 'Page Not Found'})
}

const breadcrumbs = [
  {
    title: 'Каталог',
    url: useRouter().resolve({name: 'catalog'}).href
  },
  {
    title: product.value.categoryTitle,
    url: useRouter().resolve({name: 'catalog-category', params: {category: product.value.categorySlug}}).href
  },
  {
    title: product.value.title
  }
]
</script>

<template>
  <div v-if="product" class="product-page" itemscope itemtype="https://schema.org/Product">
    <meta :content="product.url" itemprop="url">
    <meta :content="product.preview" itemprop="image">
    <div class="col-span-2">
      <img :src="product.preview"/>
    </div>
    <div class="product-page__content">
      <Breadcrumbs :breadcrumbs="breadcrumbs" class="product-page__breadcrumbs"/>
      <h1 class="product-page__title" itemprop="name">{{ product.title }}</h1>
      <LazyRatingComponent v-if="product.reviewsCount" :product="product"/>
      <div class="product-page__badges">
        <a v-if="product.downloadLink" :href="product.downloadLink"
           class="product-page__badge">
          <img alt="Иконка скачивания" class="product-page__badge-icon" src="@/assets/images/ui/download.svg"/>
          <span>Скачать</span>
        </a>
        <RouterLink v-if="product.instructionLink && product.isActivationByPhone"
                    :to="{ name: 'page', params: { page: product.instructionLink } }"
                    class="product-page__badge" target="_blank">
          <img alt="Иконка звонка" class="product-page__badge-icon" src="@/assets/images/ui/call.svg"/>
          <span>Активация по телефону</span>
        </RouterLink>
        <div class="product-page__badge">
          <img alt="Иконка звонка" class="product-page__badge-icon" src="@/assets/images/ui/fast.svg"/>
          <span>Моментальная доставка</span>
        </div>
      </div>
      <div class="product-page__description" v-html="product.description"></div>
      <ProductInfo :product="product"/>
      <div class="product-page__add-to-cart">
        <ProductBooking :product="product"/>
      </div>
      <div class="product-page__payment-methods">
        <div class="product-page__payment-methods__header">
          <span class="product-page__payment-methods__header-text">оплата через</span>
        </div>
        <img alt="Платежные методы" class="product-page__payment-methods__image"
             src="@/assets/images/ui/payment_methods-min.png"/>
      </div>
    </div>
  </div>
  <div v-if="product" class="product-page__reviews">
    <ProductReviews :product="product"/>
  </div>
</template>

<style lang="scss" scoped>
.product-page {
  @apply flex flex-col md:grid grid-cols-5 gap-12 items-start border-b pb-20;

  &__badges {
    @apply grid grid-cols-2 gap-4;
  }

  &__badge {
    @apply p-3 px-4 rounded-lg border self-start flex flex-row gap-4 items-center
    no-underline font-bold transition hover:shadow-xl w-full;

    &-icon {
      @apply w-5;
    }

    &:first-child {
      @apply border-emerald-100 bg-green-50 hover:bg-green-200
    }

    &:nth-child(2) {
      @apply border-amber-100 bg-yellow-50 hover:bg-yellow-200
    }

    &:nth-child(3) {
      @apply border-red-100 bg-red-50 hover:bg-red-200 col-span-2
    }
  }

  &__content {
    @apply col-span-3 flex flex-col gap-4;
  }

  &__add-to-cart {
    @apply mt-8;
  }

  &__payment-methods {
    @apply flex flex-col items-center gap-4;

    &__header {
      @apply w-full flex flex-row items-center gap-5 text-sm text-gray-400;

      &-text {
        @apply flex-shrink-0;
      }

      &::after,
      &::before {
        @apply content-[''] w-full h-full border-b block;
      }
    }

    &__image {
      @apply max-w-sm m-auto;
    }
  }

  &__reviews {
    @apply mt-10;
  }

  &__description {
    &-title {
      @apply font-bold leading-tight text-xl mt-0 mb-4;
    }
  }

  &__title {
    @apply font-bold leading-tight text-3xl mt-0;
  }
}
</style>
