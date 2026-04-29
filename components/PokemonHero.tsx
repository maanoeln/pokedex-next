import Image from "next/image";
import { Ruler, Weight, Star } from "lucide-react";
import { TypeBadge } from "@/components/TypeBadge";
import { TYPE_COLORS } from "@/lib/constants";
import { formatPokemonName, getPokemonId } from "@/lib/utils";
import { PokemonDetail } from "@/lib/types";

export function PokemonHero({ data }: { data: PokemonDetail }) {
  const art =
    data.sprites?.other?.["official-artwork"]?.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
  const types = data.types.map((t) => t.type.name);
  const typeColor = TYPE_COLORS[types[0]]?.bg_hex || "#888";

  const quickStats = [
    {
      icon: <Ruler size={18} />,
      label: "Height",
      value: `${(data.height / 10).toFixed(1)} m`,
    },
    {
      icon: <Weight size={18} />,
      label: "Weight",
      value: `${(data.weight / 10).toFixed(1)} kg`,
    },
    {
      icon: <Star size={18} />,
      label: "Base XP",
      value: data.base_experience ?? "—",
    },
  ];

  return (
    <div
      className="glass-card"
      style={{ overflow: "hidden", marginBottom: 16 }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${typeColor}28 0%, ${typeColor}08 100%)`,
          borderBottom: "1px solid var(--border)",
          padding: "32px 24px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span
          className="font-display"
          style={{ fontSize: 9, color: "var(--text-muted)" }}
        >
          {getPokemonId(data.id)}
        </span>
        <Image
          src={art}
          alt={formatPokemonName(data.name)}
          width={200}
          height={200}
          style={{
            objectFit: "contain",
            filter: "drop-shadow(0 8px 24px rgba(0,0,0,.3))",
          }}
          priority
        />
        <h1
          className="font-display"
          style={{
            fontSize: 18,
            textAlign: "center",
            color: "var(--text-primary)",
          }}
        >
          {formatPokemonName(data.name)}
        </h1>
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {types.map((t) => (
            <TypeBadge key={t} type={t} />
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)" }}>
        {quickStats.map((item, i) => (
          <div
            key={i}
            style={{
              padding: "16px 12px",
              textAlign: "center",
              borderRight: i < 2 ? "1px solid var(--border)" : "none",
            }}
          >
            <div
              style={{
                color: "var(--accent)",
                marginBottom: 6,
                display: "flex",
                justifyContent: "center",
              }}
            >
              {item.icon}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "var(--text-muted)",
                marginBottom: 4,
              }}
            >
              {item.label}
            </div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
