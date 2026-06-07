import { useState } from 'react'

const SIMULATED_RESULT = {
  summary:
    "La photosynthèse est le processus fondamental par lequel les organismes autotrophes convertissent l'énergie lumineuse en énergie chimique. Ce mécanisme se déroule dans les chloroplastes, organites spécialisés contenant de la chlorophylle, un pigment absorbant la lumière visible. La réaction globale transforme le dioxyde de carbone et l'eau en glucose et en dioxygène, assurant ainsi la base de toute la chaîne alimentaire sur Terre.",
  keyPoints: [
    "Conversion de l'énergie lumineuse en énergie chimique (glucose C₆H₁₂O₆)",
    "Se déroule dans les chloroplastes grâce à la chlorophylle",
    "Libération d'O₂ comme sous-produit de la photolyse de l'eau",
    "Deux phases : phase claire (réactions lumineuses) et cycle de Calvin (phase sombre)",
    "Équation bilan : 6CO₂ + 6H₂O + lumière → C₆H₁₂O₆ + 6O₂",
  ],
  importantNotions: [
    { term: "Chlorophylle",    def: "Pigment vert absorbant principalement la lumière rouge et bleue" },
    { term: "ATP & NADPH",    def: "Molécules énergétiques produites lors de la phase lumineuse" },
    { term: "Cycle de Calvin", def: "Phase sombre utilisant le CO₂ pour synthétiser le glucose" },
    { term: "Photolyse",       def: "Décomposition de l'eau sous l'effet de la lumière, libérant O₂" },
  ],
}

function StudySummarize({ onComplete }) {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [used, setUsed] = useState(false)

  const handleGenerate = () => {
    if (!text.trim()) return
    setIsLoading(true)
    setResult(null)
    setTimeout(() => {
      setResult(SIMULATED_RESULT)
      setIsLoading(false)
      if (!used) { onComplete(); setUsed(true) }
    }, 1400)
  }

  return (
    <div className="sm-tool">
      <div className="sm-section-header">
        <div className="sm-tool-badge" style={{ '--tool-color': '#3b82f6' }}>📝 Résumer un cours</div>
        <h2 className="sm-section-title">Résumer un cours</h2>
        <p className="sm-section-subtitle">
          Collez le texte de votre cours ci-dessous et obtenez un résumé structuré avec les points essentiels.
        </p>
      </div>

      <div className="sm-input-card">
        <label className="sm-label" htmlFor="course-text">Votre cours</label>
        <textarea
          id="course-text"
          className="sm-textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Collez ici le texte de votre cours, chapitre ou document à résumer…"
          rows={8}
        />
        <div className="sm-input-footer">
          <span className="sm-char-count">{text.length} caractères</span>
          <button
            className="sm-generate-btn"
            onClick={handleGenerate}
            disabled={!text.trim() || isLoading}
          >
            {isLoading
              ? <><span className="sm-spinner" /> Génération en cours…</>
              : <><span>✨</span> Générer un résumé</>
            }
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="sm-loading-card">
          <div className="sm-loading-dots"><span /><span /><span /></div>
          <p>L'IA analyse votre cours…</p>
        </div>
      )}

      {result && !isLoading && (
        <div className="sm-result fade-in">
          <div className="sm-result-block">
            <h3>📄 Résumé</h3>
            <p>{result.summary}</p>
          </div>
          <div className="sm-result-block">
            <h3>🎯 Points clés</h3>
            <ul className="sm-key-points">
              {result.keyPoints.map((pt, i) => <li key={i}>{pt}</li>)}
            </ul>
          </div>
          <div className="sm-result-block">
            <h3>💡 Notions importantes à retenir</h3>
            <div className="sm-notions-grid">
              {result.importantNotions.map(({ term, def }) => (
                <div key={term} className="sm-notion-card">
                  <span className="sm-notion-term">{term}</span>
                  <p className="sm-notion-def">{def}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StudySummarize
