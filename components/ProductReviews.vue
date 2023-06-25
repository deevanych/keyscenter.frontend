<script setup lang="ts">
import { ProductsAPI } from '~/api/products';
import IReview = ProductsAPI.IReview;
import {email, required} from "@vuelidate/validators";
import useVuelidate from '@vuelidate/core';

interface IProps {
	reviews: IReview[]
}

const props = defineProps<IProps>()
const isPositive = ref(true)
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

const submitForm = () => {
	console.log(isPositive.value)
	
	return false
}
</script>

<template>
	<form class="review-form" @submit.prevent="submitForm">
			<textarea id="comment"
								rows="2"
								v-model="state.comment"
								class="review-form__input"
								placeholder="Введите ваш комментарий ..."
								required></textarea>
		<div class="review-form__footer">
			<UiInput placeholder="Почта, с которой был совершен заказ" v-model="state.email"/>
			<UiCheckbox v-model="isPositive">Положительный</UiCheckbox>
			<UiButton type="submit" :disabled="vuelidate.$invalid">Отправить</UiButton>
		</div>
	</form>
	<ProductReview v-for="review in reviews"
								 :key="review.attributes.createdAt"
								 :review="review"/>
</template>

<style scoped lang="scss">
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
