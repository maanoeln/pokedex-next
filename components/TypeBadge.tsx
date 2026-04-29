import { formatPokemonName } from "@/lib/utils";

interface Props {
  type: string;
  size?: "sm" | "md";
}

export function TypeBadge({ type, size = "md" }: Props) {
  return (
    <span
      className={`type-${type}`}
      style={{
        display: "inline-block",
        padding: size === "sm" ? "2px 8px" : "3px 12px",
        borderRadius: 20,
        fontSize: size === "sm" ? 10 : 11,
        fontWeight: 600,
        letterSpacing: "0.03em",
      }}
    >
      {formatPokemonName(type)}
    </span>
  );
}
