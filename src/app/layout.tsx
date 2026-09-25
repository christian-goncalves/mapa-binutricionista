import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mapa do Automático | Bianca Gonçalves",
  description: "Responda 5 perguntas rápidas e observe quais fatores podem estar influenciando suas decisões alimentares sem você perceber.",
  authors: [{ name: "Bianca Gonçalves" }],
  openGraph: {
    title: "Mapa do Automático | Bianca Gonçalves",
    description: "Responda 5 perguntas rápidas e observe quais fatores podem estar influenciando suas decisões alimentares sem você perceber.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#F7F2EC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body>{children}</body>
    </html>
  );
}
