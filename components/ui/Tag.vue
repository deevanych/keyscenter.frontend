<template>
  <div
      class="tag"
  >
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.tag {
  @apply text-xs inline-flex items-center font-bold px-3 py-1 text-white bg-gradient-to-r
  from-purple-400 to-purple-500 rounded-full;
}
</style>
