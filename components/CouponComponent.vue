<script setup lang="ts">
import { price } from '~/helpers/price';
import { ICartCoupon } from '~/store/cart';

interface IProps {
	coupon: ICartCoupon;
}

const props = defineProps<IProps>()
const couponFormattedDiscount = () => {
	if (props.coupon.discountType === 'amount') {
		return price(props.coupon.discount)
	}
	
	return `${props.coupon.discount}%`
}
</script>

<template>
	<div class="coupon__wrapper">
		<div class="coupon">{{ props.coupon.coupon }}</div>
		<div class="coupon__discount">{{ couponFormattedDiscount() }}</div>
	</div>
</template>

<style scoped lang="scss">
.coupon {
	@apply bg-green-100 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded order-1;
	
	&__discount {
		@apply order-3;
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
