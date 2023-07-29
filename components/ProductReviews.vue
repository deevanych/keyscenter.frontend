<script lang="ts" setup>
import {ProductsAPI} from '../api/products';
import {email, required} from "@vuelidate/validators";
import useVuelidate from '@vuelidate/core';
import {useToastsStore} from '../store/toasts';
import {ReviewsAPI} from '../api/reviews';
import type {Product} from "../models/Product";
import IReview = ProductsAPI.IReview;


interface IProps {
  product: Product
}

const {showToast, showErrorToast} = useToastsStore()
const props = defineProps<IProps>()
const reviews = ref<IReview[]>(props.product.reviews)
const isPositive = ref(true)
const isLoading = ref(false)
const state = reactive({
  email: '',
  comment: ''
})
const vuelidateRules = {
  email: {
    required, email
  },
  comment: {
    required
  }
}

const vuelidate = useVuelidate(vuelidateRules, state)

const submitForm = async () => {
  try {
    isLoading.value = true
    const {data} = await ReviewsAPI.create({...state, is_positive: isPositive.value, product_id: props.product.id})
    reviews.value = data
    showToast('Отзыв отправлен на модерацию')
  } catch (error: any) {
    showErrorToast(error)
  } finally {
    isLoading.value = false
  }

  return false
}
</script>

<template>
  <h3 class="review-title">Отзывы ({{ product.reviewsHumanize }}<span
      v-if="product.reviewsCount">, {{ product.positiveReviewsPercent }}% положительных</span>)
  </h3>
  <form class="review-form" @submit.prevent="submitForm">
			<textarea id="comment"
                v-model="state.comment"
                class="review-form__input"
                placeholder="Введите ваш комментарий ..."
                required
                rows="2"></textarea>
    <div class="review-form__footer">
      <UiInput v-model="state.email"
               placeholder="Почта, с которой был совершен заказ"/>
      <UiCheckbox v-model="isPositive">Положительный</UiCheckbox>
      <UiButton :disabled="vuelidate.$invalid"
                :loading="isLoading"
                type="submit">
        Отправить
      </UiButton>
    </div>
  </form>
  <transition-group name="fade-top">
    <ProductReview v-for="review in reviews"
                   :key="review.attributes.createdAt"
                   :review="review"/>
  </transition-group>
</template>

<style lang="scss" scoped>
.review-title {
  @apply font-bold leading-tight text-xl mt-0 mb-4;
}

.review-form {
  @apply flex gap-5 flex-col;

  &__footer {
    @apply flex gap-5 items-stretch;
  }

  &__input {
    @apply p-2 px-3 w-full text-gray-900 border rounded focus:ring-0 focus:outline-none text-sm border-gray-300;
  }
}
</style>
