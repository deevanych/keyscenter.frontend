<script lang="ts" setup>
import {Product} from "~/models/Product";
import AddToCart from '~/components/AddToCart.vue';

interface IProps {
    product: Product
}

const props = defineProps<IProps>()
</script>

<template>
  <div v-if="props.product"
       class="product-booking">
    <img :src="props.product.preview"
         :alt="props.product.title"
         class="product-booking__image"/>
    <div class="product-booking__prices">
      <div class="product-booking__price-wrapper">
        <div class="product-booking__price product-booking__price_current">
          {{ props.product.currentPrice }}
        </div>
      </div>
      <div class="product-booking__price-wrapper">
        <div class="product-booking__price product-booking__price_old">
          {{ props.product.oldPrice }}
        </div>
        <div class="product-booking__discount">
          <LazyUiTag>{{ props.product.discountPercent }}</LazyUiTag>
        </div>
      </div>
    </div>
    <div class="product-booking__availability">
      {{ props.product.isInStockWithCountHumanized }}
    </div>
      <AddToCart :product="props.product"/>
  </div>
</template>

<style lang="scss" scoped>
  .product-booking {
    @apply p-8 shadow rounded-md flex flex-col gap-6;

    &__image {
      @apply rounded border;
    }

    &__prices {
      @apply grid grid-cols-2 divide-x;
    }

    &__availability {
      text-align: center;
    }

    &__price {
      &-wrapper {
        @apply flex flex-col text-center items-center justify-center;
      }

      &_old {
        @apply line-through;
      }

      &_current {
        @apply font-bold leading-tight text-3xl;
      }
    }
  }
</style>
