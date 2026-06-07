import { useState } from 'react'

const SIMULATED_CARDS = [
  {
    question: "Qu'est-ce que la mitose ?",
    answer: "Division cellulaire produisant deux cellules filles génétiquement identiques à la cellule mère (2n → 2n).",
  },
  {
    question: "Définir l'ADN",
    answer: "Acide désoxyribonucléique : macromolécule en double hélice portant l'information génétique de l'organisme.",
  },
  {
    question: "Qu'est-ce qu'un gène ?",
    answer: "Séquence d'ADN codant pour une protéine ou un ARN fonctionnel. C'est l'unité de base de l'hérédité.",
  },
  {
    question: "Rôle des ribosomes",
    answer: "Organites cellulaires responsables de la synthèse des protéines par traduction de l'ARNm en séquence d'acides aminés.",
  },
  {
    question: "Différence méiose / mitose",
    answer: "La méiose produit 4 cellules haploïdes (n) pour la reproduction sexuée ; la mitose produit 2 cellules diploïdes (2n) identiques.",
  },
]

function FlipCard({ card, index }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <div
      className={`sm-flip-card ${flipped ? 'flipped' : ''}`}
      onClick={() => setFlipped(!flipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setFlipped(!flipped)}
      aria-label={flipped ? `Réponse : ${card.answer}` : `Question ${index + 1} : ${card.question}`}
    >
      <div className="sm-flip-inner">
        <div className="sm-flip-front">
          <span className="sm-card-num">Q{index + 1}</span>
          <p>{card.question}</p>
          <span className="sm-flip-hint">Cliquer pour révéler →</span>
        </div>
        <div className="sm-flip-back">
          <span className="sm-card-num answer">✓ Réponse</span>
          <p>{card.answer}</p>
          <span className="sm-flip-hint">Cliquer pour cacher ←</span>
        </div>
      </div>
    </div>
  )
}

function StudyFlashcards({ onComplete }) {
  const [theme, setTheme] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [cards, setCards] = useState(null)
  const [used, setUsed] = useState(false)

  const handleGenerate = () => {
    if (!theme.trim()) return
    setIsLoading(true)
    setCards(null)
    setTimeout(() => {
      setCards(SIMULATED_CARDS)
      setIsLoading(false)
      if (!used) { onComplete(SIMULATED_CARDS.length); setUsed(true) }
    }, 1300)
  }

  return (
    <div className="sm-tool">
      <div className="sm-section-header">
        <div className="sm-tool-badge" style={{ '--tool-color': '#8b5cf6' }}>🗃️ Fiches de révision</div>
        <h2 className="sm-section-title">Fiches de révision</h2>
        <p className="sm-section-subtitle">
          Entrez un thème et obtenez des fiches question/réponse interactives. Cliquez sur une fiche pour révéler la réponse.
        </p>
      </div>

      <div className="sm-input-card">
        <label className="sm-label" htmlFor="flashcard-theme">Thème ou chapitre</label>
        <input
          id="flashcard-theme"
          className="sm-input"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          placeholder="Ex : La cellule, La Révolution française, Les équations du second degré…"
        />
        <div className="sm-input-footer">
          <span />
          <button
            className="sm-generate-btn purple"
            onClick={handleGenerate}
            disabled={!theme.trim() || isLoading}
          >
            {isLoading
              ? <><span className="sm-spinner" /> Création des fiches…</>
              : <><span>🗃️</span> Créer des fiches</>
            }
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="sm-loading-card">
          <div className="sm-loading-dots"><span /><span /><span /></div>
          <p>Génération de vos fiches de révision…</p>
        </div>
      )}

      {cards && !isLoading && (
        <div className="sm-result fade-in">
          <p className="sm-result-info">
            {cards.length} fiches générées sur <strong style={{ color: 'var(--purple-light)' }}>{theme}</strong> · Cliquez pour retourner
          </p>
          <div className="sm-cards-grid">
            {cards.map((card, i) => <FlipCard key={i} card={card} index={i} />)}
          </div>
        </div>
      )}
    </div>
  )
}

export default StudyFlashcards
