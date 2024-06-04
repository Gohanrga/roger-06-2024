<template>
  <div class="container mx-auto flex justify-center">
    <img :src="props.image" :alt="props.name" loading="lazy" />
  </div>
  <div class="px-4 pt-1 pb-4 flex justify-center">
    <Chip :label="props.name" />
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import Chip from "./Chip.vue";

const props = defineProps({
  image: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
});
</script>
