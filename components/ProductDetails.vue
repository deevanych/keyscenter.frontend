<script lang="ts" setup>
import {Product} from "../models/Product";

interface IProps {
  product: Product
}

const props = defineProps<IProps>()
</script>

<template>
  <div class="product-details">
    <dl class="product-details__line">
      <dt class="product-details__title">
        Доставка
      </dt>
      <dd class="product-details__value">
        {{ props.product.productDelivery }}
      </dd>
    </dl>
    <dl class="product-details__line">
      <dt class="product-details__title">
        Тип товара
      </dt>
      <dd class="product-details__value">
        {{ props.product.productType }}
      </dd>
    </dl>
    <dl class="product-details__line">
      <dt class="product-details__title">
        Просмотров
      </dt>
      <dd class="product-details__value">
        {{ props.product.views }}
      </dd>
    </dl>
  </div>
</template>

<style lang="scss" scoped>
.product-details {
  @apply flex flex-col gap-2;

  &__line {
    @apply flex items-center justify-between;

    &:after {
      @apply order-2;

      align-self: flex-end;
      border-bottom: 1px dashed #e6e8ec;
      content: "";
      flex: auto;
      margin: 0 0.5rem;
      position: relative;
      top: -1px;
    }
  }

  &__title {
    @apply order-1;
  }

  &__value {
    @apply order-3;
  }
}
</style>