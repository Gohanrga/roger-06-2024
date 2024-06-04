<template>
  <div>
    <span class="text-xs flex justify-center">{{ label }}</span>
    <button
      @click="playSound"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6 text-blue-dark"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
        />
      </svg>
    </button>
    <audio ref="audio" :src="props.url"></audio>
  </div>
</template>
<script lang="ts" setup>
import { ref, defineProps } from "vue";
const props = defineProps({
  url: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
});
const audio = ref<HTMLAudioElement | null>(null);
const playSound = () => {
  if (audio.value) {
    audio.value.play();
  }
};
</script>
