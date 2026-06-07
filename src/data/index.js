/* ═══════════════════════════════════════════════
   AIxoria Life — Shared data / constants
   Source of truth for modules, plans, clients.

   SECURITY NOTE: Client access must eventually be
   tied to a real database and Stripe subscriptions.
   ═══════════════════════════════════════════════ */

export const ADMIN_EMAIL = 'contact@aixoriaswift.pro'

/* ── Modules ── */
export const MODULES = [
  {
    id: 'discipline',
    name: 'AI Discipline',
    icon: '🧠',
    description: 'Routines, habitudes, score de discipline et mode anti-procrastination.',
    color: '#8b5cf6',
    planRequired: 'starter',
    adminStatus: 'actif',
    adminUsage: 78,
    features: [
      { name: 'Mes Routines',         icon: '🔄', desc: 'Construis et suis tes routines quotidiennes.' },
      { name: 'Habitudes',            icon: '⚡', desc: 'Tracker tes habitudes et progresse chaque jour.' },
      { name: 'Score Discipline',     icon: '📊', desc: 'Mesure ton niveau de discipline global.' },
      { name: 'Anti-Procrastination', icon: '🚫', desc: 'Brise le cycle de procrastination en 5 minutes.' },
      { name: 'Bilan du Jour',        icon: '📝', desc: 'Réflexion et analyse de ta journée.' },
      { name: 'Actions du Jour',      icon: '✅', desc: "Tes 3 priorités pour aujourd'hui." },
    ],
  },
  {
    id: 'planner',
    name: 'AI Planner',
    icon: '📅',
    description: 'Organise tes journées, tes semaines et tes priorités selon ton énergie réelle.',
    color: '#3b82f6',
    planRequired: 'starter',
    adminStatus: 'actif',
    adminUsage: 65,
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
    id: 'life-pulse',
    name: 'Life Pulse',
    icon: '💫',
    description: "Des notifications motivantes selon ton objectif, ton humeur et tes progrès.",
    color: '#f472b6',
    planRequired: 'starter',
    adminStatus: 'actif',
    adminUsage: 82,
    features: [
      { name: 'Pouls du Jour',          icon: '❤️', desc: "Évalue ton énergie et ton état du moment." },
      { name: 'Humeur & Énergie',       icon: '🌊', desc: 'Suis tes cycles pour mieux planifier.' },
      { name: 'Alerte Procrastination', icon: '🚨', desc: 'Détecte et brise tes patterns de blocage.' },
      { name: 'Notification Motivante', icon: '🔔', desc: 'Messages personnalisés selon ton état.' },
      { name: 'Score Semaine',          icon: '📊', desc: 'Bilan hebdomadaire de tes progrès réels.' },
      { name: 'Mode Urgence',           icon: '⚡', desc: 'Reprise immédiate quand tu dérailles.' },
    ],
  },
  {
    id: 'future-me',
    name: 'Future Me',
    icon: '🌟',
    description: "Définis la version de toi que tu veux devenir et reçois des rappels alignés.",
    color: '#a78bfa',
    planRequired: 'builder',
    adminStatus: 'en développement',
    adminUsage: 45,
    features: [
      { name: 'Qui Je Veux Devenir',      icon: '🦋', desc: 'Dessine ta version idéale dans 12 mois.' },
      { name: 'Mes Valeurs',              icon: '💠', desc: 'Identifie tes valeurs fondamentales.' },
      { name: 'Vision dans 1 An',         icon: '🔭', desc: 'Ta vie telle que tu la veux vraiment.' },
      { name: "Rappels d'Identité",       icon: '🔔', desc: 'Notifications alignées avec qui tu deviens.' },
      { name: 'Lettre à mon Futur Moi',   icon: '📜', desc: 'Écris à la personne que tu vas devenir.' },
      { name: 'Ancres de Transformation', icon: '⚓', desc: 'Rituels qui renforcent ta nouvelle identité.' },
    ],
  },
  {
    id: 'business',
    name: 'Business Builder',
    icon: '🚀',
    description: 'Structure ton idée, ton offre, ta cible et ton plan de lancement.',
    color: '#f59e0b',
    planRequired: 'builder',
    adminStatus: 'actif',
    adminUsage: 71,
    features: [
      { name: 'Trouver une Idée',            icon: '💡', desc: 'Découvre des activités adaptées à ton profil.' },
      { name: 'Structurer mon Offre',        icon: '📦', desc: 'Formule ce que tu vends clairement.' },
      { name: 'Ma Cible',                    icon: '🎯', desc: 'Identifie ton client idéal avec précision.' },
      { name: 'Plan 30 Jours',               icon: '🗓️', desc: 'Plan de lancement étape par étape.' },
      { name: 'Checklist Auto-Entrepreneur', icon: '✅', desc: 'Toutes les démarches pour te lancer.' },
      { name: 'Premiers Clients',            icon: '🤝', desc: 'Stratégie pour trouver tes 3 premiers clients.' },
    ],
  },
  {
    id: 'content',
    name: 'AI Content',
    icon: '✨',
    description: 'Crée tes idées TikTok, Instagram, LinkedIn et ton calendrier de contenu.',
    color: '#ec4899',
    planRequired: 'builder',
    adminStatus: 'en développement',
    adminUsage: 38,
    features: [
      { name: 'Idées de Contenu',   icon: '💡', desc: 'TikTok, Instagram et LinkedIn sur mesure.' },
      { name: 'Scripts Vidéo',      icon: '🎬', desc: 'Scripts prêts à tourner pour tes vidéos.' },
      { name: 'Descriptions',       icon: '✍️', desc: 'Textes optimisés pour chaque plateforme.' },
      { name: 'Calendrier Contenu', icon: '📅', desc: 'Planifie 30 jours de contenu en un clic.' },
      { name: 'Storytelling',       icon: '📖', desc: 'Raconte ton histoire pour connecter.' },
      { name: 'Textes de Vente',    icon: '💬', desc: 'Copywriting qui convertit en clients.' },
    ],
  },
  {
    id: 'finance',
    name: 'AI Finance',
    icon: '💰',
    description: 'Gère ton budget personnel, ton budget business et tes objectifs de revenus.',
    color: '#10b981',
    planRequired: 'pro',
    adminStatus: 'actif',
    adminUsage: 52,
    features: [
      { name: 'Budget Personnel',     icon: '🏠', desc: 'Analyse et optimise tes dépenses.' },
      { name: 'Budget Business',      icon: '💼', desc: 'Suivi des revenus et charges de ton activité.' },
      { name: 'Objectifs de Revenus', icon: '📈', desc: 'Fixe et décompose tes objectifs financiers.' },
      { name: 'Simulateur Liberté',   icon: '🕊️', desc: "Combien gagner pour quitter ton emploi ?" },
      { name: 'Suivi des Charges',    icon: '📊', desc: 'Contrôle tes charges fixes et variables.' },
      { name: "Plan d'Épargne",       icon: '🏦', desc: 'Automatise et visualise ton épargne.' },
    ],
  },
  {
    id: 'confidence',
    name: 'AI Confidence',
    icon: '💎',
    description: 'Prépare tes appels, ton pitch, tes réponses aux objections et ta confiance.',
    color: '#06b6d4',
    planRequired: 'pro',
    adminStatus: 'en développement',
    adminUsage: 29,
    features: [
      { name: 'Confiance en Soi',         icon: '🦁', desc: 'Exercices et mindset pour te croire.' },
      { name: 'Préparer un Appel',        icon: '📞', desc: 'Script et checklist avant ton appel client.' },
      { name: 'Mon Pitch',                icon: '🎤', desc: 'Formule qui tu es et ce que tu apportes.' },
      { name: 'Réponses aux Objections',  icon: '🛡️', desc: "Gère les objections et blocages courants." },
      { name: 'Syndrome Imposteur',       icon: '🪞', desc: 'Travaille ta légitimité et ta crédibilité.' },
      { name: 'Booster ma Posture',       icon: '⚡', desc: 'Langage, ton et présence qui inspirent.' },
    ],
  },
]

/* ── Plan config (auto-built from MODULES) ── */
export const PLAN_CONFIG = {
  starter: {
    name: 'Starter',
    badge: '🌱',
    color: '#60a5fa',
    price: 'Gratuit',
    modules: MODULES.filter((m) => m.planRequired === 'starter').map((m) => m.id),
  },
  builder: {
    name: 'Builder',
    badge: '🔨',
    color: '#fbbf24',
    price: '19 €/mois',
    modules: MODULES.filter((m) => ['starter', 'builder'].includes(m.planRequired)).map((m) => m.id),
  },
  pro: {
    name: 'Pro',
    badge: '⚡',
    color: '#a78bfa',
    price: '39 €/mois',
    modules: MODULES.map((m) => m.id),
  },
}

export const PLAN_HIERARCHY = { starter: 0, builder: 1, pro: 2 }

export function canAccessModule(userPlan, requiredPlan) {
  if (userPlan === 'admin') return true
  return (PLAN_HIERARCHY[userPlan] ?? -1) >= (PLAN_HIERARCHY[requiredPlan] ?? 99)
}

/* ── Life Pulse réponses ── */
export const PULSE_RESPONSES = {
  procrastine: {
    icon: '🚫',
    color: '#8b5cf6',
    title: 'Mode Anti-Procrastination activé',
    message: "Tu n'as pas besoin d'être motivé pour commencer. Tu as besoin de commencer pour être motivé. Lance-toi sur 5 minutes. Juste 5 minutes.",
    actions: [
      "⏱️ Lance un timer de 25 minutes maintenant",
      "📵 Coupe les notifications et les réseaux",
      "🎯 Choisis UNE tâche — la plus simple — et commence",
    ],
  },
  motivation: {
    icon: '🔥',
    color: '#f59e0b',
    title: "Tu es plus forte que tu ne le crois",
    message: "Les gens qui réussissent n'ont pas moins de doutes que les autres. Ils agissent malgré leurs doutes. Rappelle-toi pourquoi tu as commencé.",
    actions: [
      "💎 Relis tes objectifs dans Future Me",
      "✅ Fais UNE action pour ton projet aujourd'hui",
      "🦁 Ouvre AI Confidence pour booster ta posture",
    ],
  },
  actions: {
    icon: '⚡',
    color: '#3b82f6',
    title: "Tes 3 actions prioritaires aujourd'hui",
    message: "Focus sur ces 3 actions concrètes. Pas plus. Bien les faire vaut mieux que d'en commencer 10.",
    actions: [
      "🚀 30 min sur ton projet principal (sans interruption)",
      "📬 Réponds aux messages importants en attente",
      "🏃 Une action pour prendre soin de toi aujourd'hui",
    ],
  },
}

/* ── Fake clients (dev data) ── */
export const FAKE_CLIENTS = [
  { id: 1, name: "Maëlle",  email: "maelle@example.com",  plan: "builder", status: "actif",  joined: "Jan 2025", lastActivity: "Aujourd'hui", modules: 6 },
  { id: 2, name: "Sarah",   email: "sarah@example.com",   plan: "starter", status: "essai",  joined: "Fév 2025", lastActivity: "Hier",          modules: 3 },
  { id: 3, name: "Karim",   email: "karim@example.com",   plan: "pro",     status: "actif",  joined: "Jan 2025", lastActivity: "Aujourd'hui",   modules: 8 },
  { id: 4, name: "Lina",    email: "lina@example.com",    plan: "starter", status: "expiré", joined: "Déc 2024", lastActivity: "Il y a 12 j",   modules: 0 },
  { id: 5, name: "Emma",    email: "emma@example.com",    plan: "pro",     status: "actif",  joined: "Mar 2025", lastActivity: "Il y a 2 j",    modules: 8 },
  { id: 6, name: "Lucas",   email: "lucas@example.com",   plan: "builder", status: "actif",  joined: "Fév 2025", lastActivity: "Hier",           modules: 6 },
  { id: 7, name: "Camille", email: "camille@example.com", plan: "starter", status: "actif",  joined: "Mar 2025", lastActivity: "Aujourd'hui",   modules: 3 },
]

/* ── Admin stats (fictif) ── */
export const ADMIN_STATS = [
  { label: "Clients inscrits",   value: "7",      sub: "+3 ce mois",        icon: "👥", color: "#60a5fa" },
  { label: "Abonnements actifs", value: "4",      sub: "57% de conversion", icon: "✅", color: "#34d399" },
  { label: "MRR estimé",        value: "116 €",  sub: "2 Pro · 2 Builder", icon: "💰", color: "#a78bfa" },
  { label: "Taux d'utilisation", value: "68%",    sub: "Moyenne 5 derniers jours", icon: "📊", color: "#f472b6" },
]

export const STATUS_LABELS = { actif: "Actif", essai: "En essai", expiré: "Expiré" }

/* ── Dev mode switcher options ── */
export const DEV_MODES = [
  { label: "Landing",  view: "landing", icon: "🏠" },
  { label: "Starter",  view: "app",     plan: "starter", icon: "🌱" },
  { label: "Builder",  view: "app",     plan: "builder", icon: "🔨" },
  { label: "Pro",      view: "app",     plan: "pro",     icon: "⚡" },
  { label: "Admin",    view: "admin",   icon: "🛡️" },
]
