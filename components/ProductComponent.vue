<script lang="ts" setup>

</script>

<template>
  <div class="flex justify-center">
    <div class="rounded-lg shadow-lg bg-white max-w-sm">
      <a href="#!">
        <img class="preview-image"
             src="http://localhost:1337/uploads/1b6e15a1_c9b6_11e5_830b_000c29aa01a1_8ba1b1b4_30d1_11e7_8ea5_000c29aa01a1_31522dc507.jpg" alt=""/>
      </a>
      <div class="p-6">
        <h5 class="text-gray-900 font-bold mb-2">Windows 10/11 pro лицензия</h5>
        <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .preview-image {
    @apply rounded-t-lg aspect-square;

    object-fit: cover;
    object-position: center;
  }
</style>