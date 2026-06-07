import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import BrandLogo from '../components/BrandLogo'
import PlanBadge from '../components/PlanBadge'
import { IconArrow, IconBack, IconLock, IconX } from '../components/icons'
import { MODULES, PLAN_CONFIG, PULSE_RESPONSES } from '../data'

/* ── Default fictitious user ── */
const DEFAULT_USER = { name: "Maëlle", role: "client", plan: "builder" }

/* ── Plan switcher options ── */
const PLAN_OPTS = [
  { label: "Starter", plan: "starter", icon: "🌱" },
  { label: "Builder", plan: "builder", icon: "🔨" },
  { label: "Pro",     plan: "pro",     icon: "⚡" },
]

/* ══════════════════════════════════════════
   LIFE PULSE BLOCK
   ══════════════════════════════════════════ */
function LifePulseBlock() {
  const [response, setResponse] = useState(null)

  const handleAction = (key) => {
    setResponse(response?.key === key ? null : { key, ...PULSE_RESPONSES[key] })
  }

  return (
    <div className="life-pulse-block">
      <div className="lpb-header">
        <span className="lpb-icon">💫</span>
        <div>
          <h3 className="lpb-title">Life Pulse du jour</h3>
          <p className="lpb-quote">
            "Tu n'as pas besoin de tout réussir aujourd'hui. Tu dois juste faire une action qui respecte la personne que tu veux devenir."
          </p>
        </div>
      </div>
      <div className="lpb-actions">
        <button
          className={`lpb-btn${response?.key === 'procrastine' ? ' lpb-btn--active' : ''}`}
          onClick={() => handleAction('procrastine')}
        >
          🚫 Je procrastine
        </button>
        <button
          className={`lpb-btn${response?.key === 'motivation' ? ' lpb-btn--active' : ''}`}
          onClick={() => handleAction('motivation')}
        >
          🔥 Besoin de motivation
        </button>
        <button
          className={`lpb-btn${response?.key === 'actions' ? ' lpb-btn--active' : ''}`}
          onClick={() => handleAction('actions')}
        >
          ⚡ 3 actions maintenant
        </button>
      </div>
      {response && (
        <div className="lpb-response" style={{ '--rc': response.color }}>
          <div className="lpb-response-header">
            <span className="lpb-response-icon">{response.icon}</span>
            <h4>{response.title}</h4>
            <button className="lpb-response-close" onClick={() => setResponse(null)} aria-label="Fermer">
              <IconX />
            </button>
          </div>
          <p className="lpb-response-message">{response.message}</p>
          <ul className="lpb-response-actions">
            {response.actions.map((a) => <li key={a}>{a}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════
   MODULE VIEW (détail d'un module)
   ══════════════════════════════════════════ */
function ModuleView({ mod, onBack }) {
  const [activeFeature, setActiveFeature] = useState(null)

  return (
    <div className="module-view fade-in-up">
      <button className="btn-back" onClick={onBack}>
        <IconBack />
        Retour au dashboard
      </button>
      <div className="module-view-header" style={{ '--mc': mod.color }}>
        <div className="mvh-accent" />
        <div className="mvh-inner">
          <span className="mvh-icon">{mod.icon}</span>
          <div>
            <div className="mvh-badges"><PlanBadge plan={mod.planRequired} /></div>
            <h1 className="mvh-title">{mod.name}</h1>
            <p className="mvh-desc">{mod.description}</p>
          </div>
        </div>
      </div>
      <div className="module-features-grid">
        {mod.features.map((feature) => (
          <button
            key={feature.name}
            className="feature-card"
            style={{ '--mc': mod.color }}
            onClick={() => setActiveFeature(feature)}
          >
            <span className="fc-icon">{feature.icon}</span>
            <h3 className="fc-name">{feature.name}</h3>
            <p className="fc-desc">{feature.desc}</p>
            <div className="fc-action">
              <span>Accéder</span>
              <IconArrow size={13} />
            </div>
          </button>
        ))}
      </div>

      {activeFeature && (
        <div className="modal-overlay" onClick={() => setActiveFeature(null)} role="dialog" aria-modal="true">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">{activeFeature.icon}</div>
            <h3>{activeFeature.name}</h3>
            <p>{activeFeature.desc}</p>
            <div className="modal-coming-soon">
              <span className="coming-soon-badge">🚧 En développement</span>
              <p>Cette fonctionnalité sera disponible très prochainement.</p>
            </div>
            <button className="btn-secondary modal-close-btn" onClick={() => setActiveFeature(null)}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════
   SETTINGS (placeholder)
   ══════════════════════════════════════════ */
function SettingsSection({ user, planConfig, onBack }) {
  return (
    <div className="module-view fade-in-up">
      <button className="btn-back" onClick={onBack}>
        <IconBack />
        Retour au dashboard
      </button>
      <div className="settings-section">
        <div className="settings-header">
          <span className="settings-icon">⚙️</span>
          <div>
            <h1 className="settings-title">Paramètres</h1>
            <p className="settings-sub">Gestion de ton compte et de tes préférences</p>
          </div>
        </div>

        <div className="settings-cards">
          <div className="settings-card">
            <h3 className="sc-title">👤 Profil</h3>
            <div className="sc-row"><span>Nom</span><strong>{user.name}</strong></div>
            <div className="sc-row"><span>Plan actuel</span><strong>{planConfig.badge} {planConfig.name} — {planConfig.price}</strong></div>
            <button className="sc-btn">Modifier le profil</button>
          </div>

          <div className="settings-card">
            <h3 className="sc-title">📦 Abonnement</h3>
            <div className="sc-row"><span>Plan</span><strong>{planConfig.name}</strong></div>
            <div className="sc-row"><span>Modules inclus</span><strong>{planConfig.modules.length} / {MODULES.length}</strong></div>
            {planConfig.name !== 'Pro' && (
              <button className="sc-btn sc-btn--upgrade">⚡ Passer au Pro</button>
            )}
          </div>

          <div className="settings-card">
            <h3 className="sc-title">🔔 Notifications</h3>
            <div className="sc-row"><span>Life Pulse quotidien</span><strong>Activé</strong></div>
            <div className="sc-row"><span>Rappels discipline</span><strong>Activé</strong></div>
            <button className="sc-btn">Configurer</button>
          </div>
        </div>

        <div className="settings-coming-soon">
          <span className="coming-soon-badge">🚧 Fonctionnalités à venir</span>
          <p>La gestion complète du compte, des préférences et de la facturation arrivera prochainement.</p>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   DASHBOARD HOME
   ══════════════════════════════════════════ */
function DashboardHome({ user, planConfig, onModuleClick }) {
  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
  const isLocked = (modId) => !planConfig.modules.includes(modId)

  return (
    <div className="dashboard fade-in-up">
      <div className="dash-header">
        <div className="dash-header-left">
          <span className="dash-date">{today}</span>
          <h1 className="dash-welcome">
            Bonjour, <span className="dash-name">{user.name}</span> 👋
          </h1>
          <p className="dash-subtitle-greeting">Prête à reprendre le contrôle aujourd'hui ?</p>
          <p className="dash-subtitle">
            Plan <strong>{planConfig.badge} {planConfig.name}</strong>
            <span className="dash-subtitle-sep">·</span>
            {planConfig.modules.length} modules actifs
          </p>
        </div>
        <div className="dash-header-score">
          <div className="dhs-ring">
            <svg viewBox="0 0 36 36" className="dhs-ring-svg">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="2.5" />
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="url(#dsg)"
                strokeWidth="2.5" strokeDasharray="72 28" strokeLinecap="round"
                transform="rotate(-90 18 18)" />
              <defs>
                <linearGradient id="dsg" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60c8ff" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
            </svg>
            <span className="dhs-pct">72%</span>
          </div>
          <div className="dhs-labels">
            <span className="dhs-label">Discipline</span>
            <span className="dhs-streak">🔥 5 jours</span>
          </div>
        </div>
      </div>

      <div className="plan-du-jour">
        <div className="pdj-header">
          <span className="pdj-icon">📋</span>
          <h3 className="pdj-title">Plan du jour</h3>
          <span className="pdj-meta">2 / 3 actions complétées</span>
        </div>
        <div className="pdj-tasks">
          <div className="pdj-task pdj-task--done">
            <span className="pdj-check">✓</span>
            <span>Lire mes objectifs Future Me</span>
          </div>
          <div className="pdj-task pdj-task--done">
            <span className="pdj-check">✓</span>
            <span>Compléter ma routine matinale</span>
          </div>
          <div className="pdj-task">
            <span className="pdj-check">○</span>
            <span>30 min sur mon projet principal</span>
          </div>
        </div>
      </div>

      <LifePulseBlock />

      <div className="dash-question">
        <h2>Où veux-tu reprendre le contrôle aujourd'hui&nbsp;?</h2>
        <p>Sélectionne un module pour commencer à avancer.</p>
      </div>

      <div className="dash-modules-grid">
        {MODULES.map((mod) => {
          const locked = isLocked(mod.id)
          return (
            <div
              key={mod.id}
              className={`dash-mod-card ${locked ? 'dash-mod-locked' : 'dash-mod-unlocked'}`}
              style={{ '--mc': mod.color }}
              onClick={() => onModuleClick(mod, locked)}
              role="button" tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onModuleClick(mod, locked)}
            >
              <div className="dmc-glow" aria-hidden="true" />
              <div className="dmc-top">
                <span className="dmc-icon">{mod.icon}</span>
                <div className="dmc-top-right">
                  <PlanBadge plan={mod.planRequired} />
                  {locked && <span className="dmc-lock-badge"><IconLock /></span>}
                </div>
              </div>
              <h3 className="dmc-name">{mod.name}</h3>
              <p className="dmc-desc">{mod.description}</p>
              <div className="dmc-features">
                {mod.features.slice(0, 2).map((f) => (
                  <span key={f.name} className="dmc-feature-tag">{f.name}</span>
                ))}
              </div>
              <div className={`dmc-cta ${locked ? 'dmc-cta--locked' : ''}`}>
                {locked
                  ? <><IconLock /><span>Débloquer</span></>
                  : <><span>Ouvrir</span><IconArrow size={13} /></>
                }
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   CLIENT DASHBOARD PAGE
   ══════════════════════════════════════════ */
export default function ClientDashboard() {
  const navigate = useNavigate()
  const [user, setUser]             = useState(DEFAULT_USER)
  const [activeModule, setActiveModule] = useState(null)
  const [lockedModal, setLockedModal]   = useState(null)
  const [sidebarOpen, setSidebarOpen]   = useState(false)

  const planConfig = PLAN_CONFIG[user.plan] || PLAN_CONFIG.starter

  const handleModuleClick = (mod, locked) => {
    if (locked) setLockedModal(mod)
    else { setActiveModule(mod.id); setSidebarOpen(false) }
  }

  const handleNav = (id) => {
    setActiveModule(id)
    setSidebarOpen(false)
  }

  const handlePlanSwitch = (plan) => {
    setUser((u) => ({ ...u, plan }))
    setActiveModule(null)
  }

  const currentMod = MODULES.find((m) => m.id === activeModule)

  const renderContent = () => {
    if (activeModule === 'settings') {
      return <SettingsSection user={user} planConfig={planConfig} onBack={() => setActiveModule(null)} />
    }
    if (activeModule && currentMod) {
      return <ModuleView mod={currentMod} onBack={() => setActiveModule(null)} />
    }
    return <DashboardHome user={user} planConfig={planConfig} onModuleClick={handleModuleClick} />
  }

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}

      <Sidebar
        user={user}
        planConfig={planConfig}
        activeModule={activeModule}
        modules={MODULES}
        onNavigate={handleNav}
        onLogout={() => navigate('/')}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main-area">
        <div className="mobile-topbar">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Ouvrir le menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <BrandLogo size="sm" onClick={() => setActiveModule(null)} />
        </div>

        <div className="main-content">
          {/* Dev nav — discreet test bar */}
          <div className="dev-nav-bar">
            <span className="dev-nav-label">Dev :</span>
            {PLAN_OPTS.map((m) => (
              <button
                key={m.plan}
                className={`dev-nav-link${user.plan === m.plan ? ' dev-nav-link--on' : ''}`}
                onClick={() => handlePlanSwitch(m.plan)}
              >
                {m.icon} {m.label}
              </button>
            ))}
            <span className="dev-nav-sep">|</span>
            <button className="dev-nav-link" onClick={() => navigate('/')}>Landing</button>
            <button className="dev-nav-link" onClick={() => navigate('/admin')}>Admin</button>
          </div>

          {renderContent()}
        </div>
      </main>

      {lockedModal && (
        <div className="modal-overlay" onClick={() => setLockedModal(null)} role="dialog" aria-modal="true">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">🔒</div>
            <h3>Module verrouillé</h3>
            <p>
              <strong>{lockedModal.name}</strong> n'est pas inclus dans ton plan{' '}
              <strong>{planConfig.badge} {planConfig.name}</strong>.
            </p>
            <p className="modal-hint">
              Passe au plan{' '}
              <strong>{lockedModal.planRequired === 'builder' ? 'Builder 🔨' : 'Pro ⚡'}</strong>{' '}
              pour accéder à ce module.
            </p>
            <div className="modal-actions">
              <button className="btn-primary modal-btn-unlock" onClick={() => setLockedModal(null)}>
                <span>Changer de plan</span>
                <IconArrow size={14} />
              </button>
              <button className="btn-secondary" onClick={() => setLockedModal(null)}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
