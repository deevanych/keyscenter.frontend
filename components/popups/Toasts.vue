<script setup lang="ts">
	import { useToastsStore } from '~/store/toasts';
	
	const toastsStore = useToastsStore()
</script>

<template>
	<div class="toasts">
		<TransitionGroup name="fade">
			<ToastComponent v-for="toast in toastsStore.getToasts"
											:key="toast.timestamp"
											:text="toast.text"
											:type="toast.type"/>
		</TransitionGroup>
	</div>
</template>

<style scoped lang="scss">
	.toasts {
		@apply fixed top-36 right-4 z-50 flex flex-col gap-4;
	}
</style>
