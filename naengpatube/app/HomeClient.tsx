"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import IngredientInput from "@/components/IngredientInput";
import { Logo } from "@/components/Chrome";

const RECENT_KEY = "npt:recent";
const RECENT_MAX = 12;

function loadRecent(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveRecent(ingredients: string[]) {
  try {
    const prev = loadRecent();
    const merged = [...ingredients, ...prev].filter((v, i, arr) => arr.indexOf(v) === i).slice(0, RECENT_MAX);
    localStorage.setItem(RECENT_KEY, JSON.stringify(merged));
  } catch {
    /* ignore quota/availability errors */
  }
}

export default function HomeClient({ initial, initialBasics }: { initial: string[]; initialBasics: boolean }) {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>(initial);
  const [basics, setBasics] = useState(initialBasics);
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    setRecent(loadRecent());
  }, []);

  function toggle(name: string) {
    setSelected((s) => (s.includes(name) ? s.filter((x) => x !== name) : [...s, name]));
  }
  function add(name: string) {
    setSelected((s) => (s.includes(name) ? s : [...s, name]));
  }
  function remove(name: string) {
    setSelected((s) => s.filter((x) => x !== name));
  }

  function findDishes() {
    if (selected.length === 0) return;
    saveRecent(selected);
    const params = new URLSearchParams({ i: selected.join(","), basics: basics ? "1" : "0" });
    router.push(`/results?${params.toString()}`);
  }

  const has = selected.length > 0;

  return (
    <main className="screen">
      <div style={{ padding: "28px 22px 14px", display: "flex", flexDirection: "column", gap: 16 }}>
        <Logo />
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1.25 }}>냉장고에 뭐 있어요?</div>
          <div style={{ fontSize: 14, color: "var(--muted)" }}>재료만 고르면 레시피 영상까지 찾아드릴게요</div>
        </div>
      </div>

      <div className="screen__scroll" style={{ paddingBottom: 12 }}>
        <IngredientInput
          selected={selected}
          recent={recent}
          basics={basics}
          onToggle={toggle}
          onRemove={remove}
          onAdd={add}
          onBasicsChange={setBasics}
        />
      </div>

      <div
        style={{
          padding: "14px 20px 22px",
          background: "linear-gradient(to top, var(--card) 68%, rgba(255,249,241,0))",
        }}
      >
        <button
          onClick={findDishes}
          disabled={!has}
          style={{
            width: "100%",
            height: 56,
            borderRadius: 18,
            border: "none",
            background: has ? "var(--accent)" : "#efe3d3",
            color: has ? "#fff" : "#b7a28c",
            fontSize: 16,
            fontWeight: 800,
            boxShadow: has ? "0 10px 24px rgba(232,85,47,.32)" : "none",
          }}
        >
          요리 찾기 (재료 {selected.length}개)
        </button>
      </div>
    </main>
  );
}
