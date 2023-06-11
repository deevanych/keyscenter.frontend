<script lang="ts" async setup>
  const isSuccess = !!useRoute().query.status
  const statusHeader = isSuccess ? 'Платеж совершен' : 'Произошла ошибка'
  const statusText = isSuccess ? 'Спасибо за заказ! Инструкции и ключи отправлены на электронную почту, указанную при заказе.'
      : 'Произошла ошибка. Попробуйте заново или напишите нам на почту или в чат.'

  useHead({
    title: statusHeader
  })

  onMounted(() => {
    if (isSuccess) {
      window.ym(93533001,'reachGoal','successfulPayment')
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