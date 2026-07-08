import { useState } from 'react'
import {
  IcBuilding, IcClockSettings, IcServices, IcTone, IcRule, IcForbidden, IcCheck,
} from '../../components/nexus/nexusIcons'
import { NEXUS_MEMORY } from '../../components/nexus/nexusData'

function NexusMemoryPage() {
  const [tone, setTone] = useState(NEXUS_MEMORY.tone)

  return (
    <>
      <section className="nx-page-head fade-in-up">
        <h1 className="nx-page-title">Mémoire IA</h1>
        <p className="nx-page-sub">Ce que vos agents savent de votre entreprise et comment ils doivent se comporter.</p>
      </section>

      <section className="nx-mem-grid fade-in-up">
        <div className="nx-mem-card">
          <div className="nx-mem-card-head">
            <IcBuilding />
            <h2>Informations entreprise</h2>
          </div>
          <div className="nx-mem-field">
            <label>Nom</label>
            <input type="text" defaultValue={NEXUS_MEMORY.company.name} readOnly />
          </div>
          <div className="nx-mem-field">
            <label>Secteur</label>
            <input type="text" defaultValue={NEXUS_MEMORY.company.sector} readOnly />
          </div>
          <div className="nx-mem-field">
            <label>Adresse</label>
            <input type="text" defaultValue={NEXUS_MEMORY.company.address} readOnly />
          </div>
          <div className="nx-mem-field">
            <label>Site web</label>
            <input type="text" defaultValue={NEXUS_MEMORY.company.website} readOnly />
          </div>
        </div>

        <div className="nx-mem-card">
          <div className="nx-mem-card-head">
            <IcClockSettings />
            <h2>Horaires</h2>
          </div>
          <div className="nx-mem-hours">
            {NEXUS_MEMORY.hours.map((h) => (
              <div className="nx-mem-hours-row" key={h.day}>
                <span>{h.day}</span>
                <strong className={h.value === 'Fermé' ? 'nx-mem-hours-closed' : ''}>{h.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="nx-mem-card">
          <div className="nx-mem-card-head">
            <IcServices />
            <h2>Services</h2>
          </div>
          <div className="nx-mem-tags">
            {NEXUS_MEMORY.services.map((s) => (
              <span className="nx-mem-tag" key={s}>{s}</span>
            ))}
          </div>
        </div>

        <div className="nx-mem-card">
          <div className="nx-mem-card-head">
            <IcTone />
            <h2>Ton de communication</h2>
          </div>
          <div className="nx-mem-tone-options">
            {NEXUS_MEMORY.toneOptions.map((opt) => (
              <button
                key={opt.value}
                className={`nx-mem-tone-btn${tone === opt.value ? ' nx-mem-tone-btn--selected' : ''}`}
                onClick={() => setTone(opt.value)}
                aria-pressed={tone === opt.value}
              >
                {tone === opt.value && <IcCheck size={13} />}
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="nx-mem-card">
          <div className="nx-mem-card-head">
            <IcRule />
            <h2>Règles importantes</h2>
          </div>
          <ul className="nx-mem-list">
            {NEXUS_MEMORY.rules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>

        <div className="nx-mem-card">
          <div className="nx-mem-card-head nx-mem-card-head--danger">
            <IcForbidden />
            <h2>Phrases interdites</h2>
          </div>
          <div className="nx-mem-tags">
            {NEXUS_MEMORY.forbiddenPhrases.map((p) => (
              <span className="nx-mem-tag nx-mem-tag--danger" key={p}>"{p}"</span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default NexusMemoryPage
