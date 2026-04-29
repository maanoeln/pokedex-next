"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  function getPages(): (number | "...")[] {
    if (totalPages <= 7)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "...")[] = [1];
    if (currentPage > 3) pages.push("...");
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    )
      pages.push(i);
    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
    return pages;
  }

  const btn: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    fontSize: 13,
    fontWeight: 500,
    background: "var(--bg-card)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    color: "var(--text-secondary)",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingTop: 28,
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          ...btn,
          opacity: currentPage === 1 ? 0.4 : 1,
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
      >
        <ChevronLeft size={16} /> Prev
      </button>

      <div
        style={{
          display: "flex",
          gap: 4,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {getPages().map((p, i) =>
          p === "..." ? (
            <span
              key={`e${i}`}
              style={{
                width: 36,
                textAlign: "center",
                color: "var(--text-muted)",
                lineHeight: "36px",
                fontSize: 14,
              }}
            >
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={p === currentPage ? "font-display" : ""}
              style={{
                width: 36,
                height: 36,
                padding: 0,
                fontSize: p === currentPage ? 9 : 13,
                fontWeight: p === currentPage ? 700 : 400,
                background:
                  p === currentPage ? "var(--accent)" : "var(--bg-card)",
                color:
                  p === currentPage
                    ? "var(--bg-primary)"
                    : "var(--text-secondary)",
                border: `1px solid ${p === currentPage ? "var(--accent)" : "var(--border)"}`,
                borderRadius: 10,
                cursor: "pointer",
                boxShadow:
                  p === currentPage ? "0 0 12px var(--accent-glow)" : "none",
              }}
              aria-current={p === currentPage ? "page" : undefined}
            >
              {p}
            </button>
          ),
        )}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          ...btn,
          opacity: currentPage === totalPages ? 0.4 : 1,
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
        }}
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
}
