<template>
  <div class="flex flex-col items-center" v-if="props.pokemonSelected.length">
    <div>
      <span>Pokemons Seleccionados: {{ props.pokemonSelected.length }}</span>
    </div>
    <div class="flex justify-center gap-2">
      <div v-for="pokemon in props.pokemonSelected" :key="pokemon.id">
        <Chip :label="pokemon.name" />
      </div>
    </div>
  </div>
  <div v-else class="flex justify-center">
    <span>Selecciona 6 pokemons para armar tu equipo</span>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import { Pokemon } from "../interfaces/Pokemon.ts";
import Chip from "./Chip.vue";
const props = defineProps({
  pokemonSelected: {
    type: Array<Pokemon>,
    required: true,
  },
});
</script>
