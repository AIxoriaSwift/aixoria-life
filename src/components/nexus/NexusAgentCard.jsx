import { useState } from 'react'
import { IcReceptionist, IcRelance, IcContentAgent, IcCalendar, IcChevronDown } from './nexusIcons'

const AGENT_ICONS = {
  receptionist: <IcReceptionist />,
  relance:      <IcRelance />,
  content:      <IcContentAgent />,
  appointment:  <IcCalendar />,
}

const STATUS_LABELS = {
  active: 'Actif',
  review: 'À vérifier',
}

function healthColor(score) {
  if (score >= 85) return '#22c55e'
  if (score >= 60) return '#f59e0b'
  return '#ef4444'
}

function NexusAgentCard({ agent, showDetails = false }) {
  const [expanded, setExpanded] = useState(false)
  const color = healthColor(agent.health)

  return (
    <div className="nx-agent-card">
      <div className="nx-agent-top">
        <div className="nx-agent-icon">{AGENT_ICONS[agent.icon]}</div>
        <div className="nx-agent-title">
          <span className="nx-agent-name">{agent.name}</span>
          <span className={`nx-agent-status nx-agent-status--${agent.status}`}>
            <span className="nx-agent-status-dot" />
            {STATUS_LABELS[agent.status]}
          </span>
        </div>
        <div
          className="nx-agent-ring"
          style={{ '--score': agent.health, '--ring-color': color }}
        >
          <span className="nx-agent-ring-value">{agent.health}</span>
        </div>
      </div>

      <p className="nx-agent-desc">{agent.description}</p>

      <div className="nx-agent-footer">
        <span className="nx-agent-activity-label">Dernière activité</span>
        <span className="nx-agent-activity">{agent.lastActivity}</span>
      </div>

      {showDetails && (
        <>
          {expanded && (
            <div className="nx-agent-expanded">
              <div className="nx-agent-expanded-row">
                <span>Canaux</span>
                <strong>{agent.channel}</strong>
              </div>
              <div className="nx-agent-expanded-row">
                <span>Actions ce mois-ci</span>
                <strong>{agent.actionsThisMonth}</strong>
              </div>
              <div className="nx-agent-expanded-row">
                <span>Disponibilité</span>
                <strong>{agent.uptime}</strong>
              </div>
            </div>
          )}
          <button
            className="nx-agent-details-btn"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
          >
            {expanded ? 'Masquer les détails' : 'Voir détails'}
            <span className={`nx-agent-details-chevron${expanded ? ' nx-agent-details-chevron--up' : ''}`}>
              <IcChevronDown />
            </span>
          </button>
        </>
      )}
    </div>
  )
}

export default NexusAgentCard
