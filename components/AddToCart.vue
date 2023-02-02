<script lang="ts" setup>
	interface IProps {
		max: number
	}
	
	const count = ref(1)
	const props = defineProps<IProps>()
	
	const changeValue = (increment = true): void => {
		increment ? count.value++ : count.value--
	}
	const isButtonDisabled = (increment = true): boolean => {
		if (increment && count.value >= props.max) {
			return true
		}
		
		return !increment && count.value <= 0;
	}
	
	const isAddToCartButtonEnabled = computed(() => {
		return count.value > 0 && count.value <= props.max
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
						 :max="props.max"
						 v-model="count"/>
			<button class="add-to-cart__button"
							@click="changeValue"
							:disabled="isButtonDisabled()">
				<svg xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 448 512">
					<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/>
				</svg>
			</button>
		</div>
		<ui-button :disabled="!isAddToCartButtonEnabled"/>
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
		
		&__button {
			@apply bg-gray-100 text-gray-600
			hover:text-gray-700 hover:bg-gray-200
			h-full w-20 cursor-pointer outline-none flex items-center justify-center;
			
			&:disabled {
				@apply cursor-not-allowed bg-gray-50;
			}
		}
		
		&__wrapper {
			@apply flex h-10 bg-gray-100 rounded overflow-hidden;
		}
	}
</style>
