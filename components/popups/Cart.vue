<script lang="ts" setup>
  import {usePopupsStore} from "~/store/popups";
  const { toggleCartPopup } = usePopupsStore()

  const keypressHandler = (e: KeyboardEvent) => {
    if (e.isTrusted && e.key === 'Escape') {
      closePopup()
    }
  }

  const closePopup = (): void => {
    toggleCartPopup(false)
  }

  onMounted(() => {
    window.addEventListener('keydown', keypressHandler)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', keypressHandler)
  })
</script>

<template>
  <div class="cart-popup">
    <div @click="closePopup"
         class="cart-popup__background"></div>
    <div class="cart-popup__wrapper">
      <div class="cart-popup__content">
        sad
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .cart-popup {
    @apply fixed w-full h-full top-0 left-0 z-10;

    &__background {
      @apply fixed w-full h-full bg-black opacity-60 top-0 left-0 cursor-pointer hover:opacity-80 transition-opacity;
    }

    &__wrapper {
      @apply bg-white z-10 absolute;
    }
  }
</style>