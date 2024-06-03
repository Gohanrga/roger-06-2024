export interface Pokemon {
  id: number;
  name: string;
  image: string;
  selected: boolean;
}

export interface PokemonComplete extends Pokemon {
  stats: Array<number>;
  cries: Object;
  height: number;
  weight: number;
  description?: string;
  //evolutionChain
}
