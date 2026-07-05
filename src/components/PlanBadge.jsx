import { PLAN_CONFIG } from '../data'

const PLAN_COLORS = {
  starter: '#60a5fa',
  builder: '#a78bfa',
  pro:     '#c4b5fd',
}

export default function PlanBadge({ plan }) {
  const color = PLAN_COLORS[plan] || '#94a3b8'
  const cfg   = PLAN_CONFIG[plan]
  return (
    <span className={`mod-plan-badge mod-plan-badge--${plan}`} style={{ '--bc': color }}>
      <span className="mpb-tier">{cfg?.badge}</span>
      <span className="mpb-name">{cfg?.name || plan}</span>
    </span>
  )
}
