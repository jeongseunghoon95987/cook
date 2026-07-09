"use client";

/** Network/API error with retry + home actions. */
export default function ErrorState({ onRetry, onHome }: { onRetry: () => void; onHome: () => void }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 22, padding: "0 40px", textAlign: "center" }}>
      <div style={{ width: 96, height: 96, borderRadius: 32, background: "var(--miss-bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <div style={{ width: 7, height: 30, borderRadius: 4, background: "var(--accent)" }} />
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)" }} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ fontSize: 19, fontWeight: 800, color: "var(--ink)" }}>앗, 레시피를 불러오지 못했어요</div>
        <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>
          네트워크 연결을 확인하고
          <br />
          다시 시도해주세요
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onHome} style={{ padding: "14px 24px", borderRadius: 16, border: "1.5px solid var(--border)", background: "#fff", color: "#7a6250", fontSize: 14, fontWeight: 800 }}>
          홈으로
        </button>
        <button onClick={onRetry} style={{ padding: "14px 24px", borderRadius: 16, border: "none", background: "var(--accent)", color: "#fff", fontSize: 14, fontWeight: 800, boxShadow: "0 8px 20px rgba(232,85,47,.3)" }}>
          다시 시도
        </button>
      </div>
    </div>
  );
}
