import { mapaPatterns, type MapaCategory } from "./mapa-data";

type ResultSectionProps = {
  name: string;
  category: MapaCategory;
};

function ResultBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mapa-result-block">
      <p className="mapa-result-label">{title}</p>
      <div className="mapa-result-body">{children}</div>
    </div>
  );
}

export function ResultSection({ name, category }: ResultSectionProps) {
  const pattern = mapaPatterns[category];

  return (
    <>
      <section className="mapa-container mapa-fade">
        <h2 className="mapa-result-title">{name.trim()}, seu Mapa está pronto.</h2>
        <p className="mapa-result-question">O padrão que mais apareceu nas suas respostas foi:</p>
        <p className="mapa-result-pattern">{pattern.name}</p>
        <div className="mapa-result-blocks">
          <ResultBlock title="O que apareceu no seu Mapa">
            {pattern.map.map((line) => <p key={line}>{line}</p>)}
          </ResultBlock>
          <ResultBlock title="Como isso pode aparecer no dia a dia">
            <ul>{pattern.dayToDay.map((line) => <li key={line}>{line}</li>)}</ul>
          </ResultBlock>
          <ResultBlock title="O que vale observar">
            {pattern.observe.map((line, index) => <p className={index === 0 ? "mapa-observation-lead" : undefined} key={line}>{line}</p>)}
          </ResultBlock>
          <ResultBlock title="Experimente nos próximos 3 dias">
            {pattern.experiment.map((line) => <p key={line}>{line}</p>)}
          </ResultBlock>
        </div>
        <hr className="mapa-result-divider" />
        <h3 className="mapa-important-title">Uma coisa importante</h3>
        <p className="mapa-important-copy">Você não precisa mudar tudo de uma vez.</p>
        <p className="mapa-important-copy mapa-important-copy-next">Antes de tentar controlar um comportamento, pode ser muito mais útil entender o que está acontecendo antes dele.</p>
        <p className="mapa-result-quote">Entre o automático e a mudança existe uma etapa importante: perceber.</p>
      </section>
      <section className="mapa-container mapa-result-cta">
        <h3 className="mapa-result-cta-title">Quer continuar entendendo seu comportamento alimentar?</h3>
        <p className="mapa-result-cta-copy">Eu falo sobre alimentação, hábitos, comportamento e neurociência de um jeito aplicável à vida real.</p>
        <a className="mapa-primary-button mapa-primary-link" href="https://www.instagram.com/binutricionista/" target="_blank" rel="noreferrer">Me acompanhar no Instagram</a>
        <p className="mapa-disclaimer">Esta ferramenta tem caráter educativo e não substitui uma avaliação nutricional individualizada.</p>
      </section>
    </>
  );
}
