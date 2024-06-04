<template>
  <div
    class="fixed w-full h-full bg-opacity-50 flex items-center justify-center z-100"
    v-if="loaderStore.loadingGlobal"
  >
    <div class="flex items-center justify-center">
      <div
        class="border-t-4 border-blue-dark border-solid rounded-full h-12 w-12 animate-spin"
      ></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import useLoaderStore from "../store/useLoader";
const loaderStore = useLoaderStore();
</script>
