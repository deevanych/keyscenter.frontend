<script lang="ts" setup>
import {useCartStore} from "~/store/cart";
import {usePopupsStore} from "~/store/popups";
import {email, required} from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import {Ref} from "vue";
import {OrderAPI} from "~/api/order";

const {toggleCartPopup} = usePopupsStore()
const cartStore = useCartStore()
const cartTotalSum = ref(0)
const cartItems = computed(() => cartStore.getItems)
const cartOrder = ref(0)

const keypressHandler = (e: KeyboardEvent) => {
    if (e.isTrusted && e.key === 'Escape') {
        closePopup()
    }
}

const closePopup = (): void => {
    toggleCartPopup(false)
}

const state = reactive({
    email: ''
})

const form: Ref<HTMLFormElement | undefined> = ref()

const rules = {
    email: {required, email}
}

const buttonIsLoading: Ref<boolean> = ref(false)

const vuelidate = useVuelidate(rules, state)

onMounted(() => {
    window.addEventListener('keydown', keypressHandler, {passive: true})
})

onBeforeUnmount(() => {
    window.removeEventListener('keydown', keypressHandler)
})

const formSubmit = async () => {
    try {
        buttonIsLoading.value = true
        const { data } = await OrderAPI.create(cartStore.uuid, state.email)
        cartTotalSum.value = data.attributes.sum
        cartOrder.value = data.attributes.uuid
        await nextTick()
				window.ym(93533001,'reachGoal','goToPayment')
        form.value?.submit()
    } catch (_) {
    } finally {
        buttonIsLoading.value = false
    }
}
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
                        <CartItem v-for="cartItem in cartItems"
                                  :item="cartItem"
                                  :key="cartItem.id"/>
                    </div>
                </div>
                <div class="cart-popup__content-section">
                    <h3 class="cart-popup__content-section-title">Оформление</h3>
                    <div class="cart-popup__payment">
                        <i>Внимание! Проверьте правильность ввода email. На этот адрес придут купленные товары.</i>
                        <form ref="form" action="https://yoomoney.ru/quickpay/confirm.xml"
                              method="POST" @submit.prevent="formSubmit"
                              class="cart-popup__payment-action">
                            <UiInput v-model="state.email" name="email" placeholder="Введите адрес электроной почты"/>
                            <input :value="useRuntimeConfig().public.paymentReceiverAccountNumber" name="receiver"
                                   type="hidden"/>
                            <input :value="cartOrder" name="label"
                                   type="hidden"/>
                            <input name="quickpay-form" type="hidden" value="button"/>
                            <input name="paymentType" type="hidden" value="AC"/>
                            <input :value="cartTotalSum" data-type="number" name="sum" type="hidden"/>
                            <LazyUiButton :disabled="vuelidate.$invalid"
                                          :loading="buttonIsLoading"
																					class="cart-popup__payment-button"
                                          type="submit">
                                Перейти к оплате
                            </LazyUiButton>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cart-popup {
  @apply fixed flex w-full h-full top-0 left-0 z-10;

  &__payment {
    @apply flex gap-4 flex-col;

    &-action {
      @apply flex gap-5 items-center flex-col md:flex-row;
    }
		
		&-button {
			@apply w-full md:w-auto;
		}
  }

  &__background {
    @apply fixed w-full h-full bg-black opacity-60 top-0 left-0 cursor-pointer;
  }

  &__wrapper {
    @apply bg-white mx-10 md:mx-auto m-auto z-10 overflow-hidden rounded;
  }

  &__content {
    @apply flex flex-col md:flex-row divide-y md:divide-x md:divide-y-0 md:py-12 px-10 md:px-0;

    &-section {
      @apply py-10 md:py-0 md:px-10 max-w-xl;

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
