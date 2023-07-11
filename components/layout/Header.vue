<!--todo-->
<!--placed header/footer links to API-->

<script lang="ts" setup>

</script>

<template>
  <header class="header">
    <div class="header__wrapper">
      <NuxtLink :to="{ name: 'index' }" title="Главная">
        <img alt="Keyscenter" class="header__logo" src="/logo.svg"/>
      </NuxtLink>
      <UiSearch/>
      <nav class="header__links">
        <NuxtLink :to="{ name: 'catalog' }">Каталог</NuxtLink>
        <NuxtLink :to="{ name: 'page', params: { page: 'kontakty' } }">Контакты</NuxtLink>
      </nav>
      <IconCart/>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  @apply z-10 fixed w-full bg-white top-0 py-6 flex items-center px-10 md:px-0;

  &__wrapper {
    @apply flex justify-between container mx-auto h-full items-center;
  }

  &__logo {
    height: 50px;
  }

  &__links {
    @apply flex gap-11 px-1;
  }
}
</style>
