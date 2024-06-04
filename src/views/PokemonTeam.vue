<template>
  <div class="flex justify-center mt-5 mb-16 flex-wrap gap-4">
    <div class="" v-for="pokemon in pokemonTeam" :key="pokemon.id">
      <PokemonTeamCard :pokemon="pokemon" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, computed } from "vue";
import PokemonTeamCard from "../components/PokemonTeamCard.vue";
import usePokemonTeamStore from "../store/usePokemonTeam";
import usePokemonsStore from "../store/usePokemons.ts";

//variables
const pokemonTeamStore = usePokemonTeamStore();
const pokemonStore = usePokemonsStore();

//hooks
onMounted(async () => {
  await pokemonTeamStore.fetchPokemonTeam(pokemonStore.pokemonSelected);
});

const pokemonTeam = computed(() => {
  return pokemonTeamStore.pokemonTeam;
});
</script>
