<script setup lang="ts">
import {usePopupsStore} from "~/store/popups";
import {ComputedRef} from 'vue';
import {useCartStore} from "~/store/cart";

const cartStore = useCartStore()
const popupStore = usePopupsStore()
const isCartPopupShown: ComputedRef<boolean> = computed(() => popupStore.isCartPopupShown)

onMounted(async () => {
    await cartStore.updateCart()
})
</script>

<template>
    <LayoutHeader/>
    <Transition>
        <PopupsCart v-if="isCartPopupShown"/>
    </Transition>
    <div class="page-layout">
        <NuxtPage/>
    </div>
    <LayoutFooter />
</template>

<style lang="scss" scoped>
  .page-layout {
    @apply container mx-auto mt-36 min-h-fit;
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
