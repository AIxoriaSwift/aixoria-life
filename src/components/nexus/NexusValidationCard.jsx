import { useState } from 'react'
import { IcCalendar, IcStar, IcMessage, IcCheck, IcEdit, IcRefuse } from './nexusIcons'

const TYPE_ICONS = {
  relance: <IcMessage />,
  avis:    <IcStar />,
  rdv:     <IcCalendar />,
}

const TYPE_LABELS = {
  relance: 'Relance client',
  avis:    'Réponse à un avis',
  rdv:     'Rendez-vous',
}

function NexusValidationCard({ action }) {
  const [status, setStatus] = useState(null) // null | 'validated' | 'refused'
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(action.message)

  if (status === 'validated') {
    return (
      <div className="nx-val-card nx-val-card--validated">
        <div className="nx-val-result">
          <IcCheck size={16} />
          <span>Action validée et envoyée</span>
        </div>
      </div>
    )
  }
  if (status === 'refused') {
    return (
      <div className="nx-val-card nx-val-card--refused">
        <div className="nx-val-result">
          <IcRefuse size={16} />
          <span>Action refusée</span>
        </div>
      </div>
    )
  }

  return (
    <div className="nx-val-card">
      <div className="nx-val-head">
        <div className="nx-val-icon">{TYPE_ICONS[action.type]}</div>
        <div className="nx-val-head-text">
          <span className="nx-val-type">{TYPE_LABELS[action.type]}</span>
          <span className="nx-val-title">{action.title}</span>
        </div>
        <span className="nx-val-time">{action.time}</span>
      </div>

      <span className="nx-val-agent">Proposé par {action.agent}</span>

      <div className="nx-val-message">
        <span className="nx-val-message-label">Message proposé</span>
        {editing ? (
          <textarea
            className="nx-val-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
          />
        ) : (
          <p className="nx-val-message-text">{text}</p>
        )}
      </div>

      <div className="nx-val-buttons">
        {editing ? (
          <button className="nx-action-btn nx-action-btn--primary" onClick={() => setEditing(false)}>
            <IcCheck />
            Enregistrer
          </button>
        ) : (
          <>
            <button className="nx-action-btn nx-action-btn--primary" onClick={() => setStatus('validated')}>
              <IcCheck />
              Valider
            </button>
            <button className="nx-action-btn nx-action-btn--ghost" onClick={() => setEditing(true)}>
              <IcEdit />
              Modifier
            </button>
            <button className="nx-action-btn nx-action-btn--danger" onClick={() => setStatus('refused')}>
              <IcRefuse />
              Refuser
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default NexusValidationCard
