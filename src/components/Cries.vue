<template>
  <div
    v-for="keySound in criesKeys"
    :key="keySound"
    class="flex flex-col align-center"
  >
    <Sound :url="props.cries[keySound]" :label="keySound" />
  </div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import Sound from "./Sound.vue";
import { Cries } from "../interfaces/Pokemon";
const props = defineProps({
  cries: {
    type: Object as () => Cries,
    required: true,
  },
});
const criesKeys = computed(() => ["latest", "legacy"] as Array<keyof Cries>);
</script>
