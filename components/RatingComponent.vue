<script async lang="ts" setup>
import type {Product, ShortProduct} from '~/models/Product';

interface IProps {
  product: Product | ShortProduct
}

const props = defineProps<IProps>()

const ratingValue = (props.product.positiveReviewsPercent / 20).toFixed(2)
</script>

<template>
	<span class="text-xs flex items-center" itemprop="aggregateRating"
        itemscope itemtype="https://schema.org/AggregateRating">
    <svg class="text-yellow-400" fill="none" height="16" viewBox="0 0 16 16" width="16"
         xmlns="http://www.w3.org/2000/svg">
      <path
          d="M14.1887 5.51739L10.2215 4.94083L8.4481 1.34551C8.39966 1.24708 8.31998 1.16739 8.22154 1.11895C7.97466 0.997076 7.67466 1.09864 7.55123 1.34551L5.77779 4.94083L1.8106 5.51739C1.70123 5.53301 1.60123 5.58458 1.52466 5.6627C1.4321 5.75784 1.3811 5.88583 1.38286 6.01855C1.38461 6.15127 1.43899 6.27786 1.53404 6.37051L4.40435 9.16895L3.72623 13.1205C3.71032 13.2124 3.7205 13.307 3.75559 13.3934C3.79068 13.4798 3.84929 13.5547 3.92477 13.6095C4.00025 13.6644 4.08958 13.6969 4.18263 13.7036C4.27568 13.7102 4.36873 13.6906 4.45123 13.6471L7.99966 11.7815L11.5481 13.6471C11.645 13.6986 11.7575 13.7158 11.8653 13.6971C12.1372 13.6502 12.32 13.3924 12.2731 13.1205L11.595 9.16895L14.4653 6.37051C14.5434 6.29395 14.595 6.19395 14.6106 6.08458C14.6528 5.81114 14.4622 5.55801 14.1887 5.51739Z"
          fill="currentColor"></path>
    </svg>
		<span class="rating">{{ props.product.reviewsHumanize }}, {{ props.product.positiveReviewsPercent }}%</span>
		<meta :content="ratingValue" class="rating-text" itemprop="ratingValue">
		<meta :content="props.product.reviewsCount.toString()" class="rating-text" itemprop="reviewCount">
	</span>
</template>

<style lang="scss" scoped>
.rating {
  @apply ml-1 text-gray-500 mt-[2px];
}
</style>
