<template>
  <div class="h-100vh m-0 p-0 font-arial">
    <CircularProgress />
    <router-view />
  </div>
</template>
<script lang="ts" setup>
import CircularProgress from "./components/CircularProgress.vue";
</script>
