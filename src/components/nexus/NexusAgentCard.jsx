import { IcReceptionist, IcRelance, IcContentAgent } from './nexusIcons'

const AGENT_ICONS = {
  receptionist: <IcReceptionist />,
  relance:      <IcRelance />,
  content:      <IcContentAgent />,
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

function NexusAgentCard({ agent }) {
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
    </div>
  )
}

export default NexusAgentCard
