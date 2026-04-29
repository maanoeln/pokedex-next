"use client";

import Image from "next/image";
import { formatPokemonName, getPokemonId } from "@/lib/utils";

interface Props {
  pokemon: { name: string; id: number };
  index: number;
  onClick: () => void;
}

export function PokemonCard({ pokemon, index, onClick }: Props) {
  const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <div
      className="glass-card pokemon-card card-enter"
      style={{
        padding: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        animationDelay: `${Math.min(index * 25, 250)}ms`,
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
    >
      <span
        className="font-display"
        style={{
          fontSize: 7,
          color: "var(--text-muted)",
          alignSelf: "flex-end",
        }}
      >
        {getPokemonId(pokemon.id)}
      </span>
      <Image
        src={spriteUrl}
        alt={formatPokemonName(pokemon.name)}
        width={80}
        height={80}
        style={{
          objectFit: "contain",
          filter: "drop-shadow(0 4px 8px rgba(0,0,0,.2))",
        }}
      />
      <p
        style={{
          fontWeight: 600,
          fontSize: 13,
          textAlign: "center",
          color: "var(--text-primary)",
        }}
      >
        {formatPokemonName(pokemon.name)}
      </p>
    </div>
  );
}
