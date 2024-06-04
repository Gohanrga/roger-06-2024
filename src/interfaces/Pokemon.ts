export interface Pokemon {
  id: number;
  name: string;
  image: string;
  url: string;
  selected: boolean;
}

export interface Cries {
  latest: string;
  legacy: string;
}
export interface PokemonTeam {
  id: number;
  name: string;
  image: string;
  stats: Array<number>;
  types: Array<string>;
  cries: Cries;
  height: number;
  weight: number;
  description?: string;
  //evolutionChain
}
