<script async lang="ts" setup>
import { PageAPI } from '~/api/page';

const route = useRoute()
const {data} = await useAsyncData('page', async () => await PageAPI.get(route.params.page as string))

useHead({
	title: data.value.title,
	meta: [
		{
			name: 'description',
			content: data.value.description
		}
	]
})
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

  &-content {
    :deep(a) {
      @apply text-purple-500 underline hover:text-purple-700 transition-colors;
    }
  }
}
</style>
