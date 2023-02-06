<script setup lang="ts">
  import { usePopupsStore } from "~/store/popups";

  const popupStore = usePopupsStore()
  const isCartPopupShown = computed(() => popupStore.isCartPopupShown)
</script>

<template>
  <layout-header />
  <transition>
    <popups-cart v-if="isCartPopupShown"/>
  </transition>
  <div class="page-layout">
    <nuxt-page />
  </div>
</template>

<style lang="scss" scoped>
  .page-layout {
    @apply container mx-auto mt-36;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>