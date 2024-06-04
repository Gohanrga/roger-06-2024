<template>
  <div class="w-72 rounded overflow-hidden shadow-lg bg-white">
    <header class="py-4 bg-blue-dark text-white flex justify-center">
      <span class="font-bold text-xl mb-2">{{ props.pokemon.name }}</span>
    </header>
    <main class="py-4">
      <div class="flex justify-center mb-1">
        <img
          :src="props.pokemon.image"
          alt="Avatar"
          class="w-24 h-24 rounded-full"
        />
      </div>
      <div class="flex justify-center gap-2">
        <div v-for="typePokemon in pokemon.types" :key="typePokemon">
          <Chip :label="typePokemon" />
        </div>
      </div>
      <div class="p-4">
        <PokemonStatsChart :stats="pokemon.stats" />
      </div>
      <div class="px-6 flex justify-center">
        <div
          v-for="keySound in criesKeys"
          :key="keySound"
          class="flex flex-col align-center"
        >
          <span class="text-xs flex justify-center">{{ keySound }}</span>
          <Sound :url="props.pokemon.cries[keySound]" />
        </div>
      </div>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { defineProps, computed } from "vue";
import Sound from "./Sound.vue";
import Chip from "./Chip.vue";
import PokemonStatsChart from "./PokemonStatsChart.vue";
import { Cries } from "../interfaces/Pokemon";
import { PokemonTeam } from "../interfaces/Pokemon";
const props = defineProps({
  pokemon: {
    type: Object as () => PokemonTeam,
    default: () => [],
  },
});
const criesKeys = computed(() => ["latest", "legacy"] as Array<keyof Cries>);
</script>
