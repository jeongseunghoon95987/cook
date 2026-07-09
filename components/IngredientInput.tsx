"use client";

import { useState, type KeyboardEvent } from "react";
import { CATEGORIES, INGREDIENTS, type Category } from "@/lib/ingredients";

interface Props {
  selected: string[];
  recent: string[];
  basics: boolean;
  onToggle: (name: string) => void;
  onRemove: (name: string) => void;
  onAdd: (name: string) => void;
  onBasicsChange: (value: boolean) => void;
}

export default function IngredientInput({
  selected,
  recent,
  basics,
  onToggle,
  onRemove,
  onAdd,
  onBasicsChange,
}: Props) {
  const [tab, setTab] = useState<Category>("채소");
  const [draft, setDraft] = useState("");

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && draft.trim()) {
      onAdd(draft.trim());
      setDraft("");
    }
  }

  const freshRecent = recent.filter((r) => !selected.includes(r)).slice(0, 8);

  return (
    <>
      {/* Selected ingredients */}
      <div style={{ padding: "0 22px 12px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--muted3)" }}>내 재료 {selected.length}개</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, minHeight: 34 }}>
          {selected.map((name) => (
            <button
              key={name}
              onClick={() => onRemove(name)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 12px",
                borderRadius: 999,
                background: "var(--accent)",
                border: "none",
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {name}
              <span style={{ fontSize: 12, opacity: 0.75 }}>✕</span>
            </button>
          ))}
        </div>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKey}
          placeholder="재료 입력 후 Enter (예: 애호박)"
          style={{
            width: "100%",
            height: 50,
            borderRadius: 16,
            border: "1.5px solid var(--border)",
            background: "#fff",
            padding: "0 16px",
            fontSize: 15,
            color: "var(--ink)",
            outline: "none",
          }}
        />

        {/* Basics toggle */}
        <button
          onClick={() => onBasicsChange(!basics)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            marginTop: 2,
            padding: "10px 14px",
            borderRadius: 14,
            border: `1.5px solid ${basics ? "var(--accent)" : "var(--border)"}`,
            background: basics ? "var(--chip-on-bg)" : "#fff",
            textAlign: "left",
          }}
        >
          <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: basics ? "var(--accent)" : "var(--ink)" }}>
              기본 양념은 있어요
            </span>
            <span style={{ fontSize: 11.5, color: "var(--muted)" }}>소금·후추·식용유·간장·설탕</span>
          </span>
          <span
            aria-hidden
            style={{
              width: 42,
              height: 24,
              borderRadius: 999,
              background: basics ? "var(--accent)" : "#dcc9b2",
              position: "relative",
              flexShrink: 0,
              transition: "background .15s",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 3,
                left: basics ? 21 : 3,
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: "#fff",
                transition: "left .15s",
              }}
            />
          </span>
        </button>
      </div>

      {/* Recently used */}
      {freshRecent.length > 0 && (
        <div style={{ padding: "0 22px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--muted3)" }}>최근 사용한 재료</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {freshRecent.map((name) => (
              <button
                key={name}
                onClick={() => onToggle(name)}
                style={{
                  padding: "8px 13px",
                  borderRadius: 12,
                  border: "1.5px dashed var(--border)",
                  background: "#fff",
                  color: "var(--muted2)",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                + {name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category tabs */}
      <div style={{ padding: "2px 22px 10px", display: "flex", gap: 6 }}>
        {CATEGORIES.map((name) => {
          const active = name === tab;
          return (
            <button
              key={name}
              onClick={() => setTab(name)}
              style={{
                padding: "8px 15px",
                borderRadius: 999,
                border: `1.5px solid ${active ? "var(--tab-active-bg)" : "var(--border)"}`,
                background: active ? "var(--tab-active-bg)" : "#fff",
                color: active ? "var(--tab-active-fg)" : "var(--muted2)",
                fontSize: 13,
                fontWeight: 700,
              }}
            >
              {name}
            </button>
          );
        })}
      </div>

      {/* Ingredient grid */}
      <div style={{ padding: "6px 22px 8px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {INGREDIENTS[tab].map((name) => {
            const on = selected.includes(name);
            return (
              <button
                key={name}
                onClick={() => onToggle(name)}
                style={{
                  padding: "11px 16px",
                  borderRadius: 14,
                  border: `1.5px solid ${on ? "var(--accent)" : "var(--border)"}`,
                  background: on ? "var(--chip-on-bg)" : "#fff",
                  color: on ? "var(--accent)" : "#6b5442",
                  fontSize: 14,
                  fontWeight: 600,
                  minHeight: 44,
                }}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
