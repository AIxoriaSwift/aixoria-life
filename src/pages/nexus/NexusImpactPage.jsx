import NexusStatCard from '../../components/nexus/NexusStatCard'
import NexusImpactChart from '../../components/nexus/NexusImpactChart'
import NexusImpactAgentCard from '../../components/nexus/NexusImpactAgentCard'
import NexusAvoidedCard from '../../components/nexus/NexusAvoidedCard'
import {
  NEXUS_IMPACT_STATS, NEXUS_IMPACT_SUMMARY, NEXUS_IMPACT_DAILY,
  NEXUS_IMPACT_BY_AGENT, NEXUS_IMPACT_AVOIDED,
} from '../../components/nexus/nexusData'

function NexusImpactPage() {
  const s = NEXUS_IMPACT_SUMMARY

  return (
    <>
      <section className="nx-page-head fade-in-up">
        <h1 className="nx-page-title">Impact business de vos agents IA</h1>
        <p className="nx-page-sub">Ce que vos agents IA vous font gagner, semaine après semaine.</p>
      </section>

      <section className="nx-impact-summary fade-in-up">
        <p className="nx-impact-summary-text">
          Ce mois-ci, vos agents IA ont économisé <strong>{s.hours}</strong>, traité <strong>{s.requests} demandes</strong> et détecté <strong>{s.opportunities} {s.currency}</strong> d'opportunités estimées.
        </p>
      </section>

      <section className="nx-stats-grid fade-in-up" aria-label="Statistiques d'impact">
        {NEXUS_IMPACT_STATS.map((stat) => (
          <NexusStatCard key={stat.id} stat={stat} />
        ))}
      </section>

      <section className="nx-section fade-in-up">
        <div className="nx-section-head">
          <h2 className="nx-section-title">Évolution sur 7 jours</h2>
          <span className="nx-section-sub">Demandes traitées &amp; validations</span>
        </div>
        <NexusImpactChart data={NEXUS_IMPACT_DAILY} />
      </section>

      <section className="nx-section fade-in-up">
        <div className="nx-section-head">
          <h2 className="nx-section-title">Impact par agent</h2>
        </div>
        <div className="nx-impact-agents-grid">
          {NEXUS_IMPACT_BY_AGENT.map((agent) => (
            <NexusImpactAgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </section>

      <section className="nx-section fade-in-up">
        <div className="nx-section-head">
          <h2 className="nx-section-title">Ce que Nexus a évité</h2>
          <span className="nx-section-sub">Sur les 7 derniers jours</span>
        </div>
        <div className="nx-avoided-grid">
          {NEXUS_IMPACT_AVOIDED.map((item) => (
            <NexusAvoidedCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </>
  )
}

export default NexusImpactPage
