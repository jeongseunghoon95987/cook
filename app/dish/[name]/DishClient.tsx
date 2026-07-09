"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import VideoCard from "@/components/VideoCard";
import LoadingState from "@/components/LoadingState";
import ErrorState from "@/components/ErrorState";
import { BackButton } from "@/components/Chrome";
import type { VideosResponse } from "@/lib/types";

type Status = "loading" | "error" | "ready";

export default function DishClient({
  dishName,
  ingredients,
  basics,
}: {
  dishName: string;
  ingredients: string[];
  basics: boolean;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<VideosResponse | null>(null);
  const [playing, setPlaying] = useState(false);

  const query = new URLSearchParams({ i: ingredients.join(","), basics: basics ? "1" : "0" }).toString();

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch(`/api/videos?dish=${encodeURIComponent(dishName)}`);
      if (!res.ok) throw new Error(`videos ${res.status}`);
      const json = (await res.json()) as VideosResponse;
      setData(json);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, [dishName]);

  useEffect(() => {
    void load();
  }, [load]);

  if (status === "loading") {
    return (
      <main className="screen">
        <LoadingState title="레시피 영상 찾는 중..." subtitle={`${dishName} 영상을 고르고 있어요`} />
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

  const videos = data?.videos ?? [];

  return (
    <main className="screen">
      <div style={{ padding: "24px 22px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <BackButton onClick={() => router.push(`/results?${query}`)} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 19, fontWeight: 800 }}>{dishName}</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>유튜브 레시피 영상 {videos.length}개</div>
          </div>
        </div>
      </div>

      <div className="screen__scroll" style={{ padding: "2px 20px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        {videos.map((video, index) => (
          <VideoCard
            key={`${video.videoId || video.title}-${index}`}
            video={video}
            index={index}
            isPlaying={index === 0 ? playing : false}
            onTogglePlay={index === 0 ? () => setPlaying((p) => !p) : undefined}
          />
        ))}
      </div>

      <div style={{ padding: "14px 20px 22px", display: "flex", gap: 10, background: "linear-gradient(to top, var(--card) 68%, rgba(255,249,241,0))" }}>
        <button
          onClick={() => router.push(`/results?${query}`)}
          style={{ flex: 1, height: 54, borderRadius: 18, border: "1.5px solid var(--border)", background: "#fff", color: "#7a6250", fontSize: 15, fontWeight: 800 }}
        >
          다른 요리 보기
        </button>
        <button
          onClick={() => router.push(`/?${query}`)}
          style={{ flex: 1, height: 54, borderRadius: 18, border: "none", background: "var(--accent)", color: "#fff", fontSize: 15, fontWeight: 800, boxShadow: "0 8px 20px rgba(232,85,47,.3)" }}
        >
          재료 다시 고르기
        </button>
      </div>
    </main>
  );
}
