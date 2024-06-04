<template>
  <span class="font-bold mr-1"
    >{{ `${props.label}:` }}
    <span class="text-blue-dark font-normal">{{ props.data }}</span></span
  >
</template>
<script lang="ts" setup>
const props = defineProps({
  label: {
    type: String,
    default: "label",
  },
  data: {
    type: String,
    default: "Data",
  },
});
</script>
