import { Pokemon } from "../interfaces/Pokemon";

/**
 * This function checks if a Pokémon exists in pokemonTeam
 * @param pokemon
 */
export const verifyExistence = (
  pokemonId: number,
  pokemonTeam: Array<Pokemon>
): boolean => {
  const pokemonAux: Pokemon | undefined = pokemonTeam.find(
    (pokemon) => pokemon.id === pokemonId
  );

  return pokemonAux !== undefined;
};
