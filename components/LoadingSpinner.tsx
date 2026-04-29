export function LoadingSpinner({ text = "Loading..." }: { text?: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        padding: "60px 0",
      }}
    >
      <div
        className="pokeball-spin"
        style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          border: "3px solid var(--border)",
          borderTopColor: "var(--accent)",
        }}
      />
      <p
        className="font-display"
        style={{ fontSize: 9, color: "var(--text-muted)" }}
      >
        {text}
      </p>
    </div>
  );
}
