"use client";

import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";
    return (localStorage.getItem("theme") as "dark" | "light") || "dark";
  });
  const router = useRouter();
  const [hoverToggle, setHoverToggle] = useState(false);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  return (
    <nav
      style={{
        background: "var(--bg-glass)",
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 20px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            className="pulse-glow"
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "var(--bg-primary)",
              }}
            />
          </div>
          <span
            onClick={() => router.push("/")}
            className="font-display"
            style={{ fontSize: 11, color: "var(--accent)", cursor: "pointer" }}
          >
            Pokédex
          </span>
        </div>

        <button
          onClick={toggle}
          onMouseEnter={() => setHoverToggle(true)}
          onMouseLeave={() => setHoverToggle(false)}
          style={{
            width: 36,
            height: 36,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: hoverToggle ? "var(--accent)" : "var(--text-secondary)",
            cursor: "pointer",
            transition: "color 0.2s ease",
            background: "none",
            border: "none",
          }}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
    </nav>
  );
}
