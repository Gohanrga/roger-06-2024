<template>
  <div
    class="w-32 rounded-sm overflow shadow-lg cursor-pointer transform hover:scale-110 hover:bg-slate-light"
    :class="{ 'bg-slate-light': props.pokemon.selected }"
    @click="props.selectPokemon(props.pokemon)"
  >
    <PokemonData :image="props.pokemon.image" :name="props.pokemon.name" />
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import { Pokemon } from "../interfaces/Pokemon";
import PokemonData from "./PokemonData.vue";
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
