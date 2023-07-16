<script async lang="ts" setup>
import {CtaAPI} from "../api/cta";
import {URLHelpers} from "../helpers/URL";
import GlassButton from "./ui/GlassButton.vue";
import ICTA = CtaAPI.ICTA;

interface IProps {
  cta: ICTA
}

const props = defineProps<IProps>()

const CTALink = () => {
  if (props.cta.product) {
    return {
      name: 'catalog-category-product', params: {
        category: props.cta.product.product_category.slug,
        product: props.cta.product.slug
      }
    }
  }

  if (props.cta.page) {
    return {
      name: 'page', params: {
        page: props.cta.page.slug,
      }
    }
  }

  return {name: 'index'}
}

const actions = () => {
  let actions = ''

  if (props.cta.action) {
    actions += `document.querySelector('.cta__link[data-id="${props.cta.id}"]').addEventListener('click',
    () => { ${props.cta.action}; });`
  }

  return actions
}

useHead({
  script: [
    {
      innerHTML: actions() ? `window.addEventListener('load', () => {${actions()}})` : null
    }
  ]
})
</script>

<template>
  <div class="cta">
    <div class="cta__content">
      <div class="cta__header">{{ props.cta.header }}</div>
      <div class="cta__subheader">{{ props.cta.subheader }}</div>
      <NuxtLink :data-id="props.cta.id"
                :to="CTALink()"
                class="cta__link">
        <GlassButton>{{ props.cta.button_text }}</GlassButton>
      </NuxtLink>
    </div>
    <template v-if="props.cta.lottie.length">
      <client-only>
        <lottie-player
            :src="URLHelpers.getBackendURLHref(props.cta.lottie[0].url)"
            autoplay
            class="cta__lottie"
            loop
            renderer="canvas"
            speed="0.3"
        />
      </client-only>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.cta {
  @apply flex flex-col-reverse md:flex-row items-center justify-between gap-20;

  &__header {
    @apply text-3xl md:text-4xl font-bold drop-shadow-lg;
  }

  &__content {
    @apply flex flex-col items-start gap-5;
  }

  &__link {
    @apply no-underline mt-5;
  }

  &__lottie {
    @apply h-[300px] w-[400px];
  }
}
</style>