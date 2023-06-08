<script lang="ts" setup>
import {computed, Ref} from 'vue';
import {useCartStore} from "~/store/cart";

const cartStore = useCartStore()

interface IProps {
	maxCount: number
	productId: number
	itemId?: number
	quantity?: number
}

const props = withDefaults(defineProps<IProps>(), {
	quantity: 1
})
const quantity: Ref<number> = ref(props.quantity)
const isLoading: Ref<boolean> = ref(false)

const changeValue = (increment = true): void => {
	increment ? quantity.value++ : quantity.value--
}

const isButtonDisabled = (increment = true): boolean => {
	return (increment && quantity.value >= props.maxCount) || !increment && quantity.value <= 0;
}
const isAddToCartButtonEnabled = computed(() => 0 < quantity.value && quantity.value <= props.maxCount)

const cartAction = async (): Promise<void> => {
	try {
		isLoading.value = true
		if (typeof props.itemId !== 'undefined' && quantity.value === props.quantity) {
			await cartStore.removeFromCart(props.itemId)
			window.ym(93533001,'reachGoal','removeFromCart')
		} else {
			window.ym(93533001,'reachGoal','addToCart')
			await cartStore.addToCart(props.productId, quantity.value)
		}
	} catch (e) {
	} finally {
		isLoading.value = false
	}
}

const addToCartButtonText = computed((): string => {
	if (typeof props.itemId !== 'undefined') {
		return quantity.value === props.quantity ? 'Удалить' : 'Обновить'
	}

	return 'Купить'
})
	
	const addToCartButtonClass = computed((): string | void => {
		if (quantity.value === 0) {
			return
		}

		let buttonClass = '_buy'

		if (typeof props.itemId !== 'undefined') {
			buttonClass = quantity.value === props.quantity ? '_exists' : '_update'
		}
		
		return `add-to-cart__cart-button${buttonClass}`
	})
</script>

<template>
	<div class="add-to-cart">
		<div class="add-to-cart__wrapper">
			<button class="add-to-cart__button"
							@click="changeValue(false)"
							:disabled="isButtonDisabled(false)">
				<svg xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 448 512">
					<path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
				</svg>
			</button>
			<input type="number"
						 class="add-to-cart__input"
						 v-model="quantity"
						 :max="props.maxCount"/>
			<button class="add-to-cart__button"
							@click="changeValue"
							:disabled="isButtonDisabled()">
				<svg xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 448 512">
					<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
				</svg>
			</button>
		</div>
		<UiButton :disabled="!isAddToCartButtonEnabled"
							class="add-to-cart__cart-button"
							:loading="isLoading"
							@click="cartAction"
							:class="addToCartButtonClass">
			{{ addToCartButtonText }}
		</UiButton>
	</div>
</template>

<style lang="scss" scoped>
	.add-to-cart {
		@apply flex gap-6 items-center;
		
		&__input {
			@apply outline-none text-center w-full bg-gray-100 font-semibold hover:text-black
			focus:text-black text-gray-700 outline-none;
			
			&::-webkit-inner-spin-button,
			&::-webkit-outer-spin-button {
				-webkit-appearance: none;
				margin: 0;
			}
		}
		
		&__cart-button {
			@apply w-auto md:w-32 shrink-0;
			
			&_update {
				@apply bg-yellow-400 hover:bg-yellow-500;
			}
			
			&_exists {
				@apply bg-red-400 hover:bg-red-500;
			}
		}
		
		&__button {
			@apply bg-gray-100 text-gray-600
			hover:text-gray-700 hover:bg-gray-200
			h-full w-20 cursor-pointer outline-none flex items-center justify-center;
			
			&:disabled {
				@apply cursor-not-allowed bg-gray-50 hover:bg-gray-50;
			}
		}
		
		&__wrapper {
			@apply flex h-10 bg-gray-100 rounded overflow-hidden;
		}
	}
</style>
