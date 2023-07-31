<!--todo-->
<!--placed header/footer links to API-->

<script lang="ts" setup>
import Menu from "../popups/Menu.vue";
import {PageAPI} from "../../api/page";

interface IProps {
  pages: PageAPI.IPage[]
}

const props = defineProps<IProps>()

const isHeaderHasShadow = ref(false)
const {isMobile} = toRefs(useDevice())

const onScroll = (e: Event) => {
  const designOffsetPx = 50

  isHeaderHasShadow.value = e.isTrusted && window.scrollY > designOffsetPx
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, {passive: true})
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header :class="{
    'header_shadowed': isHeaderHasShadow
  }"
          class="header">
    <div class="header__wrapper">
      <Menu v-if="isMobile" :pages="pages"/>
      <div class="header__action">
        <NuxtLink :to="{ name: 'index' }" title="Главная">
          <img v-if="isMobile" alt="Keyscenter" class="header__logo" src="@/assets/images/ui/short-logo.svg"/>
          <img v-else alt="Keyscenter" class="header__logo" src="@/assets/images/ui/logo.svg"/>
        </NuxtLink>
      </div>
      <UiSearch class="header__search"/>
      <nav v-if="!isMobile" class="header__links">
        <NuxtLink :to="{ name: 'catalog' }">Каталог</NuxtLink>
        <NuxtLink :to="{ name: 'page', params: { page: 'kontakty' } }">Контакты</NuxtLink>
      </nav>
      <IconCart/>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  @apply z-20 fixed w-full bg-white top-0 py-6 flex items-center px-10 md:px-0 transition-shadow;

  &_shadowed {
    @apply shadow-sm;
  }

  &__action {
    @apply flex flex-row gap-6 shrink-0;
  }

  &__search {
    @apply flex;
  }

  &__wrapper {
    @apply flex justify-between container mx-auto h-full items-center gap-6;
  }

  &__logo {
    @apply h-[50px];
  }

  &__links {
    @apply flex gap-11 px-1;
  }
}
</style>
