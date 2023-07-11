<script lang="ts" setup>
interface IProps {
  placeholder?: string
}

const props = withDefaults(defineProps<IProps>(), {
  placeholder: 'Microsoft Windows 11'
})
</script>

<template>
  <form action="" class="search__wrapper">
    <img class="search__icon" src="@/assets/images/ui/search-normal.svg"/>
    <input :placeholder="props.placeholder"
           class="search"
           type="text"/>
  </form>
</template>

<style lang="scss" scoped>
.search {
  @apply h-12 px-11 rounded bg-gray-100 rounded-full;

  &__wrapper {
    @apply relative flex items-center;
  }

  &__icon {
    @apply absolute ml-4;
  }
}
</style>