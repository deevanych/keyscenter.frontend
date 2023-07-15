<script lang="ts" setup>
import {ShortProduct} from '../models/Product';
import {useCartStore} from "~/store/cart";
import {usePopupsStore} from "~/store/popups";
import {useToastsStore} from '~/store/toasts';

const cartStore = useCartStore()
const popupsStore = usePopupsStore()
const toastStore = useToastsStore()

interface IProps {
  product: ShortProduct
}

const props: IProps = defineProps<IProps>()
const product: ShortProduct = props.product
const isLoading = ref(false)

const addToCart = async () => {
  try {
    isLoading.value = true
    await cartStore.addToCart(props.product.id)
    popupsStore.cartPopup = true
    toastStore.showToast('Товар добавлен в корзину')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <NuxtLink :to="{name: 'catalog-category-product', params: { category: product.categorySlug, product: product.slug } }"
            class="product-card">
    <span class="product-card__preview-wrapper">
        <span class="product-card__preview-bg"></span>
        <span
            class="product-card__preview"></span>
        <img :src="product.preview"
             alt=""
             class="product-card__preview"
             height="224"
             width="224"/>
      </span>
    <span class="product-card__meta">
        <span class="product-card__category">{{ product.categoryTitle }}</span>
        <h5 class="product-card__title">{{ product.title }}</h5>
        <LazyRatingComponent v-if="product.reviewsCount" :product="product"/>
        <span class="product-card__prices">
          <span class="product-card__price_current">{{ product.currentPrice }}</span>
          <span v-if="product.oldPrice"
                class="product-card__price_old">{{ product.oldPrice }}
          </span>
        </span>
      </span>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.product-card {
  @apply max-w-none relative no-underline flex justify-center flex flex-col;

  &__tag {
    @apply absolute top-4 -left-4;
  }

  &__meta {
    @apply text-xs flex flex-col gap-1 p-6 pt-40 -mt-36 relative;
  }

  &__title {
    @apply text-gray-900 font-bold text-sm transition;
  }

  &__category {
    @apply text-black/60
  }

  &__prices {
    @apply flex gap-2 mt-4 text-sm;
  }

  &__price {
    &_old {
      @apply line-through text-black/60;
    }

    &_current {
      @apply text-xl font-bold;
    }
  }

  &__preview {
    @apply aspect-square object-center object-scale-down m-auto drop-shadow-xl z-10
    will-change-transform relative transition backdrop-blur-md;

    &-wrapper {
      @apply relative m-auto flex items-center justify-center;
    }

    &-bg {
      @apply w-[70%] h-[70px] bg-black absolute bg-gradient-to-r from-cyan-500 to-blue-500 will-change-transform
      transition-all
      absolute opacity-20 h-[120px] w-[80%];

      border-radius: 51% 49% 70% 30% / 30% 30% 70% 70%;
    }
  }

  &:hover {
    .product-card {
      &__preview {
        @apply -translate-y-2 drop-shadow-2xl;

        &-bg {
          @apply h-[120px] w-[80%];
        }
      }

      &__title {
        @apply text-sky-900;
      }
    }
  }
}
</style>
