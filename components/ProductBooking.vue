<script lang="ts" setup>
import {Product} from "../models/Product";
import AddToCart from '../components/AddToCart.vue';
import {useCartStore} from "../store/cart";

interface IProps {
  product: Product
}

const cartStore = useCartStore()
const props = defineProps<IProps>()
const existsItem = computed(() => cartStore.getItemById(props.product.id))
const quantity = computed(() => typeof existsItem.value !== 'undefined' ? existsItem.value.quantity : 1)
</script>

<template>
  <div v-if="props.product"
       class="product-booking">
    <div class="product-booking__prices" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
      <div class="product-booking__price product-booking__price_old">
        {{ props.product.oldPrice }}
      </div>
      <div class="product-booking__price product-booking__price_current">
        {{ props.product.currentPrice }}
      </div>
      <LazyUiTag class="product-booking__discount">{{ props.product.humanizedDiscountPercent }}</LazyUiTag>
      <meta :content="props.product.currentPriceNonFormatted.toString()" itemprop="price">
      <meta content="RUB" itemprop="priceCurrency">
      <meta v-if="props.product.isInStock" href="https://schema.org/InStock" itemprop="availability"/>
    </div>
    <AddToCart :key="quantity"
               :item-id="existsItem ? existsItem.id : undefined"
               :max-count="props.product.availableCount"
               :product-id="props.product.id"
               :quantity="quantity"/>
  </div>
</template>

<style lang="scss" scoped>
.product-booking {
  @apply w-full flex flex-col gap-6;

  &__discount {
    @apply -mt-[6px];
  }

  &__price {
    @apply text-2xl;

    &_old {
      @apply line-through text-gray-500;
    }

    &_current {
      @apply font-bold text-sky-600 text-3xl;
    }
  }

  &__prices {
    @apply flex flex-row gap-4 items-center;
  }
}
</style>
