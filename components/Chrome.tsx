"use client";

/** Shared bits of screen chrome: the brand logo and the back button. */

export function Logo() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 9,
          background: "var(--accent)",
          color: "#fff",
          fontSize: 15,
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        냉
      </div>
      <div style={{ fontSize: 18, fontWeight: 800, color: "var(--accent)", letterSpacing: "-.01em" }}>냉파튜브</div>
    </div>
  );
}

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="뒤로"
      style={{
        width: 36,
        height: 36,
        borderRadius: 12,
        border: "1.5px solid var(--border)",
        background: "#fff",
        fontSize: 18,
        color: "#7a6250",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        flexShrink: 0,
      }}
    >
      ‹
    </button>
  );
}
