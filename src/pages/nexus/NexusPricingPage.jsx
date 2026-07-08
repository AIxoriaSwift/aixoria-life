import { IcCheck } from '../../components/nexus/nexusIcons'
import { NEXUS_PLANS } from '../../components/nexus/nexusData'

function NexusPricingPage() {
  return (
    <>
      <section className="nx-page-head fade-in-up">
        <h1 className="nx-page-title">Tarifs</h1>
        <p className="nx-page-sub">Choisissez le plan qui correspond au nombre d'agents IA que vous souhaitez piloter.</p>
      </section>

      <section className="nx-plans-grid fade-in-up">
        {NEXUS_PLANS.map((plan) => (
          <div key={plan.id} className={`nx-plan-card${plan.tag ? ' nx-plan-card--highlight' : ''}`}>
            {plan.tag && <span className="nx-plan-tag">{plan.tag}</span>}
            <span className="nx-plan-name">{plan.name}</span>
            <div className="nx-plan-price">
              <span className="nx-plan-price-value">{plan.price}</span>
              <span className="nx-plan-price-period">{plan.period}</span>
            </div>
            <p className="nx-plan-desc">{plan.description}</p>
            <ul className="nx-plan-features">
              {plan.features.map((f) => (
                <li key={f}>
                  <IcCheck size={14} />
                  {f}
                </li>
              ))}
            </ul>
            <button className={`nx-plan-cta${plan.tag ? ' nx-plan-cta--highlight' : ''}`}>
              Choisir {plan.name}
            </button>
          </div>
        ))}
      </section>

      <p className="nx-plans-note">Facturation et paiement à venir — aucun abonnement n'est activé pour le moment.</p>
    </>
  )
}

export default NexusPricingPage
