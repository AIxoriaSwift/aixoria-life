import { useState } from 'react'

const DAY_LABELS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

const SESSIONS = [
  { type: 'lecture',  label: 'Lecture du cours',      duration: 45, icon: '📖' },
  { type: 'practice', label: 'Exercices pratiques',   duration: 30, icon: '✏️' },
  { type: 'recall',   label: 'Active Recall',         duration: 20, icon: '🧠' },
  { type: 'review',   label: 'Révision espacée',      duration: 25, icon: '🔄' },
]

function buildPlanning(daysUntil) {
  const count = Math.min(Math.max(daysUntil, 1), 14)
  const today = new Date()
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    const isRest = i > 0 && i % 6 === 5
    const dateStr = d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })
    const dayName = DAY_LABELS[d.getDay()]
    let sessions = []
    if (!isRest) {
      if      (i === 0)     sessions = [SESSIONS[0], SESSIONS[1]]
      else if (i < 3)       sessions = [SESSIONS[0], SESSIONS[2]]
      else if (i < 7)       sessions = [SESSIONS[1], SESSIONS[2], SESSIONS[3]]
      else                  sessions = [SESSIONS[2], SESSIONS[3]]
    }
    return { date: dateStr, dayName, sessions, isRest, isToday: i === 0 }
  })
}

function StudyPlanning({ onComplete }) {
  const [subject, setSubject] = useState('')
  const [examDate, setExamDate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [planning, setPlanning] = useState(null)
  const [totalMin, setTotalMin] = useState(0)
  const [used, setUsed] = useState(false)

  const today = new Date().toISOString().split('T')[0]

  const handleGenerate = () => {
    if (!subject.trim() || !examDate) return
    setIsLoading(true)
    setPlanning(null)

    const diffDays = Math.max(1, Math.ceil(
      (new Date(examDate) - new Date()) / (1000 * 60 * 60 * 24)
    ))
    const plan = buildPlanning(diffDays)
    const minutes = plan.reduce(
      (acc, day) => acc + day.sessions.reduce((s, sess) => s + sess.duration, 0),
      0
    )

    setTimeout(() => {
      setPlanning(plan)
      setTotalMin(minutes)
      setIsLoading(false)
      const hours = Math.round(minutes / 60)
      if (!used) { onComplete(hours); setUsed(true) }
    }, 1400)
  }

  const totalHours = Math.floor(totalMin / 60)
  const remainMin = totalMin % 60

  return (
    <div className="sm-tool">
      <div className="sm-section-header">
        <div className="sm-tool-badge" style={{ '--tool-color': '#10b981' }}>📅 Planning de révision</div>
        <h2 className="sm-section-title">Planning de révision</h2>
        <p className="sm-section-subtitle">
          Générez un planning optimisé jusqu'à votre examen, avec les bonnes méthodes au bon moment.
        </p>
      </div>

      <div className="sm-input-card">
        <div className="sm-input-row">
          <div className="sm-input-group">
            <label className="sm-label" htmlFor="plan-subject">Matière à réviser</label>
            <input
              id="plan-subject"
              className="sm-input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Ex : Biologie cellulaire, Mathématiques, Histoire…"
            />
          </div>
          <div className="sm-input-group sm-input-group--narrow">
            <label className="sm-label" htmlFor="plan-date">Date de l'examen</label>
            <input
              id="plan-date"
              className="sm-input"
              type="date"
              value={examDate}
              min={today}
              onChange={(e) => setExamDate(e.target.value)}
            />
          </div>
        </div>
        <div className="sm-input-footer">
          <span />
          <button
            className="sm-generate-btn green"
            onClick={handleGenerate}
            disabled={!subject.trim() || !examDate || isLoading}
          >
            {isLoading
              ? <><span className="sm-spinner" /> Planification…</>
              : <><span>📅</span> Créer mon planning</>
            }
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="sm-loading-card">
          <div className="sm-loading-dots"><span /><span /><span /></div>
          <p>Optimisation de votre planning de révision…</p>
        </div>
      )}

      {planning && !isLoading && (
        <div className="sm-result fade-in">
          <div className="sm-planning-summary">
            <div className="sm-planning-stat">
              <span>📅</span>
              <strong>{planning.length} jours</strong>
              <small>de révision</small>
            </div>
            <div className="sm-planning-stat">
              <span>⏱️</span>
              <strong>{totalHours}h{remainMin > 0 ? `${remainMin}m` : ''}</strong>
              <small>de travail total</small>
            </div>
            <div className="sm-planning-stat">
              <span>🎯</span>
              <strong>{subject}</strong>
              <small>matière ciblée</small>
            </div>
          </div>

          <div className="sm-planning-grid">
            {planning.map((day, i) => (
              <div key={i} className={`sm-planning-day ${day.isRest ? 'rest' : ''} ${day.isToday ? 'today-highlight' : ''}`}>
                <div className="sm-planning-day-header">
                  <span className="sm-day-label">{day.dayName}</span>
                  <span className="sm-day-date">{day.date}</span>
                  {day.isToday && <span className="sm-day-badge today-b">Aujourd'hui</span>}
                  {day.isRest  && <span className="sm-day-badge rest-b">Repos</span>}
                </div>
                {day.isRest ? (
                  <p className="sm-rest-msg">😴 Journée de repos — rechargez vos batteries</p>
                ) : (
                  <ul className="sm-sessions-list">
                    {day.sessions.map((sess, si) => (
                      <li key={si} className="sm-session-item">
                        <span>{sess.icon}</span>
                        <span className="sm-session-label">{sess.label}</span>
                        <span className="sm-session-duration">{sess.duration} min</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default StudyPlanning
