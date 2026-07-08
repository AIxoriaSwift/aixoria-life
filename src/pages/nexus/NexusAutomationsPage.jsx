import NexusAutomationRow from '../../components/nexus/NexusAutomationRow'
import { NEXUS_AUTOMATIONS } from '../../components/nexus/nexusData'

function NexusAutomationsPage() {
  const okCount = NEXUS_AUTOMATIONS.filter((w) => w.status === 'ok').length

  return (
    <>
      <section className="nx-page-head fade-in-up">
        <h1 className="nx-page-title">Automatisations</h1>
        <p className="nx-page-sub">Les workflows connectés qui alimentent vos agents IA.</p>
      </section>

      <section className="nx-section fade-in-up">
        <div className="nx-section-head">
          <h2 className="nx-section-title">Workflows connectés</h2>
          <span className="nx-section-sub">{okCount} / {NEXUS_AUTOMATIONS.length} opérationnels</span>
        </div>

        <div className="nx-auto-list">
          {NEXUS_AUTOMATIONS.map((w) => (
            <NexusAutomationRow key={w.id} workflow={w} />
          ))}
        </div>
      </section>
    </>
  )
}

export default NexusAutomationsPage
