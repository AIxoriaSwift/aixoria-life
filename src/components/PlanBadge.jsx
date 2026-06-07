import { PLAN_CONFIG } from '../data'

const PLAN_COLORS = { starter: '#60a5fa', builder: '#fbbf24', pro: '#a78bfa' }

export default function PlanBadge({ plan }) {
  const color = PLAN_COLORS[plan] || '#94a3b8'
  const cfg   = PLAN_CONFIG[plan]
  return (
    <span className="mod-plan-badge" style={{ '--bc': color }}>
      {cfg?.badge} {cfg?.name || plan}
    </span>
  )
}
