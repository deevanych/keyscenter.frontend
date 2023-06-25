<script setup lang="ts">
interface IProps {
	modelValue: boolean
}

const props = defineProps<IProps>()
const onChange = ($event) => {
	emits('update:modelValue', $event.target.checked)
}
const emits = defineEmits<{
	(e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
	<div class="checkbox">
		<input @change="onChange"
					 :checked="props.modelValue"
					 type="checkbox"
					 id="checkbox"/>
		<label for="checkbox">
			<slot/>
		</label>
	</div>
</template>

<style scoped lang="scss">
.checkbox {
	@apply flex items-center gap-2 cursor-pointer;
}
</style>
