<template>
  <div
    class="max-w-sm rounded-sm overflow shadow-lg cursor-pointer transform hover:scale-110 hover:bg-slate-light"
    :class="{ 'bg-slate-light': props.pokemon.selected }"
    @click="props.selectPokemon(props.pokemon)"
  >
    <div class="container mx-auto flex justify-center">
      <img :src="props.pokemon.image" :alt="props.pokemon.name" />
    </div>
    <div class="px-4 pt-1 pb-4 flex justify-center">
      <Chip :label="props.pokemon.name" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import { Pokemon } from "../interfaces/Pokemon";
import Chip from "./Chip.vue";
const props = defineProps({
  pokemon: {
    type: Object as () => Pokemon,
    required: true,
  },
  selectPokemon: {
    type: Function,
    required: true,
  },
});
</script>
