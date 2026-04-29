import { STAT_COLORS, STAT_MAX, STAT_LABELS } from "@/lib/stats";
import { formatPokemonName } from "@/lib/utils";
import { PokemonDetail } from "@/lib/types";

export function PokemonBaseStats({ data }: { data: PokemonDetail }) {
  const total = data.stats.reduce((a, s) => a + s.base_stat, 0);

  return (
    <div className="glass-card" style={{ padding: 24, marginBottom: 16 }}>
      <h2
        className="font-display"
        style={{ fontSize: 9, color: "var(--text-muted)", marginBottom: 20 }}
      >
        Base Stats
      </h2>
      {data.stats.map((s) => {
        const max = STAT_MAX[s.stat.name] || 255;
        const pct = Math.round((s.base_stat / max) * 100);
        const color = STAT_COLORS[s.stat.name] || "var(--accent)";
        return (
          <div
            key={s.stat.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: "var(--text-secondary)",
                width: 76,
                flexShrink: 0,
                fontWeight: 500,
              }}
            >
              {STAT_LABELS[s.stat.name] || formatPokemonName(s.stat.name)}
            </span>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                width: 32,
                flexShrink: 0,
                textAlign: "right",
              }}
            >
              {s.base_stat}
            </span>
            <div className="stat-bar" style={{ flex: 1 }}>
              <div
                className="stat-fill"
                style={
                  { "--w": pct + "%", background: color } as React.CSSProperties
                }
              />
            </div>
          </div>
        );
      })}
      <div
        style={{
          marginTop: 14,
          paddingTop: 14,
          borderTop: "1px solid var(--border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Total</span>
        <span style={{ fontSize: 16, fontWeight: 800 }}>{total}</span>
      </div>
    </div>
  );
}
