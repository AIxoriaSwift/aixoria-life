const STATS_CONFIG = [
  { key: 'summarized', label: 'Cours résumés',            icon: '📝', color: '#3b82f6' },
  { key: 'flashcards', label: 'Fiches créées',            icon: '🗃️', color: '#8b5cf6' },
  { key: 'quizzes',    label: 'Quiz générés',             icon: '❓', color: '#06b6d4' },
  { key: 'hours',      label: 'Heures planifiées',        icon: '⏱️', color: '#10b981' },
]

const METHODS = [
  {
    icon: '🧠',
    title: 'Active Recall',
    description: "Testez-vous régulièrement plutôt que de relire passivement. Cette méthode renforce les connexions neuronales et améliore la mémorisation à long terme de 50%.",
    tips: ['Fermez vos notes et reformulez', 'Utilisez des flashcards', 'Expliquez à voix haute'],
    color: '#3b82f6',
  },
  {
    icon: '🍅',
    title: 'Méthode Pomodoro',
    description: "Travaillez 25 minutes en pleine concentration, puis faites une pause de 5 minutes. Après 4 cycles, prenez une pause longue de 15 à 30 minutes.",
    tips: ['25 min de travail concentré', '5 min de pause courte', '15–30 min après 4 cycles'],
    color: '#f59e0b',
  },
  {
    icon: '📈',
    title: 'Révision Espacée',
    description: "Révisez à des intervalles croissants : J+1, J+3, J+7, J+14. La mémoire se consolide chaque fois que vous récupérez l'information juste avant de l'oublier.",
    tips: ['Révisez à J+1, J+3, J+7', 'Puis à J+14 et J+30', 'Utilisez un planning dédié'],
    color: '#10b981',
  },
]

const QUICK_ACTIONS = [
  { tab: 'summarize',  icon: '📝', label: 'Résumer un cours' },
  { tab: 'flashcards', icon: '🗃️', label: 'Créer des fiches' },
  { tab: 'quiz',       icon: '❓', label: 'Lancer un quiz' },
  { tab: 'planning',   icon: '📅', label: 'Planifier mes révisions' },
]

function StudyDashboard({ stats, onNavigate }) {
  return (
    <div className="sm-dashboard">
      <div className="sm-section-header">
        <h2 className="sm-section-title">AI Study</h2>
        <p className="sm-section-subtitle">
          Votre assistant intelligent pour apprendre plus vite, mieux réviser et rester organisé.
        </p>
      </div>

      {/* Stats */}
      <div className="sm-stats-grid">
        {STATS_CONFIG.map(({ key, label, icon, color }) => (
          <div key={key} className="sm-stat-card" style={{ '--stat-color': color }}>
            <div className="sm-stat-icon">{icon}</div>
            <div className="sm-stat-value">{stats[key]}</div>
            <div className="sm-stat-label">{label}</div>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="sm-quick-actions">
        <h3 className="sm-subsection-title">Démarrer rapidement</h3>
        <div className="sm-actions-grid">
          {QUICK_ACTIONS.map(({ tab, icon, label }) => (
            <button key={tab} className="sm-action-btn" onClick={() => onNavigate(tab)}>
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Methods */}
      <div className="sm-methods">
        <h3 className="sm-subsection-title">Méthodes de travail recommandées</h3>
        <div className="sm-methods-grid">
          {METHODS.map((method) => (
            <div key={method.title} className="sm-method-card" style={{ '--method-color': method.color }}>
              <div className="sm-method-top">
                <span className="sm-method-icon">{method.icon}</span>
                <div className="sm-method-glow" aria-hidden="true" />
              </div>
              <h4 className="sm-method-title">{method.title}</h4>
              <p className="sm-method-desc">{method.description}</p>
              <ul className="sm-method-tips">
                {method.tips.map((tip) => <li key={tip}>{tip}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StudyDashboard
