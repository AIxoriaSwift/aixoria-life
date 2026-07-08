import { Link } from 'react-router-dom'
import NexusStatCard from '../../components/nexus/NexusStatCard'
import NexusAgentCard from '../../components/nexus/NexusAgentCard'
import NexusActionCard from '../../components/nexus/NexusActionCard'
import { NEXUS_STATS, NEXUS_AGENTS, NEXUS_PENDING_ACTIONS } from '../../components/nexus/nexusData'

function NexusDashboardPage() {
  const previewActions = NEXUS_PENDING_ACTIONS.slice(0, 3)

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
