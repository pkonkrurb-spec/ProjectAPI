export function asReadonly<T>(data: T[]): readonly T[] {
  return data;
}

export function extractId(url: string): string | null {
  return (
    new URL(url).pathname
      .split('/')
      .reverse()
      .find((path) => path !== '') ?? null
  );
}

export function purnEmptyProperties<T extends Record<string, unknown>>(
  data: T,
): Partial<{
  [K in keyof T]: NonNullable<T[K]>;
}> {
  return Object.fromEntries(Object.entries(data).filter(([, value]) => !!value)) as Partial<{
    [K in keyof T]: NonNullable<T[K]>;
  }>;
}

export function formatPokemonName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
}

export function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };
  return colors[type] ?? '#68A090';
}
