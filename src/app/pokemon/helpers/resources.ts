import { httpResource } from '@angular/common/http';
import { Ability, NamedAPIResource, Pokemon, PokemonTypeDetail, ResultsList } from '../types';

export async function fetchResource<T>(url: string, abortSignal?: AbortSignal | null): Promise<T>;
export async function fetchResource<T>(
  url: string | null,
  abortSignal?: AbortSignal | null,
): Promise<T | null>;

export async function fetchResource<T>(
  url: string | null,
  abortSignal: AbortSignal | null = null,
): Promise<T | null> {
  if (url == null) {
    return null;
  }

  const res = await fetch(url, { signal: abortSignal, cache: 'force-cache' });
  return await res.json();
}

const entryPointURL = 'https://pokeapi.co/api/v2';

export interface ResultsListParams {
  readonly search?: string;
  readonly offset?: string;
  readonly limit?: string;
}

export function pokemonListResource(params: () => ResultsListParams) {
  return httpResource<ResultsList<NamedAPIResource>>(() => ({
    url: `${entryPointURL}/pokemon`,
    params: { limit: '20', ...params() },
  }));
}
// Loads all Pokémon names at once (for client-side search)
export function pokemonAllResource(enabled: () => boolean) {
  return httpResource<ResultsList<NamedAPIResource>>(() =>
    enabled()
      ? { url: `${entryPointURL}/pokemon`, params: { limit: '100000', offset: '0' } }
      : undefined,
  );
}

export function pokemonResource(name: () => string) {
  return httpResource<Pokemon>(() => `${entryPointURL}/pokemon/${name()}`);
}

export function typeListResource(params: () => ResultsListParams) {
  return httpResource<ResultsList<NamedAPIResource>>(() => ({
    url: `${entryPointURL}/type`,
    params: { limit: '20', ...params() },
  }));
}

export function typeResource(name: () => string) {
  return httpResource<PokemonTypeDetail>(() => `${entryPointURL}/type/${name()}`);
}

export function abilityListResource(params: () => ResultsListParams) {
  return httpResource<ResultsList<NamedAPIResource>>(() => ({
    url: `${entryPointURL}/ability`,
    params: { limit: '20', ...params() },
  }));
}

export function abilityResource(name: () => string) {
  return httpResource<Ability>(() => `${entryPointURL}/ability/${name()}`);
}
