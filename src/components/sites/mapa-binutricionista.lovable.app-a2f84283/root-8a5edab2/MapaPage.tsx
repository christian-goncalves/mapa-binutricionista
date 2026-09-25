"use client";

import { useState, type FormEvent } from "react";
import { CaptureSection, type CaptureErrors } from "./CaptureSection";
import { Footer } from "./Footer";
import { OpeningSection } from "./OpeningSection";
import { QuizSection } from "./QuizSection";
import { deriveCategory, mapaQuestions, type MapaCategory } from "./mapa-data";
import { ResultSection } from "./ResultSection";
import { TransitionSection } from "./TransitionSection";

type Stage = "opening" | "quiz" | "transition" | "capture" | "result";

function isValidBrazilianWhatsapp(value: string) {
  const digits = value.replace(/\D/g, "");
  const nationalNumber = digits.startsWith("55") ? digits.slice(2) : digits;
  return /^\d{10,11}$/.test(nationalNumber) && !nationalNumber.startsWith("0");
}

export function MapaPage() {
  const [stage, setStage] = useState<Stage>("opening");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<MapaCategory | null>>(() => Array(mapaQuestions.length).fill(null));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [contactConsent, setContactConsent] = useState(false);
  const [errors, setErrors] = useState<CaptureErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [persistenceFailed, setPersistenceFailed] = useState(false);
  const [resultCategory, setResultCategory] = useState<MapaCategory | null>(null);

  function startQuiz() {
    setAnswers(Array(mapaQuestions.length).fill(null));
    setCurrentIndex(0);
    setName("");
    setEmail("");
    setWhatsapp("");
    setContactConsent(false);
    setErrors({});
    setPersistenceFailed(false);
    setResultCategory(null);
    setStage("quiz");
  }

  function selectAnswer(category: MapaCategory) {
    if (isAdvancing) return;

    setIsAdvancing(true);
    setAnswers((previous) => {
      const next = [...previous];
      next[currentIndex] = category;
      return next;
    });

    window.setTimeout(() => {
      if (currentIndex < mapaQuestions.length - 1) {
        setCurrentIndex((index) => index + 1);
        setIsAdvancing(false);
        return;
      }

      setStage("transition");
      window.setTimeout(() => {
        setStage("capture");
        setIsAdvancing(false);
      }, 500);
    }, 180);
  }

  async function submitCapture(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanWhatsapp = whatsapp.trim();
    const nextErrors: CaptureErrors = {};

    if (cleanName.length < 2) nextErrors.name = "Informe seu nome para continuar.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)) nextErrors.email = "Verifique o e-mail digitado.";
    if (!isValidBrazilianWhatsapp(cleanWhatsapp)) nextErrors.whatsapp = "Informe um WhatsApp brasileiro válido.";
    if (!contactConsent) nextErrors.consent = "Para ver seu resultado, confirme que aceita o contato posterior.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    let saved = false;

    try {
      const response = await fetch("/api/mapa/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: cleanName,
          email: cleanEmail,
          whatsapp: cleanWhatsapp,
          consentimento_contato: "sim",
        }),
      });
      saved = response.ok;
    } catch {
      saved = false;
    }

    setResultCategory(deriveCategory(answers));
    setPersistenceFailed(!saved);
    setSubmitting(false);
    setStage("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="mapa-page">
      {stage === "opening" ? <OpeningSection onStart={startQuiz} /> : null}
      {stage === "quiz" ? <QuizSection questions={mapaQuestions} currentIndex={currentIndex} answers={answers} isAdvancing={isAdvancing} onSelect={selectAnswer} onBack={() => setCurrentIndex((index) => Math.max(0, index - 1))} /> : null}
      {stage === "transition" ? <TransitionSection /> : null}
      {stage === "capture" ? <CaptureSection name={name} email={email} whatsapp={whatsapp} contactConsent={contactConsent} errors={errors} submitting={submitting} onNameChange={setName} onEmailChange={setEmail} onWhatsappChange={setWhatsapp} onConsentChange={setContactConsent} onSubmit={submitCapture} onBack={() => setStage("quiz")} /> : null}
      {stage === "result" && resultCategory ? <ResultSection name={name} category={resultCategory} persistenceFailed={persistenceFailed} /> : null}
      <Footer />
    </main>
  );
}
