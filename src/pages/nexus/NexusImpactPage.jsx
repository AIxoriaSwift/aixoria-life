import NexusStatCard from '../../components/nexus/NexusStatCard'
import { NEXUS_IMPACT_STATS, NEXUS_IMPACT_WEEKLY } from '../../components/nexus/nexusData'

function NexusImpactPage() {
  const max = Math.max(...NEXUS_IMPACT_WEEKLY.map((w) => w.value))

  return (
    <>
      <section className="nx-page-head fade-in-up">
        <h1 className="nx-page-title">Impact</h1>
        <p className="nx-page-sub">Ce que vos agents IA vous font gagner, semaine après semaine.</p>
      </section>

      <section className="nx-stats-grid fade-in-up" aria-label="Statistiques d'impact">
        {NEXUS_IMPACT_STATS.map((stat) => (
          <NexusStatCard key={stat.id} stat={stat} />
        ))}
      </section>

      <section className="nx-section fade-in-up">
        <div className="nx-section-head">
          <h2 className="nx-section-title">Évolution des actions traitées</h2>
          <span className="nx-section-sub">6 dernières semaines</span>
        </div>

        <div className="nx-chart-card">
          <div className="nx-chart" role="img" aria-label="Actions traitées par semaine, tendance en hausse sur 6 semaines">
            {NEXUS_IMPACT_WEEKLY.map((week) => {
              const height = Math.round((week.value / max) * 100)
              const isMax = week.value === max
              return (
                <div className="nx-chart-col" key={week.label}>
                  <div className="nx-chart-bar-wrap">
                    {isMax && <span className="nx-chart-bar-label">{week.value}</span>}
                    <div
                      className={`nx-chart-bar${isMax ? ' nx-chart-bar--peak' : ''}`}
                      style={{ height: `${height}%` }}
                    >
                      <span className="nx-chart-bar-tooltip">{week.value} actions</span>
                    </div>
                  </div>
                  <span className="nx-chart-x-label">{week.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default NexusImpactPage
