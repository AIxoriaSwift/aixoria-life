import NexusAgentCard from '../../components/nexus/NexusAgentCard'
import NexusAgentsHealthSummary from '../../components/nexus/NexusAgentsHealthSummary'
import NexusAgentsHealthChart from '../../components/nexus/NexusAgentsHealthChart'
import { NEXUS_AGENTS } from '../../components/nexus/nexusData'

function NexusAgentsPage() {
  return (
    <>
      <section className="nx-page-head fade-in-up">
        <h1 className="nx-page-title">Agents IA</h1>
        <p className="nx-page-sub">Vue détaillée de tous vos agents déployés et de leur performance.</p>
      </section>

      <section className="nx-section fade-in-up">
        <div className="nx-section-head">
          <h2 className="nx-section-title">Santé globale des agents</h2>
        </div>
        <NexusAgentsHealthSummary agents={NEXUS_AGENTS} />
      </section>

      <section className="nx-section fade-in-up">
        <div className="nx-section-head">
          <h2 className="nx-section-title">Comparaison des scores santé</h2>
        </div>
        <NexusAgentsHealthChart agents={NEXUS_AGENTS} />
      </section>

      <section className="nx-section fade-in-up">
        <div className="nx-section-head">
          <h2 className="nx-section-title">Mes agents IA</h2>
        </div>
        <div className="nx-agents-grid nx-agents-grid--balanced">
          {NEXUS_AGENTS.map((agent) => (
            <NexusAgentCard key={agent.id} agent={agent} showDetails />
          ))}
        </div>
      </section>
    </>
  )
}

export default NexusAgentsPage
