<template>
  <div class="flex justify-center gap-2">
    <button
      class="bg-blue-dark text-white px-4 py-2 rounded-md"
      :class="{ 'opacity-50': props.nextOffset === 0 }"
      @click="props.previousPage"
      :disabled="props.nextOffset === 0"
    >
      Previous
    </button>
    <button
      class="bg-blue-dark text-white px-4 py-2 rounded-md"
      :class="{ 'opacity-50': isDisabledNextButton }"
      @click="props.nextPage"
      :disabled="isDisabledNextButton"
    >
      Next
    </button>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, computed } from "vue";
const props = defineProps({
  previousPage: {
    type: Function,
    required: true,
  },
  nextPage: {
    type: Function,
    required: true,
  },
  nextOffset: {
    type: Number,
    default: 0,
  },
  limit: {
    type: Number,
    default: 0,
  },
  totalPokemons: {
    type: Number,
    default: 0,
  },
});
const isDisabledNextButton = computed(() => {
  return props.nextOffset + props.limit >= props.totalPokemons;
});
</script>
