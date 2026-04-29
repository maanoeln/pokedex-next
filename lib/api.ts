import { PokemonDetail, EvolutionStage } from "./types";

const BASE = "https://pokeapi.co/api/v2";

export async function fetchPokemonDetail(
  nameOrId: string | number,
): Promise<PokemonDetail> {
  const res = await fetch(`${BASE}/pokemon/${nameOrId}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Pokemon not found");
  return res.json();
}

export async function fetchEvolutionChain(
  speciesUrl: string,
): Promise<EvolutionStage> {
  const speciesData = await fetch(speciesUrl, {
    next: { revalidate: 3600 },
  }).then((r) => r.json());
  const chainData = await fetch(speciesData.evolution_chain.url, {
    next: { revalidate: 3600 },
  }).then((r) => r.json());

  async function parse(link: Record<string, unknown>): Promise<EvolutionStage> {
    const species = link.species as { name: string; url: string };
    const id = parseInt(species.url.split("/").filter(Boolean).pop()!);
    let types: string[] = [];
    try {
      const d = await fetchPokemonDetail(id);
      types = d.types.map((t) => t.type.name);
    } catch {}
    const ev = ((link.evolution_details as unknown[]) || [])[0] as
      | Record<string, unknown>
      | undefined;
    const evolvesTo = link.evolves_to as Array<Record<string, unknown>>;
    return {
      pokemon: {
        id,
        name: species.name,
        sprite: "",
        types,
        minLevel: ev?.min_level as number | undefined,
        trigger: (ev?.trigger as { name: string } | undefined)?.name,
        item: (ev?.item as { name: string } | undefined)?.name,
      },
      minLevel: ev?.min_level as number | undefined,
      item: (ev?.item as { name: string } | undefined)?.name,
      evolvesTo: await Promise.all((evolvesTo || []).map((c) => parse(c))),
    };
  }

  return parse(chainData.chain as Record<string, unknown>);
}
