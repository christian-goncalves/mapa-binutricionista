"use client";

import Link from "next/link";

type LegalPageProps = {
  title: string;
  children: React.ReactNode;
};

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <main className="mapa-page">
      <section className="mapa-container mapa-fade">
        <h1 className="mapa-capture-title">{title}</h1>
        <div className="mapa-result-body mapa-legal-content">{children}</div>
        <Link className="mapa-text-button mapa-capture-back" href="/">
          Voltar ao início
        </Link>
      </section>
    </main>
  );
}
