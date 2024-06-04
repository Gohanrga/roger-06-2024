<template>
  <ButtonBack :goBack="goBack" />
  <div
    class="flex flex-col align-center justify-center"
    v-if="Object.keys(pokemonSelected).length"
  >
    <header class="my-4 flex justify-center">
      <span class="text-4xl">{{ pokemonSelected.name }}</span>
    </header>
    <main>
      <!--img-->
      <div class="flex justify-center mb-1">
        <img
          :src="pokemonSelected.image"
          alt="Avatar"
          class="w-24 h-24 rounded-full"
        />
      </div>
      <!--type-->
      <div class="flex justify-center gap-2">
        <div v-for="typePokemon in pokemonSelected.types" :key="typePokemon">
          <Chip :label="typePokemon" />
        </div>
      </div>
      <!--chart-->
      <div class="p-4">
        <PokemonStatsChart :stats="pokemonSelected.stats" />
      </div>
      <!--cries-->
      <div class="px-6 flex justify-center">
        <Cries :cries="pokemonSelected.cries" />
      </div>
      <!--items-->
      <div
        class="flex flex-col md:flex-row justify-center items-center gap-7 mt-2 bg-blue-light p-4"
      >
        <PokemonItem label="Altura" :data="String(pokemonSelected.height)" />
        <PokemonItem label="Peso" :data="String(pokemonSelected.weight)" />
        <PokemonItem
          label="Descripción"
          :data="String(pokemonSelected.description)"
        />
      </div>
      <!--chain evolution-->
      <div class="mt-2">
        <div class="bg-blue-dark text-white text-center">
          <span>Cadena de Evolución</span>
        </div>
        <div class="flex justify-center">
          <div
            v-for="chain in pokemonSelected.evolutionChain"
            :key="chain.name"
          >
            <PokemonData :image="chain.image" :name="chain.name" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, computed } from "vue";
import Chip from "../components/Chip.vue";
import PokemonStatsChart from "../components/PokemonStatsChart.vue";
import PokemonData from "../components/PokemonData.vue";
import ButtonBack from "../components/ButtonBack.vue";
import PokemonItem from "../components/PokemonItem.vue";
import Cries from "../components/Cries.vue";
import { useRoute, useRouter } from "vue-router";
import usePokemonTeamStore from "../store/usePokemonTeam";

//variables
const route = useRoute();
const router = useRouter();
const pokemonTeamStore = usePokemonTeamStore();
const pokemonId = Number(route.params.id);

//hooks
onMounted(() => {
  pokemonTeamStore.findPokemon(pokemonId);
});

const pokemonSelected = computed(() => {
  return pokemonTeamStore.pokemonSelected;
});

//methods

const goBack = () => {
  router.replace({ name: "team" });
};
</script>
