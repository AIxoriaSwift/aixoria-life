import { NavLink } from 'react-router-dom'
import {
  IcDashboard, IcAgents, IcValidate, IcImpact, IcMemory, IcAutomation, IcPricing,
} from './nexusIcons'

const NAV_ITEMS = [
  { to: '.',                label: 'Dashboard',       icon: <IcDashboard /> },
  { to: 'agents',            label: 'Agents IA',       icon: <IcAgents /> },
  { to: 'validations',       label: 'Validations',     icon: <IcValidate /> },
  { to: 'impact',            label: 'Impact',          icon: <IcImpact /> },
  { to: 'memoire',           label: 'Mémoire IA',      icon: <IcMemory /> },
  { to: 'automatisations',   label: 'Automatisations', icon: <IcAutomation /> },
  { to: 'tarifs',            label: 'Tarifs',          icon: <IcPricing /> },
]

function NexusSidebar() {
  return (
    <nav className="nx-sidebar" aria-label="Navigation AIxoria Nexus">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.label}
          to={item.to}
          end={item.to === '.'}
          className={({ isActive }) => `nx-sidebar-item${isActive ? ' nx-sidebar-item--active' : ''}`}
        >
          <span className="nx-sidebar-icon">{item.icon}</span>
          <span className="nx-sidebar-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default NexusSidebar
