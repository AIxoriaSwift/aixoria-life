import { useState } from 'react'

const LEVELS = ['Facile', 'Moyen', 'Difficile']

const SIMULATED_QUESTIONS = [
  {
    question: "Quelle est la formule chimique du glucose ?",
    options: ["C₆H₁₂O₆", "C₁₂H₂₂O₁₁", "CH₄O", "C₂H₅OH"],
    correct: 0,
    explanation: "Le glucose est un monosaccharide de formule C₆H₁₂O₆, produit final de la photosynthèse.",
  },
  {
    question: "Dans quel organite se déroule la photosynthèse ?",
    options: ["Mitochondrie", "Ribosome", "Chloroplaste", "Noyau"],
    correct: 2,
    explanation: "La photosynthèse se déroule dans les chloroplastes, qui contiennent la chlorophylle.",
  },
  {
    question: "Combien de chromosomes possède une cellule humaine diploïde ?",
    options: ["23", "46", "48", "92"],
    correct: 1,
    explanation: "Les cellules somatiques humaines possèdent 46 chromosomes (23 paires homologues).",
  },
  {
    question: "Quelle molécule est le principal vecteur d'énergie cellulaire ?",
    options: ["ARN", "ADN", "ATP", "ADP"],
    correct: 2,
    explanation: "L'ATP (Adénosine TriPhosphate) est la principale molécule de stockage et transfert d'énergie cellulaire.",
  },
  {
    question: "Quel organite contient la majorité de l'ADN cellulaire ?",
    options: ["Chloroplaste", "Ribosome", "Appareil de Golgi", "Noyau"],
    correct: 3,
    explanation: "La quasi-totalité de l'ADN se trouve dans le noyau, protégé par la membrane nucléaire.",
  },
]

function StudyQuiz({ onComplete }) {
  const [subject, setSubject] = useState('')
  const [difficulty, setDifficulty] = useState('Moyen')
  const [isLoading, setIsLoading] = useState(false)
  const [questions, setQuestions] = useState(null)
  const [selected, setSelected] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [used, setUsed] = useState(false)

  const handleGenerate = () => {
    if (!subject.trim()) return
    setIsLoading(true)
    setQuestions(null)
    setSelected({})
    setSubmitted(false)
    setTimeout(() => {
      setQuestions(SIMULATED_QUESTIONS)
      setIsLoading(false)
      if (!used) { onComplete(); setUsed(true) }
    }, 1500)
  }

  const handleSelect = (qIndex, optIndex) => {
    if (submitted) return
    setSelected((prev) => ({ ...prev, [qIndex]: optIndex }))
  }

  const handleSubmit = () => {
    if (Object.keys(selected).length < questions.length) return
    setSubmitted(true)
  }

  const score = submitted
    ? questions.filter((q, i) => selected[i] === q.correct).length
    : 0

  const answeredCount = Object.keys(selected).length
  const totalCount = questions?.length ?? 0

  return (
    <div className="sm-tool">
      <div className="sm-section-header">
        <div className="sm-tool-badge" style={{ '--tool-color': '#06b6d4' }}>❓ Quiz intelligent</div>
        <h2 className="sm-section-title">Quiz intelligent</h2>
        <p className="sm-section-subtitle">
          Testez vos connaissances avec un quiz personnalisé selon votre sujet et votre niveau.
        </p>
      </div>

      <div className="sm-input-card">
        <div className="sm-input-row">
          <div className="sm-input-group">
            <label className="sm-label" htmlFor="quiz-subject">Sujet du quiz</label>
            <input
              id="quiz-subject"
              className="sm-input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ex : Photosynthèse, Guerre de 1914, Théorème de Pythagore…"
              onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>
          <div className="sm-input-group sm-input-group--narrow">
            <label className="sm-label">Niveau</label>
            <div className="sm-difficulty-selector">
              {LEVELS.map((level) => (
                <button
                  key={level}
                  className={`sm-diff-btn ${difficulty === level ? 'active' : ''} diff-${level.toLowerCase()}`}
                  onClick={() => setDifficulty(level)}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="sm-input-footer">
          <span />
          <button
            className="sm-generate-btn cyan"
            onClick={handleGenerate}
            disabled={!subject.trim() || isLoading}
          >
            {isLoading
              ? <><span className="sm-spinner" /> Génération…</>
              : <><span>⚡</span> Générer le quiz</>
            }
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="sm-loading-card">
          <div className="sm-loading-dots"><span /><span /><span /></div>
          <p>Création de votre quiz niveau {difficulty.toLowerCase()}…</p>
        </div>
      )}

      {questions && !isLoading && (
        <div className="sm-result fade-in">
          {submitted && (
            <div className={`sm-score-banner ${score >= 4 ? 'great' : score >= 3 ? 'ok' : 'low'}`}>
              <span className="sm-score-icon">{score >= 4 ? '🏆' : score >= 3 ? '👍' : '💪'}</span>
              <div>
                <strong>{score}/{questions.length} bonnes réponses</strong>
                <p>{score >= 4 ? 'Excellent travail !' : score >= 3 ? 'Bonne progression !' : 'Continuez à réviser !'}</p>
              </div>
            </div>
          )}

          <div className="sm-quiz-list">
            {questions.map((q, qi) => (
              <div
                key={qi}
                className={`sm-quiz-question ${submitted ? (selected[qi] === q.correct ? 'correct' : 'wrong') : ''}`}
              >
                <p className="sm-quiz-q-text">
                  <span className="sm-quiz-num">Q{qi + 1}</span>
                  {q.question}
                </p>
                <div className="sm-quiz-options">
                  {q.options.map((opt, oi) => (
                    <button
                      key={oi}
                      className={[
                        'sm-quiz-opt',
                        selected[qi] === oi && !submitted ? 'selected' : '',
                        submitted && oi === q.correct ? 'correct' : '',
                        submitted && selected[qi] === oi && oi !== q.correct ? 'wrong' : '',
                      ].join(' ')}
                      onClick={() => handleSelect(qi, oi)}
                      disabled={submitted}
                    >
                      <span className="sm-opt-letter">{String.fromCharCode(65 + oi)}</span>
                      {opt}
                    </button>
                  ))}
                </div>
                {submitted && (
                  <p className="sm-quiz-explanation">💡 {q.explanation}</p>
                )}
              </div>
            ))}
          </div>

          {!submitted && (
            <button
              className="sm-generate-btn cyan sm-submit-btn"
              onClick={handleSubmit}
              disabled={answeredCount < totalCount}
            >
              Valider mes réponses ({answeredCount}/{totalCount})
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default StudyQuiz
