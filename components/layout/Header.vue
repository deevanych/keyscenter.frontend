<script lang="ts" setup>
</script>

<template>
  <header class="header">
    <div class="header__wrapper">
        <NuxtLink :to="{ name: 'index' }" title="Главная">
					<img src="/logo.svg" class="header__logo" alt="Keyscenter"/>
				</NuxtLink>
        <IconCart/>
    </div>
  </header>
</template>

<style lang="scss" scoped>
  .header {
    @apply shadow z-10 fixed w-full bg-white top-0 h-24 flex items-center;

    &__wrapper {
      @apply flex justify-between container mx-auto h-full items-center;
    }
		
		&__logo {
			height: 50px;
		}
  }
</style>
