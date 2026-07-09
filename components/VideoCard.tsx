"use client";

import type { Video } from "@/lib/types";

interface Props {
  video: Video;
  index: number;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
}

function ThumbPlaceholder({ label }: { label: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(135deg, #fbefe3, #f0d9c2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          borderRadius: "50%",
          background: "rgba(232,85,47,.92)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ marginLeft: 3, borderStyle: "solid", borderWidth: "8px 0 8px 13px", borderColor: "transparent transparent transparent #fff" }} />
      </div>
      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--tag-fg)" }}>{label}</span>
    </div>
  );
}

function InlinePlayer() {
  return (
    <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: "#1b120c" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(232,85,47,.35), rgba(27,18,12,.9) 70%)" }} />
      <div style={{ position: "absolute", top: 12, left: 12, padding: "4px 10px", borderRadius: 999, background: "rgba(232,85,47,.95)", color: "#fff", fontSize: 11, fontWeight: 800 }}>
        재생 중
      </div>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", display: "flex", gap: 7 }}>
        <div style={{ width: 8, height: 30, borderRadius: 3, background: "#fff" }} />
        <div style={{ width: 8, height: 30, borderRadius: 3, background: "#fff" }} />
      </div>
      <div style={{ position: "absolute", left: 14, right: 14, bottom: 14, display: "flex", flexDirection: "column", gap: 7 }}>
        <div style={{ height: 4, borderRadius: 2, background: "rgba(255,255,255,.28)", overflow: "hidden" }}>
          <div style={{ width: "38%", height: "100%", background: "#ff3d2e", borderRadius: 2 }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,.85)", fontWeight: 600 }}>
          <span>3:12 / 8:24</span>
          <span>HD</span>
        </div>
      </div>
    </div>
  );
}

export default function VideoCard({ video, index, isPlaying = false, onTogglePlay }: Props) {
  const interactive = Boolean(onTogglePlay) || Boolean(video.videoId);

  function handleClick() {
    if (onTogglePlay) {
      onTogglePlay();
    } else if (video.videoId) {
      window.open(`https://www.youtube.com/watch?v=${video.videoId}`, "_blank", "noopener");
    }
  }

  return (
    <div
      onClick={interactive ? handleClick : undefined}
      style={{
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 6px 18px rgba(61,32,16,.08)",
        cursor: interactive ? "pointer" : "default",
      }}
    >
      {isPlaying && video.videoId ? (
        <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9", background: "#000" }}>
          <iframe
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
          />
        </div>
      ) : isPlaying ? (
        <InlinePlayer />
      ) : (
        <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 9" }}>
          {video.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={video.thumbnail}
              alt={video.title}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <ThumbPlaceholder label={`영상 썸네일 ${index + 1}`} />
          )}
          {video.duration && (
            <span
              style={{
                position: "absolute",
                right: 10,
                bottom: 10,
                padding: "3px 8px",
                borderRadius: 6,
                background: "rgba(0,0,0,.8)",
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                pointerEvents: "none",
              }}
            >
              {video.duration}
            </span>
          )}
        </div>
      )}
      <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{ fontSize: 15, fontWeight: 800, lineHeight: 1.4, color: "var(--ink)" }}>{video.title}</div>
        <div style={{ fontSize: 12.5, color: "var(--muted)" }}>
          {video.channel}
          {video.views ? ` · 조회수 ${video.views}` : ""}
        </div>
      </div>
    </div>
  );
}
