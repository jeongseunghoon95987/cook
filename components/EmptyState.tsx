"use client";

/** No ingredients selected — invites the user back to the picker. */
export default function EmptyState({ onPick }: { onPick: () => void }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, padding: "0 40px" }}>
      <div style={{ width: 110, height: 110, borderRadius: "50%", border: "2.5px dashed #dcc9b2", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 44, height: 60, borderRadius: 10, border: "3px solid #c9b29a", position: "relative" }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 20, height: 3, background: "#c9b29a" }} />
          <div style={{ position: "absolute", left: 7, top: 7, width: 3, height: 8, borderRadius: 2, background: "#c9b29a" }} />
          <div style={{ position: "absolute", left: 7, top: 28, width: 3, height: 10, borderRadius: 2, background: "#c9b29a" }} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, textAlign: "center" }}>
        <div style={{ fontSize: 19, fontWeight: 800, color: "var(--ink)" }}>아직 고른 재료가 없어요</div>
        <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>
          냉장고에 있는 재료를 한 개만 골라도
          <br />
          만들 수 있는 요리를 찾아드려요
        </div>
      </div>
      <button
        onClick={onPick}
        style={{ padding: "13px 22px", borderRadius: 16, border: "none", background: "#fbeadf", color: "var(--accent)", fontSize: 14, fontWeight: 800 }}
      >
        인기 재료 보러가기
      </button>
    </div>
  );
}
