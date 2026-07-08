import { healthColor } from './nexusHelpers'

function NexusAgentsHealthChart({ agents }) {
  return (
    <div className="nx-health-chart-card">
      <div className="nx-health-chart" role="img" aria-label="Comparaison des scores santé par agent">
        {agents.map((agent) => {
          const color = healthColor(agent.health)
          return (
            <div className="nx-health-chart-row" key={agent.id}>
              <span className="nx-health-chart-label">{agent.name}</span>
              <div className="nx-health-chart-track">
                <div
                  className="nx-health-chart-bar"
                  style={{ width: `${agent.health}%`, background: color }}
                />
              </div>
              <span className="nx-health-chart-value" style={{ color }}>{agent.health}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default NexusAgentsHealthChart
