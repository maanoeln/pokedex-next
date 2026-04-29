export function formatPokemonName(name: string): string {
  return name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
export function getPokemonId(id: number): string {
  return "#" + String(id).padStart(4, "0");
}
