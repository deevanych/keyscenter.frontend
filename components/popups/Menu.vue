<script lang="ts" setup>
import {PageAPI} from "../../api/page";

interface IProps {
  pages: PageAPI.IPage[]
}

const props = defineProps<IProps>()
const isShow = ref(false)
const keyDownListener = (event: KeyboardEvent) => {
  if (event.isTrusted && event.code === 'Escape') {
    closeModal()
  }
}
const toggleModal = (_isShow = !isShow.value) => {
  isShow.value = _isShow
}
const closeModal = () => {
  toggleModal(false)
}

watch(isShow, (val) => {
  if (val) {
    window.addEventListener('keydown', keyDownListener, {passive: true})
  } else {
    window.removeEventListener('keydown', keyDownListener)
  }
})
</script>

<template>
  <div class="menu-modal" @click="toggleModal()">
    <transition mode="out-in" name="fade-top">
      <img v-if="!isShow" src="@/assets/images/ui/hamburger.svg"/>
      <img v-else src="@/assets/images/ui/close.svg"/>
    </transition>
  </div>
  <transition name="fade-top">
    <div v-if="isShow" class="menu-modal__wrapper">
      <nav class="menu-modal__links">
        <NuxtLink v-for="page in props.pages"
                  :to="{ name: 'page', params: { page: page.attributes.slug } }">
          {{ page.attributes.title }}
        </NuxtLink>
      </nav>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.menu-modal {
  @apply w-8 z-50 relative;

  &__body {
    @apply py-6 px-10;
  }

  &__links {
    @apply flex flex-col m-auto items-center gap-4;
  }

  &__wrapper {
    @apply fixed top-0 left-0 w-full h-full bg-white z-30 py-6 flex flex-col items-center px-10;
  }
}
</style>