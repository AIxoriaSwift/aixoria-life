import { AgentIcon } from './nexusIcons'

function NexusImpactAgentCard({ agent }) {
  return (
    <div className="nx-impact-agent-card">
      <div className="nx-impact-agent-icon"><AgentIcon icon={agent.icon} /></div>
      <div className="nx-impact-agent-body">
        <span className="nx-impact-agent-name">{agent.name}</span>
        <div className="nx-impact-agent-metrics">
          {agent.metrics.map((m) => (
            <div className="nx-impact-agent-metric" key={m.label}>
              <span className="nx-impact-agent-metric-value">{m.value}</span>
              <span className="nx-impact-agent-metric-label">{m.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NexusImpactAgentCard
