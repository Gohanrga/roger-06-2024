<template>
  <div
    class="flex justify-center mt-5 mb-16 flex-wrap gap-4"
    v-if="pokemonTeam.length"
  >
    <div class="" v-for="pokemon in pokemonTeam" :key="pokemon.id">
      <PokemonTeamCard
        :pokemon="pokemon"
        :deletePokemon="deletePokemon"
        :goToPokemonDetail="goToPokemonDetail"
      />
    </div>
  </div>
  <div v-else class="flex justify-center mt-5 mb-16">
    <span class="h-16 text-2xl">Seleccione Pokemons para armar tu equipo</span>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, computed } from "vue";
import PokemonTeamCard from "../components/PokemonTeamCard.vue";
import usePokemonTeamStore from "../store/usePokemonTeam";
import usePokemonsStore from "../store/usePokemons.ts";
import { useRouter } from "vue-router";

//variables
const router = useRouter();
const pokemonTeamStore = usePokemonTeamStore();
const pokemonStore = usePokemonsStore();

//hooks
onMounted(async () => {
  await pokemonTeamStore.fetchPokemonTeam(pokemonStore.pokemonSelected);
});

const pokemonTeam = computed(() => {
  return pokemonTeamStore.pokemonTeam;
});

//methods

const deletePokemon = (pokemonId: number) => {
  pokemonTeamStore.removePokemon(pokemonId);
  pokemonStore.removeToTeam(pokemonId);
};

const goToPokemonDetail = (pokemonId: number) => {
  router.push({ name: "detail", params: { id: pokemonId } });
};
</script>
