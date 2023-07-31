<script lang="ts" setup>
import {usePopupsStore} from "../store/popups";
import {ComputedRef} from 'vue';
import {useCartStore} from "../store/cart";
import {PageAPI} from "../api/page";
import HeaderComponent from "../components/layout/HeaderComponent.vue";
import FooterComponent from "../components/layout/FooterComponent.vue";

const cartStore = useCartStore()
const popupStore = usePopupsStore()
const isCartPopupShown: ComputedRef<boolean> = computed(() => popupStore.isCartPopupShown)

const pages = ref<PageAPI.IPage[]>([])
const {data} = await useAsyncData('pages', async () => await PageAPI.list())

if (data.value?.data) {
  pages.value = data.value.data
}

onMounted(async () => {
  await cartStore.updateCart()
})
</script>

<template>
  <HeaderComponent :pages="pages"/>
  <PopupsToasts/>
  <Transition>
    <PopupsCart v-if="isCartPopupShown"/>
  </Transition>
  <div class="page-layout">
    <NuxtPage/>
  </div>
  <FooterComponent :pages="pages"/>
</template>

<style lang="scss" scoped>
.page-layout {
  @apply container mx-auto mt-36 min-h-fit px-10 md:px-0;
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
