"use client";

import type { Dish } from "@/lib/types";

const DIFFICULTY_STYLE: Record<string, { bg: string; fg: string }> = {
  쉬움: { bg: "var(--ok-bg)", fg: "var(--ok-fg)" },
  보통: { bg: "var(--mid-bg)", fg: "var(--mid-fg)" },
  어려움: { bg: "var(--miss-bg)", fg: "var(--miss-fg)" },
};

export default function DishCard({ dish, onClick }: { dish: Dish; onClick?: () => void }) {
  const diff = DIFFICULTY_STYLE[dish.difficulty] ?? DIFFICULTY_STYLE["보통"];

  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        textAlign: "left",
        background: "#fff",
        border: "none",
        borderRadius: 20,
        padding: "16px 18px",
        boxShadow: "0 4px 14px rgba(61,32,16,.05)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: "var(--ink)" }}>{dish.name}</div>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span
            style={{
              padding: "4px 9px",
              borderRadius: 999,
              background: diff.bg,
              color: diff.fg,
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            {dish.difficulty}
          </span>
          <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>{dish.minutes}분</span>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
        {dish.usedIngredients.map((ing) => (
          <span
            key={ing}
            style={{
              padding: "4px 10px",
              borderRadius: 999,
              background: "var(--tag-bg)",
              color: "var(--tag-fg)",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            {ing}
          </span>
        ))}
        {dish.missingIngredients.map((ing) => (
          <span
            key={ing}
            style={{
              padding: "4px 10px",
              borderRadius: 999,
              background: "var(--miss-bg)",
              color: "var(--miss-fg)",
              fontSize: 12,
              fontWeight: 700,
              border: "1px dashed var(--miss-bd)",
            }}
          >
            + {ing}
          </span>
        ))}
      </div>
    </button>
  );
}
