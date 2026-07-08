import { IcShieldCheck, IcAlert, IcClock } from './nexusIcons'

const AVOIDED_ICONS = {
  shield: <IcShieldCheck />,
  alert:  <IcAlert />,
  clock:  <IcClock />,
}

function NexusAvoidedCard({ item }) {
  return (
    <div className={`nx-avoided-card nx-avoided-card--${item.icon}`}>
      <div className="nx-avoided-icon">{AVOIDED_ICONS[item.icon]}</div>
      <span className="nx-avoided-count">{item.count}</span>
      <p className="nx-avoided-text">{item.text}</p>
    </div>
  )
}

export default NexusAvoidedCard
