import NexusValidationCard from '../../components/nexus/NexusValidationCard'
import { NEXUS_PENDING_ACTIONS } from '../../components/nexus/nexusData'

function NexusValidationsPage() {
  return (
    <>
      <section className="nx-page-head fade-in-up">
        <h1 className="nx-page-title">Validations</h1>
        <p className="nx-page-sub">Toutes les actions proposées par vos agents, en attente de votre validation.</p>
      </section>

      <section className="nx-section fade-in-up">
        <div className="nx-val-list">
          {NEXUS_PENDING_ACTIONS.map((action) => (
            <NexusValidationCard key={action.id} action={action} />
          ))}
        </div>
      </section>
    </>
  )
}

export default NexusValidationsPage
