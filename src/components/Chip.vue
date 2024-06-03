<template>
  <span
    class="inline-block bg-blue-light rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
    >{{ props.label }}</span
  >
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps({
  label: {
    type: String,
    default: "label",
  },
});
</script>
