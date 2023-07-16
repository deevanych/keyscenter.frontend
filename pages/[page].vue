<script async lang="ts" setup>
import {PageAPI} from '~/api/page';

const route = useRoute()
const {data} = await useAsyncData('page', async () => await PageAPI.show(route.params.page as string))

if (data.value && !data.value.error) {
  useHead({
    title: data.value.title,
    meta: [
      {
        name: 'description',
        content: data.value.description
      }
    ]
  })
} else {
  throw createError({statusCode: 404, statusMessage: 'Page Not Found'})
}
</script>

<template>
  <div class="page">
    <h1 class="page-header">{{ data.title }}</h1>
    <div class="page-content" v-html="data.content"></div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  &-header {
    @apply font-bold leading-tight text-3xl mt-0 mb-4;
  }
}
</style>
