type CaptureSectionProps = {
  name: string;
  email: string;
  marketingOptIn: boolean;
  error: string | null;
  submitting: boolean;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onMarketingChange: (value: boolean) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onBack: () => void;
};

export function CaptureSection({
  name,
  email,
  marketingOptIn,
  error,
  submitting,
  onNameChange,
  onEmailChange,
  onMarketingChange,
  onSubmit,
  onBack,
}: CaptureSectionProps) {
  return (
    <section className="mapa-container mapa-fade">
      <h2 className="mapa-capture-title">Seu Mapa está quase pronto.</h2>
      <p className="mapa-capture-intro">Suas respostas já formaram o seu Mapa.</p>
      <p className="mapa-capture-support">Preencha abaixo para ver qual padrão apareceu com mais frequência.</p>
      <form className="mapa-capture-form" onSubmit={onSubmit} noValidate>
        <div>
          <label htmlFor="nome">Primeiro nome</label>
          <input id="nome" name="nome" autoComplete="given-name" value={name} onChange={(event) => onNameChange(event.target.value)} className="mapa-input" />
        </div>
        <div>
          <label htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" value={email} onChange={(event) => onEmailChange(event.target.value)} className="mapa-input" />
        </div>
        <label className="mapa-consent-label">
          <input type="checkbox" checked={marketingOptIn} onChange={(event) => onMarketingChange(event.target.checked)} />
          <span>Quero receber conteúdos e novos materiais da Bianca Gonçalves por e-mail.</span>
        </label>
        <p className="mapa-consent-note">Seus dados serão utilizados para gerar sua devolutiva e, somente se você autorizar acima, para o envio de conteúdos e materiais.</p>
        {error ? <p className="mapa-error" role="alert">{error}</p> : null}
        <button type="submit" className="mapa-primary-button" disabled={submitting}>
          {submitting ? "Preparando seu mapa…" : "Ver meu mapa"}
        </button>
      </form>
      <button type="button" className="mapa-text-button mapa-capture-back" onClick={onBack}>Voltar</button>
    </section>
  );
}
