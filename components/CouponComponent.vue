<script setup lang="ts">
import { price } from '~/helpers/price';
import { ICartCoupon, useCartStore } from '~/store/cart';
import { useToastsStore } from '~/store/toasts';
import { FetchError } from 'ofetch';

interface IProps {
	coupon: ICartCoupon;
}

const props = defineProps<IProps>()
const { cancelCoupon } = useCartStore()
const { showToast, showErrorToast } = useToastsStore()
const isLoading = ref(false)

const couponFormattedDiscount = () => {
	if (props.coupon.discount_type === 'amount') {
		return price(props.coupon.discount)
	}
	
	return `${props.coupon.discount}%`
}

const removeCoupon = async () => {
	try {
		isLoading.value = true
		await cancelCoupon(props.coupon.code)
		showToast('Промокод удален')
	} catch (error: FetchError) {
		showErrorToast(error)
	} finally {
		isLoading.value = false
	}
}
</script>

<template>
	<div class="coupon__wrapper">
		<div class="coupon">{{ props.coupon.code }}</div>
		<button class="coupon__cancel-button"
						:disabled="isLoading"
						@click="removeCoupon">
			<svg :class="{'coupon__cancel-button__icon': isLoading}"
					 xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
				<path
						d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
						fill="currentColor;"/>
			</svg>
		</button>
		<div class="coupon__discount">{{ couponFormattedDiscount() }}</div>
	</div>
</template>

<style scoped lang="scss">
.coupon {
	@apply bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded order-1;
	
	&__discount {
		@apply order-3;
	}
	
	&__cancel-button {
		@apply flex items-center bg-red-100 text-green-800 text-xs font-medium mr-2 px-2 py-0.5 rounded order-1
		cursor-pointer hover:bg-red-200 transition-colors;
		
		&__icon {
			@apply animate-spin;
		}
	}
	
	&__wrapper {
		@apply flex justify-between w-full;
		
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
}
</style>
