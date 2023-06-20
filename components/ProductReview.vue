<script lang="ts" async setup>
	import { ProductsAPI } from '~/api/products';
	import IReview = ProductsAPI.IReview;
	import dayjs from 'dayjs';
	import 'dayjs/locale/ru';
	
	interface IProps {
		review: IReview
	}
	
	const props = defineProps<IProps>()
	dayjs.locale('ru')
	const formattedDate = dayjs(props.review.attributes.createdAt).format('DD MMMM YYYY в HH:mm')
</script>

<template>
	<div class="review">
		<div class="review__header">
			<div class="review__state">
				<svg v-if="props.review.attributes.is_positive" class="text-green-500" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM200 344V280H136c-13.3 0-24-10.7-24-24s10.7-24 24-24h64V168c0-13.3 10.7-24 24-24s24 10.7 24 24v64h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" fill="currentColor"/></svg>
				<svg v-else xmlns="http://www.w3.org/2000/svg" class="text-red-500" height="1em" viewBox="0 0 448 512"><path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm88 200H296c13.3 0 24 10.7 24 24s-10.7 24-24 24H152c-13.3 0-24-10.7-24-24s10.7-24 24-24z" fill="currentColor"/></svg>
			</div>
			{{ formattedDate }}
		</div>
		{{ props.review.attributes.text }}
	</div>
</template>

<style lang="scss" scoped>
	.review {
		@apply pt-5;
		
		&__header {
			@apply flex items-center gap-2 mb-1 text-sm text-gray-500 dark:text-gray-400;
		}
	}
</style>
