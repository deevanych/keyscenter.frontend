<script lang="ts" async setup>
  import { computed } from 'vue';
	import { OrderAPI } from '~/api/order';
	
	const orderId = useRoute().query.orderId
	const isSuccess = ref(false)
	const isGoalSent = ref(true)
  const statusHeader = computed(() => isSuccess.value ? 'Платеж совершен' : 'Произошла ошибка')
  const statusText =  computed(() => isSuccess.value ? 'Спасибо за заказ! Инструкции и ключи отправлены на электронную почту, указанную при заказе.'
      : 'Произошла ошибка. Попробуйте заново или напишите нам на почту или в чат.')

  useHead({
    title: statusHeader
  })
	
	try {
		const {data: order} = await useAsyncData('order', async () => (await OrderAPI.get(orderId as string)).data)
		
		isSuccess.value = order.value.attributes.paid_at
		isGoalSent.value = order.value.attributes.is_goal_sent
	} catch (_) {
	
	}
	
  onMounted(() => {
    if (isSuccess.value && !isGoalSent.value) {
      window.ym(93533001,'reachGoal','successfulPayment')
			OrderAPI.update(orderId, {
				is_goal_sent: true
			})
    }
  })
</script>

<template>
  <h1 class="status-header">{{ statusHeader }}</h1>

  <span>{{ statusText }}</span>
</template>

<style lang="scss" scoped>
  .status-header {
    @apply font-bold leading-tight text-3xl mt-0 mb-2;
  }
</style>
