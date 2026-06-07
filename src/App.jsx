import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import BrandLogo from './components/BrandLogo'
import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'

const ADMIN_EMAIL = 'contact@aixoriaswift.pro'

export const MODULES = [
  {
    id: 'discipline',
    name: 'AI Discipline',
    icon: '🧠',
    description: 'Routines, habitudes, score de discipline et mode anti-procrastination.',
    color: '#8b5cf6',
    planRequired: 'starter',
    features: [
      { name: 'Mes Routines',        icon: '🔄', desc: 'Construis et suis tes routines quotidiennes.' },
      { name: 'Habitudes',           icon: '⚡', desc: 'Tracker tes habitudes et progresse chaque jour.' },
      { name: 'Score Discipline',    icon: '📊', desc: 'Mesure ton niveau de discipline global.' },
      { name: 'Anti-Procrastination',icon: '🚫', desc: 'Brise le cycle de procrastination.' },
      { name: 'Bilan du Jour',       icon: '📝', desc: 'Réflexion et analyse de ta journée.' },
      { name: 'Actions du Jour',     icon: '✅', desc: "Tes 3 priorités pour aujourd'hui." },
    ],
  },
  {
    id: 'planner',
    name: 'AI Planner',
    icon: '📅',
    description: 'Organise tes journées, tes semaines et tes priorités selon ton énergie réelle.',
    color: '#3b82f6',
    planRequired: 'starter',
    features: [
      { name: 'Planning du Jour',  icon: '☀️', desc: 'Organise ta journée heure par heure.' },
      { name: 'Semaine en Vue',    icon: '📆', desc: 'Vision hebdomadaire de tes engagements.' },
      { name: 'Mes Priorités',     icon: '🎯', desc: 'Identifie et classe tes vraies priorités.' },
      { name: 'Autour du Travail', icon: '💼', desc: 'Organise ton temps autour de tes contraintes.' },
      { name: 'Tâches Perso',      icon: '🏠', desc: 'Gère ton espace personnel et ta famille.' },
      { name: 'Tâches Business',   icon: '🚀', desc: 'Avance sur ton projet en dehors du bureau.' },
    ],
  },
  {
    id: 'business',
    name: 'AI Business Builder',
    icon: '🚀',
    description: 'Structure ton idée, ton offre, ta cible et ton plan de lancement.',
    color: '#f59e0b',
    planRequired: 'builder',
    features: [
      { name: 'Trouver une Idée',    icon: '💡', desc: 'Découvre des activités adaptées à ton profil.' },
      { name: 'Structurer mon Offre',icon: '📦', desc: 'Formule ce que tu vends clairement.' },
      { name: 'Ma Cible',            icon: '🎯', desc: 'Identifie ton client idéal avec précision.' },
      { name: 'Plan 30 Jours',       icon: '🗓️', desc: 'Plan de lancement étape par étape.' },
      { name: 'Checklist Auto-Entrepreneur', icon: '✅', desc: 'Toutes les démarches pour te lancer.' },
      { name: 'Premiers Clients',    icon: '🤝', desc: 'Stratégie pour trouver tes 3 premiers clients.' },
    ],
  },
  {
    id: 'finance',
    name: 'AI Finance',
    icon: '💰',
    description: 'Gère ton budget personnel, ton budget business et tes objectifs de revenus.',
    color: '#10b981',
    planRequired: 'builder',
    features: [
      { name: 'Budget Personnel',    icon: '🏠', desc: 'Analyse et optimise tes dépenses.' },
      { name: 'Budget Business',     icon: '💼', desc: 'Suivi des revenus et charges de ton activité.' },
      { name: 'Objectifs de Revenus',icon: '📈', desc: 'Fixe et décompose tes objectifs financiers.' },
      { name: 'Simulateur Liberté',  icon: '🕊️', desc: 'Combien gagner pour quitter ton emploi ?' },
      { name: 'Suivi des Charges',   icon: '📊', desc: 'Contrôle tes charges fixes et variables.' },
      { name: "Plan d'Épargne",      icon: '🏦', desc: 'Automatise et visualise ton épargne.' },
    ],
  },
  {
    id: 'content',
    name: 'AI Content',
    icon: '✨',
    description: 'Crée tes idées TikTok, Instagram, LinkedIn et ton calendrier de contenu.',
    color: '#ec4899',
    planRequired: 'pro',
    features: [
      { name: 'Idées de Contenu',  icon: '💡', desc: 'TikTok, Instagram et LinkedIn sur mesure.' },
      { name: 'Scripts Vidéo',     icon: '🎬', desc: 'Scripts prêts à tourner pour tes vidéos.' },
      { name: 'Descriptions',      icon: '✍️', desc: 'Textes optimisés pour chaque plateforme.' },
      { name: 'Calendrier Contenu',icon: '📅', desc: 'Planifie 30 jours de contenu en un clic.' },
      { name: 'Storytelling',      icon: '📖', desc: 'Raconte ton histoire pour connecter.' },
      { name: 'Textes de Vente',   icon: '💬', desc: 'Copywriting qui convertit en clients.' },
    ],
  },
  {
    id: 'confidence',
    name: 'AI Confidence',
    icon: '💎',
    description: 'Prépare tes appels, ton pitch, tes réponses aux objections et ta confiance.',
    color: '#06b6d4',
    planRequired: 'pro',
    features: [
      { name: 'Confiance en Soi',          icon: '🦁', desc: 'Exercices et mindset pour te croire.' },
      { name: 'Préparer un Appel',         icon: '📞', desc: 'Script et checklist avant ton appel client.' },
      { name: 'Mon Pitch',                 icon: '🎤', desc: 'Formule qui tu es et ce que tu apportes.' },
      { name: 'Réponses aux Objections',   icon: '🛡️', desc: "Gère \"c'est trop cher\" et autres blocages." },
      { name: 'Syndrome Imposteur',        icon: '🪞', desc: 'Travaille ta légitimité et crédibilité.' },
      { name: 'Booster ma Posture',        icon: '⚡', desc: 'Langage, ton et présence qui inspirent.' },
    ],
  },
  {
    id: 'future-me',
    name: 'Future Me',
    icon: '🌟',
    description: 'Définis la version de toi que tu veux devenir et reçois des rappels alignés.',
    color: '#a78bfa',
    planRequired: 'pro',
    features: [
      { name: 'Qui Je Veux Devenir',    icon: '🦋', desc: 'Dessine ta version idéale dans 12 mois.' },
      { name: 'Mes Valeurs',            icon: '💠', desc: 'Identifie tes valeurs fondamentales.' },
      { name: 'Vision dans 1 An',       icon: '🔭', desc: 'Ta vie telle que tu la veux vraiment.' },
      { name: 'Rappels d\'Identité',    icon: '🔔', desc: 'Notifications alignées avec qui tu deviens.' },
      { name: 'Lettre à mon Futur Moi', icon: '📜', desc: 'Écris à la personne que tu vas devenir.' },
      { name: 'Ancres de Transformation',icon: '⚓', desc: 'Rituels qui renforcent ta nouvelle identité.' },
    ],
  },
  {
    id: 'life-pulse',
    name: 'Life Pulse',
    icon: '💫',
    description: 'Des notifications motivantes selon ton objectif, ton humeur et tes progrès.',
    color: '#f472b6',
    planRequired: 'pro',
    features: [
      { name: 'Pouls du Jour',          icon: '❤️', desc: 'Évalue ton énergie et ton état du moment.' },
      { name: 'Humeur & Énergie',       icon: '🌊', desc: 'Suis tes cycles pour mieux planifier.' },
      { name: 'Alerte Procrastination', icon: '🚨', desc: 'Détecte et brise tes patterns de blocage.' },
      { name: 'Notification Motivante', icon: '🔔', desc: 'Messages personnalisés selon ton état.' },
      { name: 'Score Semaine',          icon: '📊', desc: 'Bilan hebdomadaire de tes progrès réels.' },
      { name: 'Mode Urgence',           icon: '⚡', desc: 'Reprise immédiate quand tu dérailles.' },
    ],
  },
]

export const PLAN_CONFIG = {
  starter: {
    name: 'Starter',
    badge: '🌱',
    color: '#60a5fa',
    modules: MODULES.filter((m) => m.planRequired === 'starter').map((m) => m.id),
  },
  builder: {
    name: 'Builder',
    badge: '🔨',
    color: '#fbbf24',
    modules: MODULES.filter((m) => ['starter', 'builder'].includes(m.planRequired)).map((m) => m.id),
  },
  pro: {
    name: 'Pro',
    badge: '⚡',
    color: '#a78bfa',
    modules: MODULES.map((m) => m.id),
  },
}

const PLAN_BADGE_LABELS = { starter: 'Starter', builder: 'Builder', pro: 'Pro' }

/* ── canAccessModule ── */
const PLAN_HIERARCHY = { starter: 0, builder: 1, pro: 2 }
export function canAccessModule(userPlan, requiredPlan) {
  if (userPlan === 'admin') return true
  return (PLAN_HIERARCHY[userPlan] ?? -1) >= (PLAN_HIERARCHY[requiredPlan] ?? 99)
}

/* ── Fake clients (dev data) ── */
const FAKE_CLIENTS = [
  { id: 1, name: "Sophie Martin",  email: "sophie.m@gmail.com",   plan: "pro",     status: "actif",  joined: "Jan 2025" },
  { id: 2, name: "Emma Dubois",    email: "emma.d@outlook.com",   plan: "builder", status: "actif",  joined: "Fév 2025" },
  { id: 3, name: "Julie Moreau",   email: "julie.m@yahoo.fr",     plan: "starter", status: "actif",  joined: "Fév 2025" },
  { id: 4, name: "Clara Petit",    email: "clara.p@gmail.com",    plan: "builder", status: "essai",  joined: "Mar 2025" },
  { id: 5, name: "Laura Bernard",  email: "laura.b@icloud.com",   plan: "pro",     status: "actif",  joined: "Jan 2025" },
  { id: 6, name: "Camille Simon",  email: "camille.s@gmail.com",  plan: "starter", status: "expiré", joined: "Déc 2024" },
  { id: 7, name: "Alice Leroy",    email: "alice.l@gmail.com",    plan: "pro",     status: "actif",  joined: "Mar 2025" },
  { id: 8, name: "Zoé Martin",     email: "zoe.martin@gmail.com", plan: "builder", status: "actif",  joined: "Fév 2025" },
]

/* ── Life Pulse réponses statiques ── */
const PULSE_RESPONSES = {
  procrastine: {
    icon: '🚫',
    color: '#8b5cf6',
    title: 'Mode Anti-Procrastination activé',
    message: "Tu n'as pas besoin d'être motivé pour commencer. Tu as besoin de commencer pour être motivé. Lance-toi sur 5 minutes. Juste 5 minutes.",
    actions: [
      '⏱️ Lance un timer de 25 minutes maintenant',
      '📵 Coupe les notifications et les réseaux',
      '🎯 Choisis UNE tâche — la plus simple — et commence',
    ],
  },
  motivation: {
    icon: '🔥',
    color: '#f59e0b',
    title: "Tu es plus fort(e) que tu ne le crois",
    message: "\"Les gens qui réussissent n'ont pas moins de doutes que les autres. Ils agissent malgré leurs doutes.\" Rappelle-toi pourquoi tu as commencé.",
    actions: [
      '💎 Relis tes objectifs dans Future Me',
      "✅ Fais UNE action pour ton projet aujourd'hui",
      '🦁 Ouvre AI Confidence pour booster ta posture',
    ],
  },
  actions: {
    icon: '⚡',
    color: '#3b82f6',
    title: "Tes 3 actions prioritaires aujourd'hui",
    message: "Focus sur ces 3 actions concrètes. Pas plus. Bien les faire, c'est mieux que d'en commencer 10.",
    actions: [
      '🚀 30 min sur ton projet principal (sans interruption)',
      '📬 Réponds aux messages importants en attente',
      '🏃 Une action pour prendre soin de toi (sport, marche, eau)',
    ],
  },
}

/* ── Icons ── */
const IconArrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const IconBack = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
)

const IconLock = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const IconShield = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const IconX = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

/* ── Plan badge ── */
const PLAN_COLORS = { starter: '#60a5fa', builder: '#fbbf24', pro: '#a78bfa' }

function PlanBadge({ plan }) {
  const color = PLAN_COLORS[plan] || '#94a3b8'
  const label = PLAN_BADGE_LABELS[plan] || plan
  return (
    <span className="mod-plan-badge" style={{ '--bc': color }}>{label}</span>
  )
}

/* ══════════════════════════════════════════
   LANDING PAGE
   ══════════════════════════════════════════ */
function LandingPage({ onLogin, onRegister }) {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const PILLARS = [
    { icon: '💫', title: 'Life Pulse', desc: "Des messages motivants alignés avec tes objectifs, ton énergie et tes blocages du moment." },
    { icon: '🚫', title: 'Anti-Procrastination', desc: "Un bouton urgence pour passer à l'action en 5 minutes. Sans excuses, sans pression." },
    { icon: '🌟', title: 'Future Me', desc: "Une vision claire de la personne que tu veux devenir, pour ne jamais perdre le cap." },
    { icon: '🚀', title: 'Business Builder', desc: "Un parcours guidé pour structurer ton idée, ton offre et conquérir tes premiers clients." },
  ]

  return (
    <div className="landing">

      {/* ── Navbar ── */}
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
            <button className="btn-nav-ghost" onClick={onLogin}>Connexion</button>
            <button className="btn-nav-solid" onClick={onRegister}>S'inscrire</button>
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
          {/* Colonne gauche : texte */}
          <div className="hero-text">
            <div className="hero-badge">✦ LE COPILOTE IA POUR REPRENDRE LE CONTRÔLE</div>
            <h1 className="hero-title">
              Deviens discipliné.<br />
              Organise ta vie.<br />
              <span className="gradient-text">Lance ton activité.</span>
            </h1>
            <p className="hero-subtitle">
              AIxoria Life transforme ton ambition en actions concrètes — routines, planning, motivation intelligente, budget, contenu et business builder.
            </p>
            <p className="hero-phrase">Chaque jour, l'app te guide sur ce qui compte vraiment.</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={onRegister}>
                <span>Commencer maintenant</span>
                <IconArrow />
              </button>
              <button className="btn-hero-ghost" onClick={() => scrollTo('modules-preview')}>
                Voir le dashboard
              </button>
            </div>
            <div className="hero-proofs">
              <span className="hero-proof">✓ Plan du jour</span>
              <span className="hero-proof">✓ Score de discipline</span>
              <span className="hero-proof">✓ Life Pulse personnalisé</span>
            </div>
          </div>

          {/* Colonne droite : mockup dashboard */}
          <div className="hero-mockup" aria-hidden="true">
            <div className="mockup-card">
              {/* Barre chrome */}
              <div className="mockup-chrome">
                <span className="mockup-dot mockup-dot--red" />
                <span className="mockup-dot mockup-dot--yellow" />
                <span className="mockup-dot mockup-dot--green" />
                <span className="mockup-chrome-label">AIxoria Life — Dashboard</span>
              </div>

              <div className="mockup-body">
                {/* Greeting */}
                <div className="mockup-greeting">
                  <span className="mockup-greeting-name">Bonjour Maëlle 👋</span>
                  <span className="mockup-greeting-sub">Prête à avancer aujourd'hui ?</span>
                </div>

                {/* Life Pulse */}
                <div className="mockup-pulse-block">
                  <div className="mockup-pulse-header">
                    <span>💫</span>
                    <span>Life Pulse du jour</span>
                  </div>
                  <p className="mockup-pulse-text">
                    "Tu n'as pas besoin d'être parfaite aujourd'hui. Tu dois juste honorer une action qui construit ta liberté."
                  </p>
                </div>

                {/* Métriques */}
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

                {/* Actions */}
                <div className="mockup-actions-block">
                  <div className="mockup-actions-title">3 actions aujourd'hui</div>
                  <div className="mockup-action mockup-action--done">✓ Travailler 30 min sur mon offre</div>
                  <div className="mockup-action">○ Publier un contenu</div>
                  <div className="mockup-action">○ Faire le bilan du soir</div>
                </div>

                {/* Mini cartes */}
                <div className="mockup-mini-cards">
                  <div className="mockup-mini-card">
                    <span className="mmc-icon">🌟</span>
                    <div>
                      <div className="mmc-title">Future Me</div>
                      <div className="mmc-desc">Devenir indépendante</div>
                    </div>
                  </div>
                  <div className="mockup-mini-card">
                    <span className="mmc-icon">🔥</span>
                    <div>
                      <div className="mmc-title">Série actuelle</div>
                      <div className="mmc-desc">5 jours consécutifs</div>
                    </div>
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
            <button className="btn-primary" onClick={onRegister}>
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
                <div className="plan-badge-icon">{plan.badge}</div>
                <h3 className="plan-name" style={{ color: plan.color }}>{plan.name}</h3>
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
                      <IconLock />
                      <span>{mod.name}</span>
                    </li>
                  ))}
                </ul>
                <button className="btn-plan" onClick={onRegister} style={{ '--plan-color': plan.color }}>
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
            <div className="mvh-badges">
              <PlanBadge plan={mod.planRequired} />
            </div>
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
              <p>Cette fonctionnalité sera disponible très prochainement. Revenez bientôt !</p>
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
          🔥 J'ai besoin de motivation
        </button>
        <button
          className={`lpb-btn${response?.key === 'actions' ? ' lpb-btn--active' : ''}`}
          onClick={() => handleAction('actions')}
        >
          ⚡ Donne-moi 3 actions aujourd'hui
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
            {response.actions.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════
   DASHBOARD (Client)
   ══════════════════════════════════════════ */
function Dashboard({ user, planConfig, onModuleClick }) {
  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })

  const isLocked = (modId) => {
    if (!user) return true
    if (user.role === 'admin') return false
    return !planConfig.modules.includes(modId)
  }

  return (
    <div className="dashboard fade-in-up">
      {/* Header avec score */}
      <div className="dash-header">
        <div className="dash-header-left">
          <span className="dash-date">{today}</span>
          <h1 className="dash-welcome">
            Bonjour, <span className="dash-name">{user?.name}</span> 👋
          </h1>
          <p className="dash-subtitle-greeting">Prête à reprendre le contrôle aujourd'hui ?</p>
          <p className="dash-subtitle">
            Plan <strong>{planConfig.badge} {planConfig.name}</strong> · {planConfig.modules.length} modules actifs
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
            <span className="dhs-label">Score discipline</span>
            <span className="dhs-streak">🔥 5 jours</span>
          </div>
        </div>
      </div>

      {/* Plan du jour */}
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

      {/* Life Pulse */}
      <LifePulseBlock />

      {/* Question centrale */}
      <div className="dash-question">
        <h2>Où veux-tu reprendre le contrôle aujourd'hui&nbsp;?</h2>
        <p>Choisis un module pour commencer à avancer dès maintenant.</p>
      </div>

      {/* Modules */}
      <div className="dash-modules-grid">
        {MODULES.map((mod) => {
          const locked = isLocked(mod.id)
          return (
            <div
              key={mod.id}
              className={`dash-mod-card ${locked ? 'dash-mod-locked' : 'dash-mod-unlocked'}`}
              style={{ '--mc': mod.color }}
              onClick={() => onModuleClick(mod, locked)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onModuleClick(mod, locked)}
            >
              <div className="dmc-glow" aria-hidden="true" />
              <div className="dmc-top">
                <span className="dmc-icon">{mod.icon}</span>
                <div className="dmc-top-right">
                  <PlanBadge plan={mod.planRequired} />
                  {locked && (
                    <span className="dmc-lock-badge" aria-label="Verrouillé">
                      <IconLock />
                    </span>
                  )}
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
                {locked ? (
                  <>
                    <IconLock />
                    <span>Débloquer</span>
                  </>
                ) : (
                  <>
                    <span>Ouvrir</span>
                    <IconArrow size={13} />
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   DEV SWITCHER (outil de test temporaire)
   ══════════════════════════════════════════ */
const DEV_MODES = [
  { label: "Admin",   role: "admin",  plan: "pro",     icon: "🛡️" },
  { label: "Starter", role: "client", plan: "starter", icon: "🌱" },
  { label: "Builder", role: "client", plan: "builder", icon: "🔨" },
  { label: "Pro",     role: "client", plan: "pro",     icon: "⚡" },
]

function DevSwitcher({ user, onSwitch }) {
  const isActive = (m) => user?.role === m.role && user?.plan === m.plan
  return (
    <div className="dev-switcher">
      <span className="dev-sw-label">🧪 Mode test</span>
      <div className="dev-sw-pills">
        {DEV_MODES.map((m) => (
          <button
            key={m.label}
            className={`dev-sw-pill${isActive(m) ? " dev-sw-pill--on" : ""}`}
            onClick={() => onSwitch(m)}
          >
            {m.icon} {m.label}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   ADMIN DASHBOARD
   ══════════════════════════════════════════ */
const ADMIN_STATS = [
  { label: "Clients inscrits",    value: "8",     sub: "+2 ce mois",          icon: "👥", color: "#60a5fa" },
  { label: "Abonnements actifs",  value: "5",     sub: "60% de conversion",   icon: "✅", color: "#34d399" },
  { label: "MRR estimé",         value: "155 €", sub: "3 Pro · 2 Builder",   icon: "💰", color: "#a78bfa" },
  { label: "Module populaire",   value: "Discipline", sub: "78% des sessions",icon: "🧠", color: "#f472b6" },
]

const STATUS_LABELS = { actif: "Actif", essai: "Essai", expiré: "Expiré" }

function AdminDashboard({ user }) {
  return (
    <div className="admin-dash fade-in-up">

      {/* Header */}
      <div className="admin-dash-header">
        <div>
          <h1 className="admin-dash-title">Admin Center</h1>
          <p className="admin-dash-sub">Tableau de bord fondatrice — AIxoria Life</p>
        </div>
        <div className="admin-dash-badge">
          <IconShield />
          Accès administrateur
        </div>
      </div>

      {/* Statistiques */}
      <div className="admin-stats-grid">
        {ADMIN_STATS.map((s) => (
          <div key={s.label} className="admin-stat-card" style={{ "--sc": s.color }}>
            <div className="asc-top">
              <span className="asc-icon">{s.icon}</span>
              <span className="asc-value">{s.value}</span>
            </div>
            <div className="asc-label">{s.label}</div>
            <div className="asc-sub">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Matrice d'accès par plan */}
      <div className="admin-section">
        <div className="admin-section-header">
          <h2 className="admin-section-title">Accès par plan</h2>
          <button className="btn-secondary admin-action-btn">Modifier les accès</button>
        </div>
        <div className="plan-access-grid">
          {Object.entries(PLAN_CONFIG).map(([key, plan]) => (
            <div key={key} className="pac-col">
              <div className="pac-plan-head" style={{ "--pc": plan.color }}>
                <span>{plan.badge}</span>
                <span className="pac-plan-name">{plan.name}</span>
                <span className="pac-count">{plan.modules.length} modules</span>
              </div>
              {MODULES.map((mod) => {
                const has = plan.modules.includes(mod.id)
                return (
                  <div key={mod.id} className={`pac-row${has ? " pac-row--on" : " pac-row--off"}`}>
                    <span>{mod.icon}</span>
                    <span className="pac-mod-name">{mod.name}</span>
                    <span className={has ? "pac-check" : "pac-cross"}>{has ? "✓" : "—"}</span>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Liste clients */}
      <div className="admin-section">
        <div className="admin-section-header">
          <h2 className="admin-section-title">Clients ({FAKE_CLIENTS.length})</h2>
        </div>
        <div className="client-table-wrap">
          <div className="client-table">
            <div className="ct-head">
              <span>Client</span>
              <span>Plan</span>
              <span>Statut</span>
              <span>Modules</span>
              <span>Inscription</span>
              <span>Actions</span>
            </div>
            {FAKE_CLIENTS.map((c) => (
              <div key={c.id} className="ct-row">
                <div className="ct-client">
                  <div className="ct-avatar">{c.name.slice(0, 2).toUpperCase()}</div>
                  <div>
                    <div className="ct-name">{c.name}</div>
                    <div className="ct-email">{c.email}</div>
                  </div>
                </div>
                <PlanBadge plan={c.plan} />
                <span className={`status-dot status-dot--${c.status}`}>
                  {STATUS_LABELS[c.status]}
                </span>
                <span className="ct-mods">
                  {c.status === "expiré" ? 0 : PLAN_CONFIG[c.plan].modules.length} / 8
                </span>
                <span className="ct-joined">{c.joined}</span>
                <div className="ct-actions">
                  <button className="btn-xs">Voir</button>
                  <button className="btn-xs">Modifier</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   APP ROOT
   ══════════════════════════════════════════ */
function App() {
  const [screen, setScreen]             = useState('landing')
  const [user, setUser]                 = useState(null)
  const [activeModule, setActiveModule]  = useState(null)
  const [lockedModal, setLockedModal]   = useState(null)
  const [sidebarOpen, setSidebarOpen]   = useState(false)

  const handleLogin = (email) => {
    const role = email.toLowerCase() === ADMIN_EMAIL ? 'admin' : 'client'
    setUser({ email, name: email.split('@')[0], role, plan: role === 'admin' ? 'pro' : 'starter' })
    setActiveModule(null)
    setScreen('app')
  }

  const handleRegister = ({ name, email, plan }) => {
    const role = email.toLowerCase() === ADMIN_EMAIL ? 'admin' : 'client'
    setUser({ email, name, role, plan: role === 'admin' ? 'pro' : plan })
    setActiveModule(null)
    setScreen('app')
  }

  const handleLogout = () => {
    setUser(null)
    setActiveModule(null)
    setScreen('landing')
    setSidebarOpen(false)
  }

  const handleModuleClick = (mod, locked) => {
    if (locked) { setLockedModal(mod) }
    else { setActiveModule(mod.id); setSidebarOpen(false) }
  }

  const handleDevSwitch = (mode) => {
    setUser((prev) => ({ ...prev, role: mode.role, plan: mode.plan }))
    setActiveModule(null)
  }

  const planConfig = user ? (PLAN_CONFIG[user.plan] || PLAN_CONFIG.starter) : PLAN_CONFIG.starter
  const currentMod = MODULES.find((m) => m.id === activeModule)

  if (screen === 'login')    return <LoginPage onLogin={handleLogin} onGoRegister={() => setScreen('register')} />
  if (screen === 'register') return <RegisterPage onRegister={handleRegister} onGoLogin={() => setScreen('login')} />
  if (screen === 'landing')  return <LandingPage onLogin={() => setScreen('login')} onRegister={() => setScreen('register')} />

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
        onNavigate={(modId) => { setActiveModule(modId); setSidebarOpen(false) }}
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main-area">
        <div className="mobile-topbar">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Ouvrir le menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <BrandLogo size="sm" onClick={() => setActiveModule(null)} />
        </div>

        <div className="main-content">
          {/* Outil de test temporaire */}
          {user && <DevSwitcher user={user} onSwitch={handleDevSwitch} />}

          {activeModule === null ? (
            user?.role === 'admin' ? (
              <AdminDashboard user={user} />
            ) : (
              <Dashboard user={user} planConfig={planConfig} onModuleClick={handleModuleClick} />
            )
          ) : currentMod ? (
            <ModuleView mod={currentMod} onBack={() => setActiveModule(null)} />
          ) : null}
        </div>
      </main>

      {/* Modal module verrouillé */}
      {lockedModal && (
        <div
          className="modal-overlay"
          onClick={() => setLockedModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Module verrouillé"
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon">🔒</div>
            <h3>Module verrouillé</h3>
            <p>
              <strong>{lockedModal.name}</strong> n'est pas inclus dans ton plan{' '}
              <strong>{planConfig.badge} {planConfig.name}</strong>.
            </p>
            <p className="modal-hint">
              Passe au plan <strong>{lockedModal.planRequired === 'builder' ? 'Builder 🔨' : 'Pro ⚡'}</strong> pour accéder à ce module.
            </p>
            <div className="modal-actions">
              <button className="btn-primary modal-btn-unlock">
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

export default App
