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
      <p className="mapa-opening-lead">
        Descubra o que pode estar influenciando suas decisões alimentares sem você perceber.
      </p>
      <div className="mapa-opening-copy">
        <p>Você provavelmente já sabe muita coisa sobre alimentação.</p>
        <p>A questão é que saber o que fazer e conseguir fazer nem sempre são a mesma coisa.</p>
        <p>Responda 5 perguntas rápidas e observe quais fatores podem estar aparecendo com mais frequência nas suas decisões alimentares.</p>
      </div>
      <p className="mapa-duration">Leva cerca de 2 minutos.</p>
      <button type="button" className="mapa-primary-button" onClick={onStart}>
        Começar meu mapa
      </button>
      <p className="mapa-reassurance">Não existem respostas certas ou erradas.</p>
    </section>
  );
}
