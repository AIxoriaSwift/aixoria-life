import { healthColor } from './nexusHelpers'

function NexusAgentsHealthSummary({ agents }) {
  const avg = Math.round(agents.reduce((sum, a) => sum + a.health, 0) / agents.length)
  const active = agents.filter((a) => a.status === 'active').length
  const review = agents.filter((a) => a.status === 'review').length
  const error = agents.filter((a) => a.status === 'error').length
  const color = healthColor(avg)

  return (
    <div className="nx-health-card">
      <div className="nx-health-score">
        <div className="nx-health-ring" style={{ '--score': avg, '--ring-color': color }}>
          <span className="nx-health-ring-value">{avg}</span>
        </div>
        <span className="nx-health-score-label">Score moyen</span>
      </div>

      <div className="nx-health-divider" aria-hidden="true" />

      <div className="nx-health-counts">
        <div className="nx-health-count nx-health-count--active">
          <span className="nx-health-count-value">{active}</span>
          <span className="nx-health-count-label">Actifs</span>
        </div>
        <div className="nx-health-count nx-health-count--review">
          <span className="nx-health-count-value">{review}</span>
          <span className="nx-health-count-label">À vérifier</span>
        </div>
        <div className="nx-health-count nx-health-count--error">
          <span className="nx-health-count-value">{error}</span>
          <span className="nx-health-count-label">En erreur</span>
        </div>
      </div>
    </div>
  )
}

export default NexusAgentsHealthSummary
