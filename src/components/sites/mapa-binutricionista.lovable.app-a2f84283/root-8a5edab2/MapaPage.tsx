"use client";

import { useState } from "react";
import { CaptureSection } from "./CaptureSection";
import { Footer } from "./Footer";
import { LovableBadge } from "./LovableBadge";
import { OpeningSection } from "./OpeningSection";
import { QuizSection } from "./QuizSection";
import { deriveCategory, mapaQuestions, type MapaCategory } from "./mapa-data";
import { ResultSection } from "./ResultSection";

type Stage = "opening" | "quiz" | "capture" | "result";

export function MapaPage() {
  const [stage, setStage] = useState<Stage>("opening");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<MapaCategory | null>>(() => Array(mapaQuestions.length).fill(null));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [resultCategory, setResultCategory] = useState<MapaCategory | null>(null);

  function startQuiz() {
    setStage("quiz");
    setCurrentIndex(0);
  }

  function selectAnswer(category: MapaCategory) {
    setAnswers((previous) => {
      const next = [...previous];
      next[currentIndex] = category;
      return next;
    });
    window.setTimeout(() => {
      if (currentIndex < mapaQuestions.length - 1) {
        setCurrentIndex((index) => index + 1);
      } else {
        setStage("capture");
      }
    }, 180);
  }

  function submitCapture(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    if (cleanName.length < 2) {
      setError("Escreva seu primeiro nome para continuar.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)) {
      setError("Verifique o e-mail digitado.");
      return;
    }
    setError(null);
    setSubmitting(true);
    window.setTimeout(() => {
      setResultCategory(deriveCategory(answers));
      setSubmitting(false);
      setStage("result");
      window.scrollTo({ top: 0 });
    }, 180);
  }

  return (
    <main className="mapa-page">
      {stage === "opening" ? <OpeningSection onStart={startQuiz} /> : null}
      {stage === "quiz" ? <QuizSection questions={mapaQuestions} currentIndex={currentIndex} answers={answers} onSelect={selectAnswer} onBack={() => setCurrentIndex((index) => Math.max(0, index - 1))} /> : null}
      {stage === "capture" ? <CaptureSection name={name} email={email} marketingOptIn={marketingOptIn} error={error} submitting={submitting} onNameChange={setName} onEmailChange={setEmail} onMarketingChange={setMarketingOptIn} onSubmit={submitCapture} onBack={() => setStage("quiz")} /> : null}
      {stage === "result" && resultCategory ? <ResultSection name={name} category={resultCategory} /> : null}
      <Footer />
      <LovableBadge />
    </main>
  );
}
