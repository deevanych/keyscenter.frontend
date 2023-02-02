<script lang="ts" setup>
	interface IProps {
		disabled: boolean
	}
	
	const props = withDefaults(defineProps<IProps>(), {
		disabled: false
	})
</script>

<template>
	<button type="button" class="button" :disabled="props.disabled">
		<slot />
	</button>
</template>

<style lang="scss" scoped>
	.button {
		@apply inline-block px-4 py-3 bg-purple-600 text-white uppercase rounded-full hover:bg-purple-700 transition-colors
		duration-300 transition-shadow hover:shadow-xl whitespace-nowrap;
		
		&:disabled {
			@apply cursor-not-allowed bg-gray-100 shadow-none text-gray-400;
		}
	}
</style>
