export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: { slot: number; type: { name: string; url: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { ability: { name: string }; is_hidden: boolean; slot: number }[];
  sprites: {
    front_default: string;
    other: {
      "official-artwork": { front_default: string; front_shiny: string };
      home: { front_default: string };
    };
  };
  species: { url: string };
}

export interface EvolutionDetail {
  id: number;
  name: string;
  sprite: string;
  types: string[];
  minLevel?: number;
  trigger?: string;
  item?: string;
}

export interface EvolutionStage {
  pokemon: EvolutionDetail;
  evolvesTo: EvolutionStage[];
  minLevel?: number;
  item?: string;
}
