<script lang="ts" setup>
import {useCartStore} from "../store/cart";
import {usePopupsStore} from "../store/popups";
import {storeToRefs} from "pinia";

const {getItemsCount, getHumanizedItemsCount} = storeToRefs(useCartStore())
const {isMobile} = toRefs(useDevice())

const showCartPopup = () => {
  usePopupsStore().toggleCartPopup()
}
</script>

<template>
  <Transition>
    <div class="cart-icon__wrapper"
         @click="showCartPopup">
      <span v-if="!isMobile">Корзина</span>
      <img alt="Корзина"
           class="cart-icon__wrapper"
           src="@/assets/images/ui/shopping-bag.svg"/>
      <div v-if="getItemsCount" class="cart-icon__counter">
        <span>
          {{ getHumanizedItemsCount }}
        </span>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.cart-icon {
  @apply h-6 w-6;

  &__wrapper {
    @apply relative cursor-pointer hover:text-purple-500 transition flex gap-4 items-center shrink-0;
  }

  &__counter {
    @apply absolute rounded-full bg-purple-500 w-5 h-5 flex -right-1 mb-4 drop-shadow-md;

    & > span {
      @apply text-white text-xs m-auto;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
