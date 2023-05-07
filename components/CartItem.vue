<script lang="ts" setup>
import {price} from "~/helpers/price";
import {ICartItem} from "~/store/cart";
import {URLHelpers} from "~/helpers/URL";

interface IProps {
    item: ICartItem
}

const props = defineProps<IProps>()
const productPrice = props.item.product.salePrice ?? props.item.product.price
</script>

<template>
    <div class="cart-item">
        <img :alt="props.item.product.title"
             :src="URLHelpers.getBackendURLHref(props.item.product.thumbnail)"
             class="cart-item__preview" height="156" width="127"/>
        <div class="cart-item__wrapper">
            <h3 class="cart-item__title">{{ props.item.product.title }}</h3>
            <AddToCart :product-id="props.item.product.id"
                       :max-count="props.item.availableCount"
                       :quantity="props.item.quantity"
                       :item-id="props.item.id"/>
            <div class="cart-item__sum">
                Итого: {{ price(productPrice) }} * {{ props.item.quantity }} =
                {{ price(productPrice * props.item.quantity) }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cart-item {
  @apply flex gap-10 py-5;

  &__title {
    @apply mt-0 mb-2;
  }

  &__sum {
    @apply font-bold leading-tight mt-10;
  }
}
</style>