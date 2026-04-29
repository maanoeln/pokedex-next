"use client";

import { useRef } from "react";
import { Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function SearchInput({ value, onChange }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div style={{ position: "relative", maxWidth: 560, margin: "0 auto" }}>
      <Search
        size={17}
        style={{
          position: "absolute",
          left: 14,
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--text-muted)",
          pointerEvents: "none",
        }}
      />
      <input
        ref={ref}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Pokémon..."
        style={{
          width: "100%",
          padding: "13px 44px",
          fontSize: 14,
          borderRadius: 12,
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          color: "var(--text-primary)",
          outline: "none",
          boxShadow: "var(--card-shadow)",
          fontFamily: "inherit",
          transition: "border-color .2s, box-shadow .2s",
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "var(--accent)";
          e.target.style.boxShadow = "0 0 0 3px var(--accent-glow)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "var(--border)";
          e.target.style.boxShadow = "var(--card-shadow)";
        }}
      />
      {value && (
        <button
          onClick={() => {
            onChange("");
            ref.current?.focus();
          }}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            padding: 4,
            background: "transparent",
            border: "none",
            color: "var(--text-muted)",
            cursor: "pointer",
          }}
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}
