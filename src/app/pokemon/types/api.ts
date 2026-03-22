export interface NamedAPIResource {
  readonly name: string;
  readonly url: string;
}

export interface ResultsList<T> {
  readonly count: number;
  readonly previous: string | null;
  readonly next: string | null;
  readonly results: readonly T[];
}

export interface Pokemon {
  readonly id: number;
  readonly name: string;
  readonly base_experience: number;
  readonly height: number;
  readonly weight: number;
  readonly is_default: boolean;
  readonly order: number;
  readonly sprites: PokemonSprites;
  readonly abilities: readonly PokemonAbility[];
  readonly types: readonly PokemonType[];
  readonly stats: readonly PokemonStat[];
  readonly moves: readonly PokemonMove[];
  readonly species: NamedAPIResource;
}

export interface PokemonSprites {
  readonly front_default: string | null;
  readonly front_shiny: string | null;
  readonly back_default: string | null;
  readonly back_shiny: string | null;
  readonly other: {
    readonly 'official-artwork': {
      readonly front_default: string | null;
      readonly front_shiny: string | null;
    };
  };
}

export interface PokemonAbility {
  readonly ability: NamedAPIResource;
  readonly is_hidden: boolean;
  readonly slot: number;
}

export interface PokemonType {
  readonly slot: number;
  readonly type: NamedAPIResource;
}

export interface PokemonStat {
  readonly base_stat: number;
  readonly effort: number;
  readonly stat: NamedAPIResource;
}

export interface PokemonMove {
  readonly move: NamedAPIResource;
}

export interface PokemonTypeDetail {
  readonly id: number;
  readonly name: string;
  readonly damage_relations: TypeDamageRelations;
  readonly pokemon: readonly { readonly pokemon: NamedAPIResource; readonly slot: number }[];
  readonly moves: readonly NamedAPIResource[];
}

export interface TypeDamageRelations {
  readonly double_damage_from: readonly NamedAPIResource[];
  readonly double_damage_to: readonly NamedAPIResource[];
  readonly half_damage_from: readonly NamedAPIResource[];
  readonly half_damage_to: readonly NamedAPIResource[];
  readonly no_damage_from: readonly NamedAPIResource[];
  readonly no_damage_to: readonly NamedAPIResource[];
}

export interface Ability {
  readonly id: number;
  readonly name: string;
  readonly is_main_series: boolean;
  readonly effect_entries: readonly VerboseEffect[];
  readonly flavor_text_entries: readonly AbilityFlavorText[];
  readonly pokemon: readonly { readonly pokemon: NamedAPIResource; readonly is_hidden: boolean }[];
}

export interface VerboseEffect {
  readonly effect: string;
  readonly short_effect: string;
  readonly language: NamedAPIResource;
}

export interface AbilityFlavorText {
  readonly flavor_text: string;
  readonly language: NamedAPIResource;
  readonly version_group: NamedAPIResource;
}
