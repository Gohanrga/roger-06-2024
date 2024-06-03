<template>
  <div class="my-4">
    <PokemonSelected :pokemonSelected="pokemonSelected" />
  </div>
  <div class="flex justify-center">
    <div class="grid grid-cols-5 gap-4 mt-5 mb-10">
      <div v-for="pokemon in pokemons" :key="pokemon.id">
        <PokemonCard :pokemon="pokemon" :selectPokemon="selectPokemon" />
      </div>
    </div>
  </div>
  <div class="pb-10">
    <Pagination
      :nextPage="nextPage"
      :previousPage="previousPage"
      :limit="limit"
      :nextOffset="nextOffset"
      :totalPokemons="totalPokemons"
    />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, computed } from "vue";
import PokemonCard from "../components/PokemonCard.vue";
import PokemonSelected from "../components/PokemonSelected.vue";
import Pagination from "../components/Pagination.vue";
import usePokemonsStore from "../store/usePokemons.ts";
import { Pokemon } from "../interfaces/Pokemon.ts";

//variables
const pokemonStore = usePokemonsStore();
const limit = pokemonStore.limitArray;

//hooks
onMounted(async () => {
  await pokemonStore.fetchPokemons();
});

const pokemons = computed(() => {
  return pokemonStore.paginatedPokemons;
});

const pokemonSelected = computed(() => {
  return pokemonStore.pokemonSelected;
});

const nextOffset = computed(() => {
  return pokemonStore.nextOffsetArray;
});

const totalPokemons = computed(() => {
  return pokemonStore.totalPokemons;
});
//methods
const selectPokemon = (pokemon: Pokemon) => {
  if (pokemon.selected) {
    pokemonStore.removeToTeam(pokemon.id);
  } else {
    pokemonStore.addToTeam(pokemon);
  }
};
const nextPage = () => {
  pokemonStore.nextPage();
};

const previousPage = () => {
  pokemonStore.previousPage();
};
</script>
