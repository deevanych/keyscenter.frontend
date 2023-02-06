<script lang="ts" setup>
  import IconCart from "~/components/IconCart.vue";
</script>

<template>
  <header class="header">
    <div class="header__wrapper">
      <nuxt-link :to="{ name: 'index' }">Главная</nuxt-link>
      <icon-cart />
    </div>
  </header>
</template>

<style lang="scss" scoped>
  .header {
    @apply shadow z-10 fixed w-full bg-white top-0 h-24 flex items-center;

    &__wrapper {
      @apply flex justify-between container mx-auto h-full items-center;
    }
  }
</style>