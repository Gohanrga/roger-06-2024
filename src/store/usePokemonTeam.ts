import { defineStore } from "pinia";
import { Pokemon, PokemonTeam } from "../interfaces/Pokemon";
import ApiService from "../services/ApiService";
const apiService = new ApiService();

type State = {
  storePokemonTeam: Array<PokemonTeam>;
};

const usePokemonTeamStore = defineStore("pokemonTeam", {
  state: (): State => ({
    storePokemonTeam: [],
  }),
  getters: {
    pokemonTeam: (state): Array<PokemonTeam> => state.storePokemonTeam,
  },
  actions: {
    async fetchPokemonTeam(pokemonSelected: Array<Pokemon>): Promise<void> {
      this.storePokemonTeam = await Promise.all(
        pokemonSelected.map(async (pokemon) => {
          const response = await apiService.get(pokemon.url);
          const pokemonData: PokemonTeam = {} as PokemonTeam;
          if (response?.status === 200) {
            const results = response.data;
            pokemonData.id = pokemon.id;
            pokemonData.name = pokemon.name;
            pokemonData.image = pokemon.image;
            pokemonData.stats = results.stats.map(
              (stat: { base_stat: number }) => stat.base_stat
            );
            pokemonData.height = results.height;
            pokemonData.weight = results.weight;
            pokemonData.types = results.types.map(
              (type: { type: { name: string } }) => type.type.name
            );
            pokemonData.cries = results.cries;
          }
          return pokemonData;
        })
      );
    },
  },
});

export default usePokemonTeamStore;
