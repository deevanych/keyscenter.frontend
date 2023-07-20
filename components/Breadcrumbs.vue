<script lang="ts" setup>
export interface IBreadcrumb {
  title: string,
  url?: string
}

interface IProps {
  breadcrumbs: IBreadcrumb[]
}

const props = defineProps<IProps>()
</script>

<template>
  <nav class="breadcrumbs">
    <NuxtLink :to="{ name: 'index' }" class="breadcrumbs__item">Главная</NuxtLink>
    <NuxtLink v-for="breadcrumb in props.breadcrumbs"
              :key="breadcrumb.url"
              :to="breadcrumb.url"
              class="breadcrumbs__item">
      {{ breadcrumb.title }}
    </NuxtLink>
  </nav>
</template>

<style lang="scss" scoped>
.breadcrumbs {
  @apply flex flex-row gap-2 flex-wrap;

  &__item {
    @apply no-underline text-sm transition-colors;

    &:hover {
      @apply text-blue-900;
    }

    &::after {
      @apply content-['/'] ml-2;
    }

    &:last-of-type {
      @apply text-gray-500;

      &::after {
        @apply content-none;
      }
    }
  }
}
</style>