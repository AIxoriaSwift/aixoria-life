import { useState } from 'react'
import {
  IcReceptionist, IcRelance, IcContentAgent, IcCalendar, IcChevronDown,
  IcServices, IcMemory, IcRule, IcClockSettings, IcOpportunity, IcAlert,
} from './nexusIcons'
import { healthColor } from './nexusHelpers'

const AGENT_ICONS = {
  receptionist: <IcReceptionist />,
  relance:      <IcRelance />,
  content:      <IcContentAgent />,
  appointment:  <IcCalendar />,
}

const STATUS_LABELS = {
  active: 'Actif',
  review: 'À vérifier',
  error:  'Erreur',
}

function NexusAgentCard({ agent, showDetails = false }) {
  const [expanded, setExpanded] = useState(false)
  const color = healthColor(agent.health)
  const isError = agent.status === 'error'

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

      {showDetails && (
        <div className="nx-agent-metrics">
          <div className="nx-agent-metrics-row">
            <div className="nx-agent-metric">
              <span className="nx-agent-metric-value">{agent.actionsThisMonth}</span>
              <span className="nx-agent-metric-label">Actions ce mois</span>
            </div>
            <div className="nx-agent-metric">
              <span className="nx-agent-metric-value">{agent.pendingActionsCount}</span>
              <span className="nx-agent-metric-label">À valider</span>
            </div>
            <div className={`nx-agent-metric${agent.recentErrors.length ? ' nx-agent-metric--warn' : ''}`}>
              <span className="nx-agent-metric-value">{agent.recentErrors.length}</span>
              <span className="nx-agent-metric-label">Erreurs récentes</span>
            </div>
          </div>
          <div className="nx-agent-impact-strip">
            <IcOpportunity size={15} />
            <span className="nx-agent-impact-label">Impact estimé</span>
            <span className="nx-agent-impact-text">{agent.estimatedImpact}</span>
          </div>
        </div>
      )}

      <div className="nx-agent-footer">
        <span className="nx-agent-activity-label">Dernière activité</span>
        <span className="nx-agent-activity">{agent.lastActivity}</span>
      </div>

      {showDetails && (
        <>
          {expanded && (
            <div className="nx-agent-expanded">
              <div className="nx-agent-expanded-block">
                <span className="nx-agent-expanded-title">Mission</span>
                <p className="nx-agent-expanded-text">{agent.mission}</p>
              </div>

              <div className="nx-agent-expanded-block">
                <span className="nx-agent-expanded-title">
                  <IcServices size={13} /> Canaux connectés
                </span>
                <div className="nx-agent-expanded-tags">
                  {agent.channel.split(' · ').map((c) => (
                    <span className="nx-agent-expanded-tag" key={c}>{c}</span>
                  ))}
                </div>
              </div>

              <div className="nx-agent-expanded-block">
                <span className="nx-agent-expanded-title">
                  <IcMemory size={13} /> Mémoire utilisée
                </span>
                <div className="nx-agent-expanded-tags">
                  {agent.memoryUsed.map((m) => (
                    <span className="nx-agent-expanded-tag nx-agent-expanded-tag--memory" key={m}>{m}</span>
                  ))}
                </div>
              </div>

              <div className="nx-agent-expanded-block">
                <span className="nx-agent-expanded-title">
                  <IcRule size={13} /> Règles importantes
                </span>
                <ul className="nx-agent-expanded-list">
                  {agent.rules.map((r) => <li key={r}>{r}</li>)}
                </ul>
              </div>

              <div className="nx-agent-expanded-block">
                <span className="nx-agent-expanded-title">
                  <IcClockSettings size={13} /> Dernières actions
                </span>
                <ul className="nx-agent-timeline">
                  {agent.recentActionsList.map((a) => (
                    <li key={a.text}>
                      <span className="nx-agent-timeline-dot" />
                      <span className="nx-agent-timeline-text">{a.text}</span>
                      <span className="nx-agent-timeline-time">{a.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`nx-agent-expanded-block nx-agent-expanded-block--reco${isError ? ' nx-agent-expanded-block--reco-alert' : ''}`}>
                <span className="nx-agent-expanded-title">
                  {isError && <IcAlert size={13} />}
                  Recommandations d'amélioration
                </span>
                <ul className="nx-agent-expanded-list nx-agent-expanded-list--reco">
                  {agent.recommendations.map((r) => <li key={r}>{r}</li>)}
                </ul>
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
