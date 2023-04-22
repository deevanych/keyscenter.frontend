<script lang="ts" setup>
import type {CartItem} from "~/models/CartItem";
import {price} from "~/helpers/price";

interface IProps {
    item: CartItem
}

const props = defineProps<IProps>()
</script>

<template>
    <div class="cart-item">
        <img :alt="props.item.title" :src="props.item.preview" class="cart-item__preview"/>
        <div class="cart-item__wrapper">
            <h3 class="cart-item__title">{{ props.item.title }}</h3>
            <AddToCart :product="props.item"/>
            <div class="cart-item__sum">
                Итого: {{ price(props.item.price) }} * {{ props.item.quantity }} =
                {{ price(props.item.price * props.item.quantity) }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cart-item {
  @apply flex gap-10;

  &__title {
    @apply mt-0 mb-2;
  }

  &__sum {
    @apply font-bold leading-tight mt-10;
  }
}
</style>