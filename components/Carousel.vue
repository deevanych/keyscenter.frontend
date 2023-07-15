<script lang="ts" setup>
import {Splide, SplideSlide, SplideTrack} from "@splidejs/vue-splide";
import GlassButton from "./ui/GlassButton.vue";
import {CarouselAPI} from "../api/carousel";
import {URLHelpers} from "../helpers/URL";
import {price} from "../helpers/price";
import ICarouselItem = CarouselAPI.ICarouselItem;

interface IProps {
  carousel: CarouselAPI.ICarousel
}

const props = defineProps<IProps>()

const options = {
  rewind: true,
  autoWidth: true,
  gap: '40px',
  autoplay: true,
  interval: 10000,
  type: 'loop',
  pagination: false
}

const carouselItemLink = (carouselItem: ICarouselItem) => {
  if (carouselItem.product) {
    return {
      name: 'catalog-category-product', params: {
        category: carouselItem.product.product_category.slug,
        product: carouselItem.product.slug
      }
    }
  }

  return {
    name: 'page', params: {
      page: carouselItem.page?.slug,
    }
  }
}

const getters = (carouselItem: ICarouselItem) => {
  return {
    price: carouselItem.product?.price
  }
}

const templateParser = (text: string, carouselItem: ICarouselItem) => {
  const matches = text.replaceAll(/%(.*)%/gi, (match: string, matchValue: string) => {
    return price(getters(carouselItem)[matchValue])
  })

  return matches
}
</script>

<template>
  <Splide :has-track="false" :options="options" class="splide">
    <SplideTrack>
      <SplideSlide v-for="carouselItem in props.carousel.carousel_items"
                   :key="carouselItem.id"
                   class="splide-slide">
        <div :style="{backgroundImage: `url(${URLHelpers.getBackendURLHref(carouselItem.image.url)})`}"
             class="splide-slide__background"></div>
        <NuxtLink :to="carouselItemLink(carouselItem)"
                  class="splide-slide__content">
          <h2 class="splide-slide__title">{{ carouselItem.header }}</h2>
          <span class="splide-slide__subtitle">{{ carouselItem.subheader }}</span>
          <GlassButton class="splide-slide__button">{{
              templateParser(carouselItem.button_text, carouselItem)
            }}
          </GlassButton>
        </NuxtLink>
      </SplideSlide>
    </SplideTrack>
    <div class="splide__arrows">
      <button class="splide__arrow splide__arrow--prev">
        <img class="splide__arrow-icon" src="@/assets/images/ui/arrow-left.svg"/>
      </button>
      <button class="splide__arrow splide__arrow--next">
        <img class="splide__arrow-icon" src="@/assets/images/ui/arrow-left.svg"/>
      </button>
    </div>
  </Splide>
</template>

<style lang="scss" scoped>
.splide {
  @apply visible;

  &:not(.is-active) {
    :deep(.splide__list) {
      @apply flex flex-row gap-10;
    }
  }

  &-slide {
    @apply w-full md:w-4/5 h-96 rounded-3xl overflow-hidden;

    &__button {
      @apply mt-auto;
    }

    &__subtitle {
      @apply drop-shadow-lg;
    }

    &__content {
      @apply w-full h-full p-10 md:p-20 flex flex-col gap-5 overflow-hidden relative text-white items-start no-underline;
    }

    &__background {
      @apply w-full h-full absolute top-0 left-0 bg-center bg-cover;
    }

    &__title {
      @apply text-3xl md:text-4xl font-bold drop-shadow-lg;
    }
  }

  &__arrow {
    @apply h-14 w-14 bg-white shadow-md opacity-100 hover:opacity-100 transition-shadow
    transition-colors bg-white hover:shadow-xl active:bg-white/80;

    &--prev {
      @apply -left-7;
    }

    &--next {
      @apply -right-7;

      & > .splide__arrow-icon {
        @apply rotate-180;
      }
    }
  }
}
</style>