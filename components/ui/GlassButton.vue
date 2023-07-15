<script lang="ts" setup>

</script>

<template>
  <span class="glass-button">
    <span class="glass-button__bg"></span>
    <button class="glass-button__content">
      <slot/>
    </button>
  </span>
</template>

<style lang="scss" scoped>
.glass-button {
  @apply relative w-full md:w-auto;

  &__content {
    @apply rounded-full p-4 px-7 text-white backdrop-blur mt-auto -z-10 bg-white/40
    shadow hover:shadow-md border-white/60 border transition-shadow w-full md:w-auto;
  }

  &__bg {
    @apply rounded-full w-full h-full block absolute transition-transform origin-bottom-right rotate-3
    transition-transform bg-gradient-to-r from-cyan-500 to-blue-500;
  }

  &:hover {
    .glass-button__bg {
      @apply rotate-6 translate-y-1;
    }
  }
}
</style>