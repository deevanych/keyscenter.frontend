<script setup lang="ts">
import {usePopupsStore} from "~/store/popups";
import {ComputedRef} from 'vue';

const popupStore = usePopupsStore()
  const isCartPopupShown: ComputedRef<boolean> = computed(() => popupStore.isCartPopupShown)
</script>

<template>
    <LayoutHeader/>
    <Transition>
        <LazyPopupsCart v-if="isCartPopupShown"/>
    </Transition>
    <div class="page-layout">
        <NuxtPage/>
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
