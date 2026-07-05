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
    description: 'Crée une constance simple et réaliste. Routines, focus, anti-procrastination et bilan du soir pour avancer chaque jour.',
    color: '#8b5cf6',
    planRequired: 'starter',
    adminStatus: 'actif',
    adminUsage: 78,
    features: [
      { name: 'Routine Matin',        icon: '☀️', desc: 'Pose les bases de ta journée en 10 minutes.' },
      { name: 'Bloc Focus',           icon: '🎯', desc: 'Travaille sans interruption sur ta priorité du moment.' },
      { name: 'Anti-Procrastination', icon: '🚫', desc: 'Reprends le mouvement en 5 minutes, sans te juger.' },
      { name: 'Habitudes',            icon: '🔄', desc: 'Construis des habitudes simples et tenables sur le long terme.' },
      { name: 'Bilan du Soir',        icon: '📝', desc: "Reflète ta journée. Célèbre ce que tu as fait." },
      { name: 'Discipline Reset',     icon: '⚡', desc: 'Recommence sans culpabilité quand tu as décroché.' },
    ],
  },
  {
    id: 'planner',
    name: 'AI Planner',
    icon: '📅',
    description: 'Réduis le chaos mental. Structure ta semaine, identifie tes vraies priorités et organise ta vie sans te surcharger.',
    color: '#3b82f6',
    planRequired: 'starter',
    adminStatus: 'actif',
    adminUsage: 65,
    features: [
      { name: 'Planning du Jour',   icon: '☀️', desc: "Construis ta journée selon ton énergie réelle." },
      { name: 'Planning Semaine',   icon: '📆', desc: 'Une vue claire de la semaine, sans surcharge.' },
      { name: 'Mes Priorités',      icon: '🎯', desc: 'Identifie et protège les 3 choses qui comptent vraiment.' },
      { name: 'Tâches Perso',       icon: '🏠', desc: 'Gère ton quotidien sans laisser de côté ce qui est important.' },
      { name: 'Tâches Business',    icon: '🚀', desc: 'Avance sur ton projet même les jours chargés.' },
      { name: 'Charge Mentale',     icon: '🧘', desc: 'Vide-tête structuré pour libérer ton esprit et clarifier.' },
    ],
  },
  {
    id: 'life-pulse',
    name: 'Life Pulse',
    icon: '💫',
    description: "Des impulsions personnalisées pour adapter ton plan, tes affirmations et tes actions à ton état du jour.",
    color: '#f472b6',
    planRequired: 'starter',
    adminStatus: 'actif',
    adminUsage: 82,
    features: [
      { name: 'État du Jour',            icon: '🧭', desc: "Note ton énergie et ton état du moment pour adapter ton plan." },
      { name: 'Affirmation Personnalisée',icon: '💬', desc: "Une phrase alignée avec ton objectif et ton état réel." },
      { name: 'Action Adaptée',          icon: '⚡', desc: "Une action concrète calibrée à ton énergie du moment." },
      { name: 'Clarté Mentale',          icon: '🪟', desc: "Libère ton esprit des pensées parasites en 2 minutes." },
      { name: 'Plan Adapté',             icon: '🗂️', desc: "Ton plan du jour ajusté à ce que tu peux réellement faire." },
      { name: 'Rappel Future Me',        icon: '🌟', desc: "Reconnecte-toi à qui tu veux devenir avant de commencer." },
    ],
  },
  {
    id: 'future-me',
    name: 'Future Me',
    icon: '🌟',
    description: "Relie chaque action du jour à la personne que tu veux devenir. Ta vision, ton identité et tes rappels alignés.",
    color: '#a78bfa',
    planRequired: 'builder',
    adminStatus: 'en développement',
    adminUsage: 45,
    features: [
      { name: 'Ma Vision',                  icon: '🔭', desc: "Décris avec précision la vie que tu veux créer dans 12 mois." },
      { name: 'Pourquoi Je Veux Changer',   icon: '💠', desc: "Comprends ce qui te pousse à construire quelque chose de nouveau." },
      { name: 'Lettre à Mon Futur Moi',     icon: '📜', desc: "Écris à la personne que tu vas devenir. Reviens la lire quand c'est dur." },
      { name: "Identité en Construction",   icon: '🦋', desc: "Définis qui tu deviens jour après jour, action après action." },
      { name: 'Rappels Future Me',          icon: '🔔', desc: "Des rappels courts pour reconnecter tes actions à ta vision." },
      { name: 'Mes Valeurs',                icon: '⚓', desc: "Ce qui compte vraiment pour toi — ton boussole intérieure." },
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
    badge: 'S',
    color: '#60a5fa',
    price: 'Gratuit',
    modules: MODULES.filter((m) => m.planRequired === 'starter').map((m) => m.id),
  },
  builder: {
    name: 'Builder',
    badge: 'B',
    color: '#a78bfa',
    price: '19 €/mois',
    modules: MODULES.filter((m) => ['starter', 'builder'].includes(m.planRequired)).map((m) => m.id),
  },
  pro: {
    name: 'Pro',
    badge: 'P',
    color: '#c4b5fd',
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

export const STATUS_LABELS = { actif: "Actif", essai: "En essai", expiré: "Expiré" }

/* ── Dev mode switcher options ── */
export const DEV_MODES = [
  { label: "Landing",  view: "landing", icon: "🏠" },
  { label: "Starter",  view: "app",     plan: "starter", icon: "🌱" },
  { label: "Builder",  view: "app",     plan: "builder", icon: "🔨" },
  { label: "Pro",      view: "app",     plan: "pro",     icon: "⚡" },
  { label: "Admin",    view: "admin",   icon: "🛡️" },
]
