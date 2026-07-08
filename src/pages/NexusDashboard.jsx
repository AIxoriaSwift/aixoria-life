import '../NexusDashboard.css'
import NexusHeader from '../components/nexus/NexusHeader'
import NexusStatCard from '../components/nexus/NexusStatCard'
import NexusAgentCard from '../components/nexus/NexusAgentCard'
import NexusActionCard from '../components/nexus/NexusActionCard'
import { NEXUS_STATS, NEXUS_AGENTS, NEXUS_PENDING_ACTIONS } from '../components/nexus/nexusData'

function NexusDashboard() {
  return (
    <div className="nx-page">
      <NexusHeader />

      <main className="nx-main">
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
            <span className="nx-section-sub">{NEXUS_AGENTS.length} agents déployés</span>
          </div>
          <div className="nx-agents-grid">
            {NEXUS_AGENTS.map((agent) => (
              <NexusAgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </section>

        <section className="nx-section fade-in-up">
          <div className="nx-section-head">
            <h2 className="nx-section-title">Actions à valider</h2>
            <span className="nx-section-sub">{NEXUS_PENDING_ACTIONS.length} en attente</span>
          </div>
          <div className="nx-actions-list">
            {NEXUS_PENDING_ACTIONS.map((action) => (
              <NexusActionCard key={action.id} action={action} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default NexusDashboard
