import { defineStore } from "pinia";
import { Pokemon } from "../interfaces/Pokemon";
import ApiService from "../services/ApiService";
import { verifyExistence } from "../tools/ArrayTool";

const apiService = new ApiService();

type State = {
  storePokemons: Array<Pokemon>;
  storeTeamPokemon: Array<Pokemon>;
  nextOffset: number;
  limit: number;
};

const usePokemonsStore = defineStore("pokemons", {
  state: (): State => ({
    storePokemons: [],
    storeTeamPokemon: [],
    nextOffset: 0,
    limit: 25,
  }),
  getters: {
    paginatedPokemons: (state): Array<Pokemon> =>
      state.storePokemons.slice(
        state.nextOffset,
        state.nextOffset + state.limit
      ),
    pokemonSelected: (state): Array<Pokemon> => state.storeTeamPokemon,
    limitArray: (state): number => state.limit,
    nextOffsetArray: (state): number => state.nextOffset,
    totalPokemons: (state): number => state.storePokemons.length,
  },
  actions: {
    async fetchPokemons(): Promise<void> {
      const limit = 151;
      const URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;
      const URL_IMAGE = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/`;
      const response = await apiService.get(URL);
      if (response?.status === 200) {
        const { results } = response.data;
        this.storePokemons = results.map(
          (pokemon: { url: string; name: any }) => {
            const id = Number(pokemon.url.split("/").filter(Boolean).pop());
            return {
              id,
              name: pokemon.name,
              image: URL_IMAGE + `${id}.png`,
              selected: false,
            };
          }
        );
      } else {
        this.storePokemons = [];
        console.error("No se pudieron obtener los pokemons");
      }
    },
    //navigation
    nextPage() {
      if (this.nextOffset + this.limit < this.storePokemons.length) {
        this.nextOffset += this.limit;
      }
    },
    previousPage() {
      if (this.nextOffset > 0) {
        this.nextOffset -= this.limit;
      }
    },
    //end navigation
    addToTeam(pokemon: Pokemon): void {
      //if not exist we should add
      if (this.storeTeamPokemon.length < 6) {
        this.storeTeamPokemon.push(pokemon);
        this.markPokemon(pokemon.id);
      }
    },
    /**
     * remove Pokémon from the array, if the Pokémon exists in the array we must delete it and return true; otherwise just return false
     * @param pokemonId
     * @returns boolean
     */
    removeToTeam(pokemonId: number): void {
      if (verifyExistence(pokemonId, this.storeTeamPokemon)) {
        this.storeTeamPokemon = this.storeTeamPokemon.filter(
          (p) => p.id !== pokemonId
        );
        this.markPokemon(pokemonId);
      }
    },
    /**
     *
     * @param pokemonId
     */
    markPokemon(pokemonId: number) {
      //mark the selected pokemon
      const pokemonSelected = this.storePokemons.find(
        (p) => p.id === pokemonId
      );

      if (pokemonSelected) {
        pokemonSelected.selected = !pokemonSelected.selected;
      }
    },
  },
});

export default usePokemonsStore;
