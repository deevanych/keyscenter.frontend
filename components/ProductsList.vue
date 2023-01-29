<template>
  <div class="grid grid-cols-4 gap-10">
    <product-component v-for="i in 12" :key="i"/>
  </div>
</template>