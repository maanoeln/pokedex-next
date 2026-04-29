import { Zap } from "lucide-react";
import { TypeBadge } from "@/components/TypeBadge";
import { formatPokemonName } from "@/lib/utils";
import { PokemonDetail } from "@/lib/types";

export function PokemonAbilities({ data }: { data: PokemonDetail }) {
  const types = data.types.map((t) => t.type.name);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
        marginBottom: 16,
      }}
    >
      <div className="glass-card" style={{ padding: 20 }}>
        <h2
          className="font-display"
          style={{ fontSize: 9, color: "var(--text-muted)", marginBottom: 14 }}
        >
          Abilities
        </h2>
        {data.abilities.map((a) => (
          <div
            key={a.ability.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <Zap size={14} style={{ color: "var(--accent)", flexShrink: 0 }} />
            <span style={{ fontSize: 13, fontWeight: 500 }}>
              {formatPokemonName(a.ability.name)}
            </span>
            {a.is_hidden && (
              <span
                style={{
                  fontSize: 10,
                  color: "var(--text-muted)",
                  background: "var(--bg-secondary)",
                  padding: "1px 6px",
                  borderRadius: 10,
                  border: "1px solid var(--border)",
                }}
              >
                hidden
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ padding: 20 }}>
        <h2
          className="font-display"
          style={{ fontSize: 9, color: "var(--text-muted)", marginBottom: 14 }}
        >
          Types
        </h2>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {types.map((t) => (
            <TypeBadge key={t} type={t} />
          ))}
        </div>
      </div>
    </div>
  );
}
