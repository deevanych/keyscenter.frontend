<script lang="ts" setup>
  interface IProps {
    platforms: string[]
  }

  const props = defineProps<IProps>()
</script>

<template>
  <platforms-sprite />
  <svg v-for="platform in props.platforms"
       :key="platform"
       class="product-platform__icon">
    <use :xlink:href="`#${platform.toLowerCase()}`"></use>
  </svg>
</template>

<style lang="scss" scoped>
  .product-platform__icon {
    width: 16px;
    height: 16px;
  }
</style>