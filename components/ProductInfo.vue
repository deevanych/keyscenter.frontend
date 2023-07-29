<script lang="ts" setup>
// @ts-ignore
const chatClick = () => window.jivo_api.open()
</script>

<template>
  <div class="product-info">
    <div class="product-info__item">
      <img alt="Иконка звонка" class="product-info__item-icon" src="@/assets/images/ui/time.svg"/>
      Покупайте непосредственно перед активацией
    </div>
    <RouterLink :to="{ name: 'page', params: { page: 'instrukcziya-po-aktivaczii-microsoft-office' } }"
                class="product-info__item">
      <img alt="Иконка звонка" class="product-info__item-icon" src="@/assets/images/ui/guide.svg"/>
      Инструкция по активации
    </RouterLink>
    <div class="product-info__item" @click="chatClick">
      <img alt="Иконка звонка" class="product-info__item-icon" src="@/assets/images/ui/question.svg"/>
      Помощь с активацией
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-info {
  @apply grid grid-cols-2 gap-4 border-t py-6 border-b;

  &__item {
    @apply p-3 px-4 rounded-lg border border-blue-100 self-start flex flex-row gap-4 items-center
    no-underline bg-sky-50 hover:bg-sky-200 font-bold transition hover:shadow-xl;

    &:first-child {
      @apply col-span-2 cursor-help;
    }

    &:last-child {
      @apply cursor-pointer;
    }

    &-icon {
      @apply w-5;
    }
  }
}
</style>