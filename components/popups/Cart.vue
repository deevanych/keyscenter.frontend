<script lang="ts" setup>
import { useCartStore } from "~/store/cart";
import { usePopupsStore } from "~/store/popups";
import { email, required } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";
import { Ref } from "vue";
import { OrderAPI } from "~/api/order";
import IPaymentResponse = OrderAPI.IPaymentResponse;
import { useToastsStore } from '~/store/toasts';
import { FetchError } from 'ofetch';
import { price } from '~/helpers/price';
import CouponComponent from '~/components/CouponComponent.vue';
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const {toggleCartPopup} = usePopupsStore()
const { getItems, getCoupons, sum, uuid } = storeToRefs(cartStore)
const toastsStore = useToastsStore()

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
const coupon: Ref<string> = ref('')

const vuelidate = useVuelidate(rules, state)

onMounted(() => {
	window.addEventListener('keydown', keypressHandler, {passive: true})
})

onBeforeUnmount(() => {
	window.removeEventListener('keydown', keypressHandler)
})

const formSubmit = async (): Promise<void> => {
	try {
		window.ym(93533001, 'reachGoal', 'goToPayment')
		buttonIsLoading.value = true
		const {data}: Promise<IPaymentResponse> = await OrderAPI.create(uuid, state.email)
		await nextTick()
		window.location.href = data.attributes.confirmation.confirmation_url
	} catch (e: FetchError) {
		toastsStore.showToast(e.data.error.message, 'error')
	} finally {
		buttonIsLoading.value = false
	}
}

const applyCoupon = async (): Promise<void> => {
	try {
		buttonIsLoading.value = true
		await cartStore.applyCoupon(coupon.value)
		ym(93533001, 'reachGoal', 'couponHasBeenApplied')
		toastsStore.showToast('Промокод применен')
	} catch (e: FetchError) {
		toastsStore.showToast(e.data.error.message, 'error')
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
						<CartItem v-for="cartItem in getItems"
											:item="cartItem"
											:key="cartItem.id"/>
					</div>
				</div>
				<div class="cart-popup__content-section">
					<h3 class="cart-popup__content-section-title">Промокод</h3>
					<div class="cart-popup__coupons">
						<CouponComponent v-for="coupon in getCoupons"
													 :key="coupon.coupon"
													 :coupon="coupon"/>
					</div>
					<form ref="form"
								method="POST"
								@submit.prevent="applyCoupon"
								class="cart-popup__payment-action cart-popup__payment-action_promocode">
						<UiInput v-model="coupon" name="email" placeholder="Введите промокод .."/>
						<LazyUiButton :disabled="!(coupon && coupon.length >= 3)"
													:loading="buttonIsLoading"
													class="cart-popup__payment-button"
													type="submit">
							Применить
						</LazyUiButton>
					</form>
					<h3 class="cart-popup__content-section-title">Оформление - {{ price(sum) }}</h3>
					<div class="cart-popup__payment">
						<i>Внимание! Проверьте правильность ввода email. На этот адрес придут купленные товары.</i>
						<form ref="form"
									method="POST"
									@submit.prevent="formSubmit"
									class="cart-popup__payment-action">
							<UiInput v-model="state.email" name="email" placeholder="Введите адрес электроной почты"/>
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
			@apply flex gap-5 items-stretch flex-col md:flex-row;
			
			&_promocode {
				@apply mb-10 pb-10 border-b;
			}
		}
		
		&-button {
			@apply w-full md:w-auto;
		}
	}
	
	&__background {
		@apply fixed w-full h-full bg-black opacity-60 top-0 left-0 cursor-pointer;
	}
	
	&__wrapper {
		@apply bg-white mx-auto m-auto z-10 h-full md:my-20 md:h-auto overflow-auto md:overflow-hidden md:rounded;
	}
	
	&__coupons {
		@apply flex gap-4 mb-6 w-full flex-col;
	}
	
	&__content {
		@apply flex flex-col md:flex-row divide-y md:divide-x md:divide-y-0 md:py-12 px-10 md:px-0 md:h-full;
		
		&-section {
			@apply py-10 md:py-0 md:px-10 max-w-xl md:overflow-auto md:h-full;
			
			&-title {
				@apply font-bold leading-tight text-2xl mt-0 mb-4 md:mb-10;
			}
			
			&-content {
				@apply divide-y;
			}
		}
	}
}
</style>
