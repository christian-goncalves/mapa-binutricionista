type OpeningSectionProps = {
  onStart: () => void;
};

export function OpeningSection({ onStart }: OpeningSectionProps) {
  return (
    <section className="mapa-container mapa-fade">
      <div className="mapa-brand-block">
        <p className="mapa-brand-name">Bianca Gonçalves</p>
        <p className="mapa-brand-subtitle">Nutricionista Comportamental</p>
      </div>
      <h1 className="mapa-opening-title">Mapa do Automático</h1>
      <p className="mapa-opening-lead">Entenda o que está por trás das suas escolhas alimentares.</p>
      <p className="mapa-duration">São só 5 perguntas rápidas.</p>
      <button type="button" className="mapa-primary-button" onClick={onStart}>
        Descobrir meu padrão
      </button>
    </section>
  );
}
