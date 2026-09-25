import type { MapaCategory, MapaQuestion } from "./mapa-data";

type QuizSectionProps = {
  questions: MapaQuestion[];
  currentIndex: number;
  answers: Array<MapaCategory | null>;
  onSelect: (category: MapaCategory) => void;
  onBack: () => void;
};

export function QuizSection({ questions, currentIndex, answers, onSelect, onBack }: QuizSectionProps) {
  const question = questions[currentIndex];
  const selectedCategory = answers[currentIndex];

  return (
    <section className="mapa-container">
      <div className="mapa-progress-row">
        <div className="mapa-progress-track">
          <div className="mapa-progress-fill" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
        </div>
        <span className="mapa-progress-label">{currentIndex + 1} de {questions.length}</span>
      </div>
      <div className="mapa-fade" key={currentIndex}>
        <h2 className="mapa-question-title">{question.title}</h2>
        {question.support ? <p className="mapa-question-support">{question.support}</p> : null}
        <div className="mapa-options">
          {question.options.map((option) => {
            const selected = selectedCategory === option.category;
            return (
              <button
                key={option.category}
                type="button"
                aria-pressed={selected}
                className={`mapa-option-card${selected ? " is-selected" : ""}`}
                onClick={() => onSelect(option.category)}
              >
                {option.text}
              </button>
            );
          })}
        </div>
      </div>
      {currentIndex > 0 ? (
        <button type="button" className="mapa-text-button mapa-quiz-back" onClick={onBack}>
          Voltar
        </button>
      ) : null}
    </section>
  );
}
