<script lang="ts" setup>
import {useCartStore} from "~/store/cart";
import {usePopupsStore} from "~/store/popups";
import {computed} from "vue";
import Input from "~/components/ui/Input.vue";

const {toggleCartPopup} = usePopupsStore()
const {getItems: cartItems} = useCartStore()
const cartTotalSum = computed(() => useCartStore().getTotalSum)

const keypressHandler = (e: KeyboardEvent) => {
    if (e.isTrusted && e.key === 'Escape') {
        closePopup()
    }
}

const closePopup = (): void => {
    toggleCartPopup(false)
}

onMounted(() => {
    window.addEventListener('keydown', keypressHandler)
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', keypressHandler)
})
</script>

<template>
    <div class="cart-popup">
        <div class="cart-popup__background"
             @click="closePopup"></div>
        <div class="cart-popup__wrapper">
            <div class="cart-popup__content">
                <div class="cart-popup__content-section">
                    <h3 class="cart-popup__content-section-title">Товары</h3>
                    <div class="cart-popup__content-section-content">
                        <CartItem v-for="cartItem in cartItems" :item="cartItem"/>
                    </div>
                </div>
                <div class="cart-popup__content-section">
                    <h3 class="cart-popup__content-section-title">Оформление</h3>
                    <Input/>
                    <form action="https://yoomoney.ru/quickpay/confirm.xml" method="POST">
                        <input :value="useRuntimeConfig().public.paymentReceiverAccountNumber" name="receiver"
                               type="hidden"/>
                        <input :value="useRuntimeConfig().public.paymentReceiverAccountNumber" name="label"
                               type="hidden"/>
                        <input name="quickpay-form" type="hidden" value="button"/>
                        <input name="paymentType" type="hidden" value="AC"/>
                        <input :value="cartTotalSum" data-type="number" name="sum" type="hidden"/>
                        <input type="submit" value="Transfer"/>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cart-popup {
  @apply fixed flex w-full h-full top-0 left-0 z-10;

  &__background {
      @apply fixed w-full h-full bg-black opacity-60 top-0 left-0 cursor-pointer;
  }

  &__wrapper {
    @apply bg-white m-auto z-10 overflow-hidden rounded;
  }

  &__content {
    @apply flex flex-row divide-x py-12;

    &-section {
      @apply px-10 max-w-xl;

      &-title {
        @apply font-bold leading-tight text-2xl mt-0 mb-10;
      }

      &-content {
        @apply divide-y;
      }
    }
  }
}
</style>