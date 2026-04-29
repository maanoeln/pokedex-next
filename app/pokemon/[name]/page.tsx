"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { EvolutionChain } from "@/components/EvolutionChain";
import { PokemonHero } from "@/components/PokemonHero";
import { PokemonAbilities } from "@/components/PokemonAbilities";
import { PokemonBaseStats } from "@/components/PokemonBaseStats";
import { fetchPokemonDetail, fetchEvolutionChain } from "@/lib/api";
import { PokemonDetail, EvolutionStage } from "@/lib/types";
import { ArrowLeft } from "lucide-react";

export default function PokemonPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = use(params);
  const router = useRouter();
  const [data, setData] = useState<PokemonDetail | null>(null);
  const [chain, setChain] = useState<EvolutionStage | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchPokemonDetail(name)
      .then(async (d) => {
        setData(d);
        setLoading(false);
        try {
          const c = await fetchEvolutionChain(d.species.url);
          setChain(c);
        } catch (_e) {}
      })
      .catch(() => setLoading(false));
  }, [name]);

  if (loading)
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
        <Navbar />
        <LoadingSpinner />
      </div>
    );

  if (!data)
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
        <Navbar />
        <p
          style={{
            textAlign: "center",
            padding: 60,
            color: "var(--text-secondary)",
          }}
        >
          Pokémon not found.
        </p>
      </div>
    );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)" }}>
      <Navbar />
      <main
        style={{ maxWidth: 820, margin: "0 auto", padding: "24px 20px 60px" }}
      >
        <button
          onClick={() => router.push("/")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 16px",
            marginBottom: 24,
            fontSize: 13,
            fontWeight: 500,
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: 10,
            color: "var(--text-secondary)",
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={16} /> Back to Pokédex
        </button>

        <PokemonHero data={data} />
        <PokemonAbilities data={data} />
        <PokemonBaseStats data={data} />

        <div className="glass-card" style={{ padding: 24 }}>
          <h2
            className="font-display"
            style={{
              fontSize: 9,
              color: "var(--text-muted)",
              marginBottom: 20,
            }}
          >
            Evolution Chain
          </h2>
          {chain ? (
            <EvolutionChain
              chain={chain}
              onSelect={(name) => router.push(`/pokemon/${name}`)}
            />
          ) : (
            <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
              Loading evolutions...
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
