import NexusAgentCard from '../../components/nexus/NexusAgentCard'
import { NEXUS_AGENTS } from '../../components/nexus/nexusData'

function NexusAgentsPage() {
  return (
    <>
      <section className="nx-page-head fade-in-up">
        <h1 className="nx-page-title">Agents IA</h1>
        <p className="nx-page-sub">Vue détaillée de tous vos agents déployés et de leur performance.</p>
      </section>

      <section className="nx-section fade-in-up">
        <div className="nx-agents-grid">
          {NEXUS_AGENTS.map((agent) => (
            <NexusAgentCard key={agent.id} agent={agent} showDetails />
          ))}
        </div>
      </section>
    </>
  )
}

export default NexusAgentsPage
