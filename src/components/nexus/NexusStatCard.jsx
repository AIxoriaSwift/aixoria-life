import { IcAgents, IcValidate, IcAlert, IcClock, IcOpportunity } from './nexusIcons'

const STAT_ICONS = {
  agents:      <IcAgents />,
  validate:    <IcValidate />,
  alert:       <IcAlert />,
  clock:       <IcClock />,
  opportunity: <IcOpportunity />,
}

function NexusStatCard({ stat }) {
  return (
    <div className={`nx-stat-card nx-stat-card--${stat.accent}`}>
      <div className="nx-stat-icon">{STAT_ICONS[stat.icon]}</div>
      <div className="nx-stat-body">
        <span className="nx-stat-value">{stat.value}</span>
        <span className="nx-stat-label">{stat.label}</span>
        <span className="nx-stat-sub">{stat.sub}</span>
      </div>
    </div>
  )
}

export default NexusStatCard
