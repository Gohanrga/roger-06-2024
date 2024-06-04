<template>
  <div
    class="w-72 rounded overflow-hidden shadow-lg bg-white cursor-pointer hover:bg-slate-light"
    @click="goToPokemonDetail(props.pokemon.id)"
  >
    <header class="py-4 bg-blue-dark text-white flex justify-center">
      <span class="font-bold text-xl mb-2">{{ props.pokemon.name }}</span>
    </header>
    <main class="py-4">
      <!--Image section-->
      <div class="flex justify-center mb-1">
        <img
          :src="props.pokemon.image"
          alt="Avatar"
          class="w-24 h-24 rounded-full"
        />
      </div>
      <!--Type section-->
      <div class="flex justify-center gap-2">
        <div v-for="typePokemon in pokemon.types" :key="typePokemon">
          <Chip :label="typePokemon" />
        </div>
      </div>
      <!--chart section-->
      <div class="p-4">
        <PokemonStatsChart :stats="pokemon.stats" />
      </div>
      <!--Cries section-->

      <div class="px-6 flex justify-center">
        <Cries :cries="props.pokemon.cries" />
      </div>
      <div class="px-6">
        <button
          class="w-full border border-red-light rounded-lg text-red-light hover:bg-red-light hover:text-white"
          @click="deletePokemon(props.pokemon.id)"
        >
          Eliminar
        </button>
      </div>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import Chip from "./Chip.vue";
import PokemonStatsChart from "./PokemonStatsChart.vue";
import Cries from "./Cries.vue";
import { PokemonTeam } from "../interfaces/Pokemon";
const props = defineProps({
  pokemon: {
    type: Object as () => PokemonTeam,
    default: () => {},
  },
  deletePokemon: {
    type: Function,
    required: true,
  },
  goToPokemonDetail: {
    type: Function,
    default: () => {},
  },
});
</script>
