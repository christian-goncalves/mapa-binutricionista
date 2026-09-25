import type { FormEvent } from "react";

export type CaptureField = "name" | "email" | "whatsapp" | "consent";
export type CaptureErrors = Partial<Record<CaptureField, string>>;

type CaptureSectionProps = {
  name: string;
  email: string;
  whatsapp: string;
  contactConsent: boolean;
  errors: CaptureErrors;
  submitting: boolean;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onWhatsappChange: (value: string) => void;
  onConsentChange: (value: boolean) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
};

export function CaptureSection({
  name,
  email,
  whatsapp,
  contactConsent,
  errors,
  submitting,
  onNameChange,
  onEmailChange,
  onWhatsappChange,
  onConsentChange,
  onSubmit,
  onBack,
}: CaptureSectionProps) {
  return (
    <section className="mapa-container mapa-fade">
      <h2 className="mapa-capture-title">Para ver seu resultado, preencha seus dados abaixo.</h2>
      <p className="mapa-capture-support">Seus dados serão usados para registrar sua participação e permitir um contato posterior sobre este resultado.</p>
      <form className="mapa-capture-form" onSubmit={onSubmit} noValidate>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            name="nome"
            autoComplete="name"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            className="mapa-input"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "nome-erro" : undefined}
          />
          {errors.name ? <p id="nome-erro" className="mapa-field-error" role="alert">{errors.name}</p> : null}
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            className="mapa-input"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-erro" : undefined}
          />
          {errors.email ? <p id="email-erro" className="mapa-field-error" role="alert">{errors.email}</p> : null}
        </div>
        <div>
          <label htmlFor="whatsapp">WhatsApp</label>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={whatsapp}
            onChange={(event) => onWhatsappChange(event.target.value)}
            className="mapa-input"
            aria-invalid={Boolean(errors.whatsapp)}
            aria-describedby={errors.whatsapp ? "whatsapp-erro" : undefined}
          />
          {errors.whatsapp ? <p id="whatsapp-erro" className="mapa-field-error" role="alert">{errors.whatsapp}</p> : null}
        </div>
        <label className="mapa-consent-label">
          <input
            type="checkbox"
            checked={contactConsent}
            onChange={(event) => onConsentChange(event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "consentimento-erro" : undefined}
          />
          <span>Aceito receber contato posterior da Bianca Gonçalves por e-mail e WhatsApp sobre este resultado.</span>
        </label>
        {errors.consent ? <p id="consentimento-erro" className="mapa-field-error" role="alert">{errors.consent}</p> : null}
        <button type="submit" className="mapa-primary-button" disabled={submitting}>
          {submitting ? "Registrando…" : "Ver meu resultado"}
        </button>
      </form>
      <button type="button" className="mapa-text-button mapa-capture-back" onClick={onBack}>Voltar</button>
    </section>
  );
}
