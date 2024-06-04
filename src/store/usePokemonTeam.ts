import { defineStore } from "pinia";
import {
  Pokemon,
  PokemonTeam,
  FlavorTextEntires,
  EvolutionChain,
} from "../interfaces/Pokemon";
import ApiService from "../services/ApiService";
import { URL_IMAGE } from "../constant";

const apiService = new ApiService();

type State = {
  storePokemonTeam: Array<PokemonTeam>;
  storePokemonSelected: PokemonTeam;
};

const usePokemonTeamStore = defineStore("pokemonTeam", {
  state: (): State => ({
    storePokemonTeam: [],
    storePokemonSelected: {} as PokemonTeam,
  }),
  getters: {
    pokemonTeam: (state): Array<PokemonTeam> => state.storePokemonTeam,
    pokemonSelected: (state): PokemonTeam => state.storePokemonSelected,
  },
  actions: {
    /**
     *
     * @param pokemonSelected
     */
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
            //species
            const speciesUrl = results.species.url;
            const speciesData = await this.fetchSpecieData(speciesUrl);
            pokemonData.description = speciesData.description;
            pokemonData.evolutionChain = speciesData.evolutionChain;
            console.log(pokemonData);
          }
          return pokemonData;
        })
      );
    },
    /**
     *
     * @param speciesUrl
     * @returns
     */
    async fetchSpecieData(
      speciesUrl: string
    ): Promise<{ description: string; evolutionChain: Array<EvolutionChain> }> {
      const speciesResponse = await apiService.get(speciesUrl);
      let description = "";
      let evolutionChain: Array<EvolutionChain> = [];
      if (speciesResponse?.status === 200) {
        const { data } = speciesResponse;
        const flavorTextEntries = data.flavor_text_entries;
        const evolutionChainUrl = data.evolution_chain.url;

        //first we get the description in spanish
        const englishFlavorText: FlavorTextEntires = flavorTextEntries.find(
          (entry: FlavorTextEntires) => entry.language.name === "es"
        );
        description = englishFlavorText.flavor_text;
        evolutionChain = await this.getEvolutionChain(evolutionChainUrl);
      }
      return {
        description,
        evolutionChain,
      };
    },
    /**
     * We search the nested object for the pokemon evolution data
     * @param evolutionChainUrl
     * @returns
     */
    async getEvolutionChain(
      evolutionChainUrl: string
    ): Promise<Array<EvolutionChain>> {
      const evolutionChain: Array<EvolutionChain> = [];
      const response = await apiService.get(evolutionChainUrl);
      if (response?.status === 200) {
        const { chain } = response.data;
        let currentChain = chain;
        while (currentChain) {
          //split the url to get the id of each evolution
          const id = Number(
            currentChain.species.url.split("/").filter(Boolean).pop()
          );
          evolutionChain.push({
            name: currentChain.species.name,
            image: URL_IMAGE + `${id}.png`,
          });
          currentChain = currentChain.evolves_to[0];
        }
      }

      return evolutionChain;
    },
    /**
     *
     * @param pokemonId
     */
    findPokemon(pokemonId: number): void {
      this.storePokemonSelected =
        this.storePokemonTeam.find((pokemon) => pokemon.id === pokemonId) ||
        ({} as PokemonTeam);
    },
    /**
     *
     * @param pokemonId
     */
    removePokemon(pokemonId: number): void {
      this.storePokemonTeam = this.storePokemonTeam.filter(
        (pokemon) => pokemon.id !== pokemonId
      );
    },
  },
});

export default usePokemonTeamStore;
