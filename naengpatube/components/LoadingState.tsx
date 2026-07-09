"use client";

/** Boiling-pot animation shown while recipes/videos load. */
export default function LoadingState({
  title = "레시피 찾는 중...",
  subtitle = "맛있는 조합을 고르고 있어요",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 28,
      }}
    >
      <div style={{ position: "relative", width: 150, height: 150, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
        <div style={{ position: "absolute", left: 38, bottom: 104, width: 10, height: 10, borderRadius: "50%", background: "#f2a03d", animation: "npt-bubble 1.6s ease-out infinite" }} />
        <div style={{ position: "absolute", left: 72, bottom: 108, width: 13, height: 13, borderRadius: "50%", background: "var(--accent)", animation: "npt-bubble 1.6s ease-out .5s infinite" }} />
        <div style={{ position: "absolute", left: 102, bottom: 104, width: 9, height: 9, borderRadius: "50%", background: "#f2a03d", animation: "npt-bubble 1.6s ease-out 1s infinite" }} />
        <div style={{ position: "absolute", left: 60, bottom: 112, width: 26, height: 8, borderRadius: 999, background: "#e5d5c2", animation: "npt-steam 2.2s ease-out .3s infinite" }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ width: 90, height: 16, borderRadius: 8, background: "var(--accent)", position: "relative", animation: "npt-lid 1.1s ease-in-out infinite", zIndex: 2 }}>
            <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", width: 14, height: 14, borderRadius: "50%", background: "var(--accent-dark)" }} />
          </div>
          <div style={{ width: 104, height: 64, borderRadius: "8px 8px 26px 26px", background: "#ffdca8", border: "3px solid #e8b96f", borderTop: "none", position: "relative", marginTop: -3 }}>
            <div style={{ position: "absolute", left: -16, top: 12, width: 14, height: 10, borderRadius: "6px 0 0 6px", background: "#e8b96f" }} />
            <div style={{ position: "absolute", right: -16, top: 12, width: 14, height: 10, borderRadius: "0 6px 6px 0", background: "#e8b96f" }} />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ fontSize: 19, fontWeight: 800, color: "var(--ink)" }}>{title}</div>
        <div style={{ fontSize: 14, color: "var(--muted)" }}>{subtitle}</div>
      </div>
    </div>
  );
}
