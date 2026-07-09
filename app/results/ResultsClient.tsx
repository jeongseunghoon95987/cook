"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DishCard from "@/components/DishCard";
import LoadingState from "@/components/LoadingState";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import { BackButton } from "@/components/Chrome";
import { normalizeDishName } from "@/lib/normalize";
import type { RecommendResponse } from "@/lib/types";

type Status = "empty" | "loading" | "error" | "ready";

export default function ResultsClient({ ingredients, basics }: { ingredients: string[]; basics: boolean }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>(ingredients.length === 0 ? "empty" : "loading");
  const [data, setData] = useState<RecommendResponse | null>(null);

  const query = new URLSearchParams({ i: ingredients.join(","), basics: basics ? "1" : "0" }).toString();

  const load = useCallback(async () => {
    if (ingredients.length === 0) {
      setStatus("empty");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(`/api/recommend?${query}`);
      if (!res.ok) throw new Error(`recommend ${res.status}`);
      const json = (await res.json()) as RecommendResponse;
      setData(json);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, [ingredients.length, query]);

  useEffect(() => {
    void load();
  }, [load]);

  function openDish(name: string) {
    const dishParams = new URLSearchParams({ i: ingredients.join(","), basics: basics ? "1" : "0" });
    router.push(`/dish/${encodeURIComponent(normalizeDishName(name))}?${dishParams.toString()}`);
  }

  if (status === "empty") {
    return (
      <main className="screen">
        <div style={{ padding: "28px 22px 0" }}>
          <BackButton onClick={() => router.push("/")} />
        </div>
        <EmptyState onPick={() => router.push("/")} />
      </main>
    );
  }

  if (status === "loading") {
    return (
      <main className="screen">
        <LoadingState />
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="screen">
        <ErrorState onRetry={() => void load()} onHome={() => router.push("/")} />
      </main>
    );
  }

  const ready = data?.ready ?? [];
  const needMore = data?.needMore ?? [];
  const total = ready.length + needMore.length;

  return (
    <main className="screen">
      <div style={{ padding: "24px 22px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BackButton onClick={() => router.push(`/?${query}`)} />
          <div style={{ fontSize: 19, fontWeight: 800 }}>추천 요리 {total}</div>
        </div>
        <div style={{ fontSize: 13, color: "var(--muted)" }}>
          <span style={{ fontWeight: 700, color: "var(--accent)" }}>{ingredients.join(", ")}</span>
          (으)로 찾았어요
        </div>
      </div>

      <div
        className="screen__scroll"
        style={{ padding: "4px 20px 28px", display: "flex", flexDirection: "column", gap: 12 }}
      >
        {ready.length > 0 && (
          <>
            <div style={{ fontSize: 16, fontWeight: 800, padding: "8px 2px 0" }}>지금 바로 만들 수 있어요</div>
            {ready.map((dish) => (
              <DishCard key={dish.name} dish={dish} onClick={() => openDish(dish.name)} />
            ))}
          </>
        )}

        {needMore.length > 0 && (
          <>
            <div style={{ fontSize: 16, fontWeight: 800, padding: "14px 2px 0" }}>1~2개만 더 사면 돼요</div>
            {needMore.map((dish) => (
              <DishCard key={dish.name} dish={dish} onClick={() => openDish(dish.name)} />
            ))}
          </>
        )}

        {/* Reserved ad slot */}
        <div
          style={{
            marginTop: 10,
            background: "#f6efe5",
            border: "1.5px dashed #dcc9b2",
            borderRadius: 20,
            padding: "16px 18px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "linear-gradient(135deg, #f2a03d, #e8552f)",
              flexShrink: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 12,
              fontWeight: 800,
            }}
          >
            AD
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 0 }}>
            <div style={{ fontSize: 14, fontWeight: 800 }}>부족한 재료, 오늘 저녁 도착</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>신선식품 당일배송 · 첫 주문 3,000원 할인</div>
          </div>
        </div>
      </div>
    </main>
  );
}
