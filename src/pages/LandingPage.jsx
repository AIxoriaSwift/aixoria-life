import { useNavigate } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo'
import PlanBadge from '../components/PlanBadge'
import { IconArrow } from '../components/icons'
import { MODULES, PLAN_CONFIG } from '../data'

const PILLARS = [
  { icon: '💫', title: 'Life Pulse',           desc: "Des messages motivants alignés avec tes objectifs, ton énergie et tes blocages du moment." },
  { icon: '🚫', title: 'Anti-Procrastination', desc: "Un bouton urgence pour passer à l'action en 5 minutes. Sans excuses, sans pression." },
  { icon: '🌟', title: 'Future Me',            desc: "Une vision claire de la personne que tu veux devenir, pour ne jamais perdre le cap." },
  { icon: '🚀', title: 'Business Builder',     desc: "Un parcours guidé pour structurer ton idée, ton offre et conquérir tes premiers clients." },
]

export default function LandingPage() {
  const navigate = useNavigate()

  const goToLogin  = () => navigate('/login')
  const goToSignup = () => navigate('/signup')
  const goToApp    = () => navigate('/app')
  const goToAdmin  = () => navigate('/admin')

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="landing">

      {/* ── Dev bar — toujours au-dessus de la navbar ── */}
      <div className="dev-bar">
        <span className="dev-bar-label">🧪 Mode test</span>
        <button className="dev-bar-link" onClick={goToApp}>Dashboard Client</button>
        <span className="dev-bar-sep">·</span>
        <button className="dev-bar-link" onClick={goToAdmin}>Admin</button>
      </div>

      {/* ── Navbar publique ── */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <BrandLogo />
          <ul className="landing-nav-links" role="list">
            <li><button className="nav-link" onClick={() => scrollTo('features')}>Discipline</button></li>
            <li><button className="nav-link" onClick={() => scrollTo('modules-preview')}>Business</button></li>
            <li><button className="nav-link" onClick={() => scrollTo('modules-preview')}>Life Pulse</button></li>
            <li><button className="nav-link" onClick={() => scrollTo('plans')}>Tarifs</button></li>
          </ul>
          <div className="landing-nav-actions">
            <button className="btn-nav-ghost" onClick={goToLogin}>Connexion</button>
            <button className="btn-nav-solid" onClick={goToSignup}>S'inscrire</button>
          </div>
        </div>
      </nav>

      {/* ── Hero 2 colonnes ── */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="grid-lines" />
        </div>

        <div className="hero-inner">
          {/* Colonne gauche */}
          <div className="hero-text">
            <div className="hero-badge">✦ COPILOTE IA — REPRENDS LE CONTRÔLE</div>
            <h1 className="hero-title">
              Reprends le contrôle<br />
              de ta vie.<br />
              <span className="gradient-text">Un plan clair chaque jour.</span>
            </h1>
            <p className="hero-subtitle">
              AIxoria Life t'aide à savoir quoi faire aujourd'hui, même quand tu es fatiguée, perdue, stressée ou bloquée. Chaque jour, l'IA te donne 3 actions simples pour avancer dans ta vie, ton argent, ton mental et tes projets.
            </p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={goToSignup}>
                <span>Créer mon plan du jour</span>
                <IconArrow />
              </button>
              <button className="btn-hero-blocked" onClick={() => scrollTo('features')}>
                Je suis bloquée
              </button>
            </div>
            <div className="hero-proofs">
              <span className="hero-proof">✓ 3 actions claires par jour</span>
              <span className="hero-proof">✓ IA adaptée à ton état</span>
              <span className="hero-proof">✓ Life Pulse personnalisé</span>
            </div>
          </div>

          {/* Colonne droite : mockup */}
          <div className="hero-mockup" aria-hidden="true">
            <div className="mockup-card">
              <div className="mockup-chrome">
                <span className="mockup-dot mockup-dot--red" />
                <span className="mockup-dot mockup-dot--yellow" />
                <span className="mockup-dot mockup-dot--green" />
                <span className="mockup-chrome-label">AIxoria Life — Dashboard</span>
              </div>
              <div className="mockup-body">
                <div className="mockup-greeting">
                  <span className="mockup-greeting-name">Bonjour Maëlle 👋</span>
                  <span className="mockup-greeting-sub">Prête à avancer aujourd'hui ?</span>
                </div>
                <div className="mockup-pulse-block">
                  <div className="mockup-pulse-header"><span>💫</span><span>Life Pulse du jour</span></div>
                  <p className="mockup-pulse-text">
                    "Tu n'as pas besoin d'être parfaite aujourd'hui. Tu dois juste honorer une action qui construit ta liberté."
                  </p>
                </div>
                <div className="mockup-metrics">
                  <div className="mockup-score">
                    <div className="mockup-ring">
                      <svg viewBox="0 0 36 36" className="mockup-ring-svg">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="3" />
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="url(#sg1)"
                          strokeWidth="3" strokeDasharray="72 28" strokeLinecap="round"
                          transform="rotate(-90 18 18)" />
                        <defs>
                          <linearGradient id="sg1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#60c8ff" />
                            <stop offset="100%" stopColor="#a78bfa" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className="mockup-ring-pct">72%</span>
                    </div>
                    <span className="mockup-metric-label">Discipline</span>
                  </div>
                  <div className="mockup-streak">
                    <div className="mockup-streak-val">🔥 5</div>
                    <span className="mockup-metric-label">jours de série</span>
                  </div>
                </div>
                <div className="mockup-actions-block">
                  <div className="mockup-actions-title">3 actions aujourd'hui</div>
                  <div className="mockup-action mockup-action--done">✓ Travailler 30 min sur mon offre</div>
                  <div className="mockup-action">○ Publier un contenu</div>
                  <div className="mockup-action">○ Faire le bilan du soir</div>
                </div>
                <div className="mockup-mini-cards">
                  <div className="mockup-mini-card">
                    <span className="mmc-icon">🌟</span>
                    <div><div className="mmc-title">Future Me</div><div className="mmc-desc">Devenir indépendante</div></div>
                  </div>
                  <div className="mockup-mini-card">
                    <span className="mmc-icon">🔥</span>
                    <div><div className="mmc-title">Série actuelle</div><div className="mmc-desc">5 jours consécutifs</div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="landing-features" id="features">
        <div className="landing-section-inner">
          <div className="section-header">
            <div className="section-tag">Système</div>
            <h2>Un système quotidien, pas juste de la motivation</h2>
            <p>AIxoria Life combine discipline, planning et business pour créer un changement durable.</p>
          </div>
          <div className="features-pillars">
            {PILLARS.map((p) => (
              <div key={p.title} className="feature-pillar">
                <span className="fp-icon">{p.icon}</span>
                <h3 className="fp-title">{p.title}</h3>
                <p className="fp-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modules ── */}
      <section className="landing-modules" id="modules-preview">
        <div className="landing-section-inner">
          <div className="section-header">
            <div className="section-tag">Modules</div>
            <h2>Les modules qui construisent ta nouvelle discipline.</h2>
            <p>8 assistants IA spécialisés — chacun transforme une zone clé de ta vie</p>
          </div>
          <div className="landing-modules-grid">
            {MODULES.map((mod) => (
              <div key={mod.id} className="landing-module-card" style={{ '--mc': mod.color }}>
                <div className="lmc-accent" />
                <div className="lmc-top">
                  <span className="lmc-icon">{mod.icon}</span>
                  <PlanBadge plan={mod.planRequired} />
                </div>
                <h3 className="lmc-name">{mod.name}</h3>
                <p className="lmc-desc">{mod.description}</p>
                <div className="lmc-features">
                  {mod.features.slice(0, 3).map((f) => (
                    <span key={f.name} className="lmc-feature-pill">{f.name}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="landing-cta-row">
            <button className="btn-primary" onClick={goToSignup}>
              <span>Créer mon compte gratuitement</span>
              <IconArrow />
            </button>
          </div>
        </div>
      </section>

      {/* ── Plans ── */}
      <section className="landing-plans" id="plans">
        <div className="landing-section-inner">
          <div className="section-header">
            <div className="section-tag">Abonnements</div>
            <h2>Choisir ton niveau de progression</h2>
            <p>Commence avec Starter et évolue à ton rythme</p>
          </div>
          <div className="plans-grid">
            {Object.entries(PLAN_CONFIG).map(([key, plan]) => (
              <div key={key} className={`plan-card ${key === 'builder' ? 'plan-card--popular' : ''}`}>
                {key === 'builder' && <div className="plan-popular-badge">Le plus choisi</div>}
                <div className={`plan-badge-icon plan-badge-icon--${key}`}>{plan.badge}</div>
                <h3 className="plan-name" style={{ color: plan.color }}>{plan.name}</h3>
                <div className="plan-price">{plan.price}</div>
                <ul className="plan-modules-list">
                  {plan.modules.map((mId) => {
                    const mod = MODULES.find((m) => m.id === mId)
                    return (
                      <li key={mId}>
                        <span>{mod?.icon}</span>
                        <span>{mod?.name}</span>
                      </li>
                    )
                  })}
                  {MODULES.filter((m) => !plan.modules.includes(m.id)).map((mod) => (
                    <li key={mod.id} className="plan-module-locked">
                      <span>🔒</span>
                      <span>{mod.name}</span>
                    </li>
                  ))}
                </ul>
                <button className="btn-plan" onClick={goToSignup} style={{ '--plan-color': plan.color }}>
                  Choisir {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <p>© 2025 AIxoria Life — by AIxoria Swift. Tous droits réservés.</p>
      </footer>
    </div>
  )
}
