<script lang="ts" setup>
interface IProps {
    label?: string
    placeholder?: string
    modelValue: string
    name?: string
}

const props = defineProps<IProps>()

const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
    <div class="input__wrapper">
        <label v-if="props.label"
               class="input__label"
               for="success">{{ props.label }}</label>
        <input :model-value="props.modelValue"
               :placeholder="props.placeholder"
               :name="props.name"
               class="input"
               @input="emits('update:modelValue', $event.target.value)"/>
    </div>
</template>

<style lang="scss" scoped>
.input {
    @apply h-full border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 w-full focus:border-blue-500 block p-2.5 px-4;

    &__wrapper {
        @apply w-full;
    }

    &__label {
        @apply block mb-2 text-sm font-medium text-green-700 dark:text-green-500;
    }
}
</style>
