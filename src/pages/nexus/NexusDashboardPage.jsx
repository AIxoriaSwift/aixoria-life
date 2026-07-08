import { Link } from 'react-router-dom'
import NexusStatCard from '../../components/nexus/NexusStatCard'
import NexusAgentCard from '../../components/nexus/NexusAgentCard'
import NexusActionCard from '../../components/nexus/NexusActionCard'
import NexusMountainChart from '../../components/nexus/NexusMountainChart'
import {
  NEXUS_STATS, NEXUS_AGENTS, NEXUS_PENDING_ACTIONS,
  NEXUS_GLOBAL_TREND, NEXUS_GLOBAL_TREND_DELTA, NEXUS_IMPACT_STATS,
} from '../../components/nexus/nexusData'

const MINI_METRIC_IDS = ['requests', 'validated', 'opportunity']

function NexusDashboardPage() {
  const previewActions = NEXUS_PENDING_ACTIONS.slice(0, 3)
  const miniMetrics = MINI_METRIC_IDS
    .map((id) => NEXUS_IMPACT_STATS.find((s) => s.id === id))
    .filter(Boolean)
    .map((s) => ({ label: s.label, value: s.value }))

  return (
    <>
      <section className="nx-promise fade-in-up">
        <p className="nx-promise-text">
          AIxoria Swift construit vos agents IA. <strong>AIxoria Nexus</strong> les centralise, les pilote et mesure leur impact.
        </p>
      </section>

      <section className="nx-stats-grid fade-in-up" aria-label="Statistiques">
        {NEXUS_STATS.map((stat) => (
          <NexusStatCard key={stat.id} stat={stat} />
        ))}
      </section>

      <section className="nx-section fade-in-up">
        <div className="nx-section-head nx-section-head--stacked">
          <h2 className="nx-section-title">Vue globale Nexus</h2>
          <span className="nx-section-sub">Activité, validations et opportunités estimées sur les 30 derniers jours.</span>
        </div>
        <NexusMountainChart
          data={NEXUS_GLOBAL_TREND}
          deltaLabel={NEXUS_GLOBAL_TREND_DELTA}
          metrics={miniMetrics}
        />
      </section>

      <section className="nx-section fade-in-up">
        <div className="nx-section-head">
          <h2 className="nx-section-title">Mes agents IA</h2>
          <Link to="agents" className="nx-section-link">Voir tous les agents →</Link>
        </div>
        <div className="nx-agents-grid">
          {NEXUS_AGENTS.slice(0, 3).map((agent) => (
            <NexusAgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>

      <section className="nx-section fade-in-up">
        <div className="nx-section-head">
          <h2 className="nx-section-title">Actions à valider</h2>
          <Link to="validations" className="nx-section-link">Voir tout →</Link>
        </div>
        <div className="nx-actions-list">
          {previewActions.map((action) => (
            <NexusActionCard key={action.id} action={action} />
          ))}
        </div>
      </section>
    </>
  )
}

export default NexusDashboardPage
