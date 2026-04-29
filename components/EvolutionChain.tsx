"use client";

import Image from "next/image";
import { TypeBadge } from "./TypeBadge";
import { formatPokemonName } from "@/lib/utils";
import type { EvolutionStage } from "@/lib/types";

interface Props {
  chain: EvolutionStage;
  onSelect: (name: string) => void;
}

function flattenChain(
  node: EvolutionStage,
  level = 0,
  rows: EvolutionStage[][] = [],
): EvolutionStage[][] {
  if (!rows[level]) rows[level] = [];
  rows[level].push(node);
  node.evolvesTo?.forEach((child) => flattenChain(child, level + 1, rows));
  return rows;
}

export function EvolutionChain({ chain, onSelect }: Props) {
  const levels = flattenChain(chain);

  if (levels.length <= 1 && levels[0]?.length <= 1) {
    return (
      <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
        This Pokémon does not evolve.
      </p>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      {levels.map((lvl, li) => (
        <div
          key={li}
          style={{ display: "flex", alignItems: "center", gap: 12 }}
        >
          {li > 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
              }}
            >
              <span
                className="arrow-pulse"
                style={{ fontSize: 22, color: "var(--accent)" }}
              >
                →
              </span>
              {lvl[0]?.minLevel && (
                <span style={{ fontSize: 10, color: "var(--text-muted)" }}>
                  Lv {lvl[0].minLevel}
                </span>
              )}
              {lvl[0]?.item && (
                <span style={{ fontSize: 10, color: "var(--text-muted)" }}>
                  {formatPokemonName(lvl[0].item)}
                </span>
              )}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {lvl.map((stage) => (
              <div
                key={stage.pokemon.id}
                className="glass-card"
                onClick={() => onSelect(stage.pokemon.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && onSelect(stage.pokemon.name)
                }
                style={{
                  padding: "12px 14px",
                  cursor: "pointer",
                  minWidth: 100,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${stage.pokemon.id}.png`}
                  alt={stage.pokemon.name}
                  width={64}
                  height={64}
                  style={{ objectFit: "contain" }}
                />
                <span
                  style={{ fontSize: 12, fontWeight: 600, textAlign: "center" }}
                >
                  {formatPokemonName(stage.pokemon.name)}
                </span>
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {stage.pokemon.types.map((t) => (
                    <TypeBadge key={t} type={t} size="sm" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
