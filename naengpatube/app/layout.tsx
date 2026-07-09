import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "냉파튜브 — 냉장고 재료로 찾는 유튜브 레시피",
  description: "냉장고에 있는 재료만 고르면 만들 수 있는 요리와 유튜브 레시피 영상을 찾아드려요.",
};

export const viewport: Viewport = {
  themeColor: "#EFE6DA",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="app-shell">{children}</div>
      </body>
    </html>
  );
}
