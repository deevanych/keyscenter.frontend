<script async lang="ts" setup>
import {ShortProduct} from "~/models/Product";

interface IProps {
  products: ShortProduct[]
}

const props: IProps = defineProps<IProps>()
const products = ref({})

props.products.forEach(product => {
  if (typeof products.value[product.categorySlug] === 'undefined') {
    products.value[product.categorySlug] = []
  }

  products.value[product.categorySlug].push(product)
})
</script>

<template>
  <div class="products">
    <div v-for="(_, productCategory) in products" class="products-section">
      <h2 class="products-section__title">{{ productCategory }}</h2>
      <div class="products-list">
        <ProductCard v-for="product in products[productCategory]"
                     :key="product.id"
                     :product="product"/>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.products {
  @apply flex flex-col gap-10;

  &-section {
    @apply flex flex-col gap-6;

    &__title {
      @apply font-bold leading-tight text-3xl;

      &:first-letter {
        text-transform: uppercase;
      }
    }
  }

  &-list {
    @apply flex md:grid grid-cols-1 gap-10 md:grid-cols-3 max-w-full flex-col md:flex-row px-6 md:px-0;
  }
}
</style>
