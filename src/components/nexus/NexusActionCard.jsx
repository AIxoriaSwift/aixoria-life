import { useState } from 'react'
import { IcCalendar, IcStar, IcMessage, IcCheck, IcEdit } from './nexusIcons'

const TYPE_ICONS = {
  relance: <IcMessage />,
  avis:    <IcStar />,
  rdv:     <IcCalendar />,
}

function NexusActionCard({ action }) {
  const [validated, setValidated] = useState(false)

  return (
    <div className={`nx-action-card${validated ? ' nx-action-card--validated' : ''}`}>
      <div className="nx-action-icon">{TYPE_ICONS[action.type]}</div>

      <div className="nx-action-body">
        <div className="nx-action-head">
          <span className="nx-action-title">{action.title}</span>
          <span className="nx-action-time">{action.time}</span>
        </div>
        <p className="nx-action-desc">{action.description}</p>
        <span className="nx-action-agent">Proposé par {action.agent}</span>
      </div>

      {validated ? (
        <div className="nx-action-done">
          <IcCheck size={14} />
          Validé
        </div>
      ) : (
        <div className="nx-action-buttons">
          <button className="nx-action-btn nx-action-btn--primary" onClick={() => setValidated(true)}>
            <IcCheck />
            Valider
          </button>
          <button className="nx-action-btn nx-action-btn--ghost">
            <IcEdit />
            Modifier
          </button>
        </div>
      )}
    </div>
  )
}

export default NexusActionCard
