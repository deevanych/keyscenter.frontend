<template>
  <header class="header">
    <div class="container mx-auto">
      <nuxt-link :to="{ name: 'index' }">Главная</nuxt-link>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  .header {
    @apply shadow z-10 fixed w-full bg-white top-0 h-24 flex items-center;
  }
</style>