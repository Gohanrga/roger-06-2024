<template>
  <button
    class="ml-2 mt-2 py-4 px-8 bg-blue-dark text-white"
    @click="props.goBack"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="size-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
      />
    </svg>

    Volver
  </button>
</template>
<script lang="ts" setup>
const props = defineProps({
  goBack: {
    type: Function,
    required: true,
  },
});
</script>
