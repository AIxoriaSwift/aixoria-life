/* ══════════════════════════════════════════
   AIxoria Nexus — données de démonstration
   (mock local, aucun backend connecté)
   ══════════════════════════════════════════ */

export const NEXUS_PENDING_ACTIONS = [
  {
    id: 'a1',
    type: 'relance',
    title: 'Relance client — Julie M.',
    agent: 'Agent Relance',
    description: "Message de relance prêt pour un devis envoyé il y a 5 jours, resté sans réponse.",
    message: "Bonjour Julie, je me permets de revenir vers vous concernant le devis envoyé le 3 juillet. Souhaitez-vous que nous en discutions cette semaine ? Je reste à votre disposition.",
    time: 'Il y a 20 min',
  },
  {
    id: 'a2',
    type: 'avis',
    title: 'Réponse à un avis négatif',
    agent: 'Agent Contenu',
    description: "Réponse proposée pour l'avis 2★ laissé par un client sur Google.",
    message: "Bonjour, merci pour votre retour. Nous sommes désolés que votre expérience n'ait pas été à la hauteur de vos attentes. Pourriez-vous nous contacter directement afin que nous puissions corriger la situation ?",
    time: 'Il y a 1 h',
  },
  {
    id: 'a3',
    type: 'rdv',
    title: 'Confirmation de rendez-vous',
    agent: 'Agent Réceptionniste',
    description: 'Confirmation à envoyer pour le rendez-vous du 12 juillet à 14h30.',
    message: "Bonjour, votre rendez-vous est confirmé pour le 12 juillet à 14h30. Vous recevrez un rappel la veille. À très bientôt !",
    time: 'Il y a 2 h',
  },
  {
    id: 'a4',
    type: 'relance',
    title: 'Relance panier — Marc D.',
    agent: 'Agent Relance',
    description: 'Panier abandonné depuis 3 jours, relance prête à envoyer.',
    message: "Bonjour Marc, vous avez laissé un article dans votre panier. Il est toujours disponible — souhaitez-vous finaliser votre commande ? N'hésitez pas si vous avez des questions.",
    time: 'Il y a 3 h',
  },
  {
    id: 'a5',
    type: 'avis',
    title: 'Réponse à un avis positif',
    agent: 'Agent Contenu',
    description: 'Réponse de remerciement proposée pour un avis 5★.',
    message: "Merci beaucoup pour votre retour, cela nous fait très plaisir ! Au plaisir de vous accueillir à nouveau très bientôt.",
    time: 'Il y a 5 h',
  },
  {
    id: 'a6',
    type: 'rdv',
    title: 'Rappel de rendez-vous',
    agent: 'Agent Rendez-vous',
    description: 'Rappel à envoyer pour le rendez-vous de demain 9h00.',
    message: "Bonjour, un petit rappel : votre rendez-vous est prévu demain à 9h00. À demain !",
    time: 'Il y a 6 h',
  },
]

function pendingCountFor(agentName) {
  return NEXUS_PENDING_ACTIONS.filter((a) => a.agent === agentName).length
}

export const NEXUS_AGENTS = [
  {
    id: 'receptionist',
    icon: 'receptionist',
    name: 'Agent Réceptionniste',
    status: 'active',
    health: 96,
    lastActivity: 'Il y a 12 min — a répondu à 4 nouveaux messages clients',
    description: 'Accueille vos clients, répond aux questions fréquentes et qualifie les demandes entrantes, 24h/24.',
    mission: "Accueillir chaque client entrant, répondre aux questions fréquentes et qualifier les demandes avant de les transmettre à l'équipe si nécessaire.",
    channel: 'Site web · WhatsApp',
    actionsThisMonth: 182,
    pendingActionsCount: pendingCountFor('Agent Réceptionniste'),
    recentErrors: [],
    estimatedImpact: '6h économisées ce mois-ci',
    memoryUsed: ['Informations entreprise', 'Horaires', 'Services', 'Ton de communication'],
    rules: [
      'Toujours proposer une alternative si un créneau est indisponible.',
      'Ne jamais confirmer un rendez-vous sans vérifier la disponibilité réelle.',
    ],
    recentActionsList: [
      { text: 'A répondu à 4 nouveaux messages clients', time: 'Il y a 12 min' },
      { text: 'A qualifié une demande de devis', time: 'Il y a 1 h' },
      { text: "A transféré une demande complexe à l'équipe", time: 'Il y a 3 h' },
    ],
    recommendations: [
      'Ajouter un canal Instagram DM pour élargir la couverture.',
      'Activer les réponses vocales pour les appels manqués.',
    ],
  },
  {
    id: 'relance',
    icon: 'relance',
    name: 'Agent Relance',
    status: 'active',
    health: 88,
    lastActivity: 'Il y a 1 h — a relancé 6 clients inactifs',
    description: 'Relance automatiquement les clients silencieux ainsi que les devis et paniers en attente.',
    mission: 'Relancer automatiquement les clients silencieux, les devis et paniers en attente pour maximiser les conversions.',
    channel: 'Email · SMS',
    actionsThisMonth: 94,
    pendingActionsCount: pendingCountFor('Agent Relance'),
    recentErrors: [],
    estimatedImpact: "1 200 € d'opportunités ce mois-ci",
    memoryUsed: ['Informations entreprise', 'Ton de communication', 'Règles importantes'],
    rules: [
      'Ne jamais relancer plus de deux fois le même client sans réponse.',
      'Adapter le ton selon le délai depuis le dernier contact.',
    ],
    recentActionsList: [
      { text: 'A relancé 6 clients inactifs', time: 'Il y a 1 h' },
      { text: 'A relancé un panier abandonné (Marc D.)', time: 'Il y a 3 h' },
      { text: 'A détecté 2 devis sans réponse depuis 5 jours', time: 'Il y a 5 h' },
    ],
    recommendations: [
      'Tester un délai de relance plus court pour les paniers abandonnés.',
      'Segmenter les relances selon la valeur du devis.',
    ],
  },
  {
    id: 'content',
    icon: 'content',
    name: 'Agent Contenu',
    status: 'review',
    health: 71,
    lastActivity: 'Il y a 3 h — a généré 2 publications à valider',
    description: 'Rédige vos publications, descriptions et réponses aux avis selon le ton de votre marque.',
    mission: 'Rédiger les publications, descriptions et réponses aux avis clients en respectant le ton de la marque.',
    channel: 'Réseaux sociaux · Avis Google',
    actionsThisMonth: 47,
    pendingActionsCount: pendingCountFor('Agent Contenu'),
    recentErrors: [
      { message: 'Une réponse générée ne respectait pas le ton défini.', time: 'Hier' },
    ],
    estimatedImpact: '3h économisées ce mois-ci',
    memoryUsed: ['Ton de communication', 'Phrases interdites', 'Services'],
    rules: [
      'Ne jamais utiliser une phrase de la liste interdite.',
      'Toujours relire le ton avant publication.',
    ],
    recentActionsList: [
      { text: 'A généré 2 publications à valider', time: 'Il y a 3 h' },
      { text: 'A proposé une réponse à un avis négatif', time: 'Il y a 1 h' },
      { text: 'A proposé une réponse à un avis positif', time: 'Il y a 5 h' },
    ],
    recommendations: [
      'Varier davantage les formulations pour éviter la répétition.',
      'Ajouter des visuels suggérés aux publications.',
    ],
  },
  {
    id: 'appointment',
    icon: 'appointment',
    name: 'Agent Rendez-vous',
    status: 'error',
    health: 54,
    lastActivity: 'Il y a 40 min — a confirmé 3 rendez-vous',
    description: 'Planifie, confirme et rappelle les rendez-vous clients en lien avec votre agenda.',
    mission: "Planifier, confirmer et rappeler les rendez-vous clients en synchronisation avec l'agenda de l'entreprise.",
    channel: 'Google Calendar · SMS',
    actionsThisMonth: 63,
    pendingActionsCount: pendingCountFor('Agent Rendez-vous'),
    recentErrors: [
      { message: 'Échec de synchronisation avec Google Calendar.', time: 'Il y a 2 h' },
    ],
    estimatedImpact: "2h économisées ce mois-ci — réduit par l'erreur de synchronisation",
    memoryUsed: ['Horaires', 'Règles importantes'],
    rules: [
      'Toujours vérifier la disponibilité réelle avant de confirmer.',
      "Mentionner le délai d'annulation gratuite (24h).",
    ],
    recentActionsList: [
      { text: 'A confirmé 3 rendez-vous', time: 'Il y a 40 min' },
      { text: 'Synchronisation Google Calendar en échec', time: 'Il y a 2 h' },
      { text: 'A envoyé un rappel de rendez-vous', time: 'Il y a 6 h' },
    ],
    recommendations: [
      'Vérifier la synchronisation Google Calendar.',
      "Ajouter une alerte automatique en cas de nouvel échec de synchronisation.",
    ],
  },
]

export const NEXUS_STATS = [
  {
    id: 'agents', icon: 'agents', label: 'Agents actifs',
    value: String(NEXUS_AGENTS.filter((a) => a.status === 'active').length),
    sub: `sur ${NEXUS_AGENTS.length} déployés`, accent: 'blue',
  },
  {
    id: 'actions', icon: 'validate', label: 'Actions à valider',
    value: String(NEXUS_PENDING_ACTIONS.length),
    sub: 'en attente', accent: 'purple',
  },
  {
    id: 'errors', icon: 'alert', label: 'Erreurs détectées',
    value: String(NEXUS_AGENTS.reduce((n, a) => n + a.recentErrors.length, 0)),
    sub: 'sur les 7 derniers jours', accent: 'amber',
  },
  { id: 'time',          icon: 'clock',       label: 'Temps économisé',       value: '14h',      sub: 'ce mois-ci',            accent: 'blue'   },
  { id: 'opportunities', icon: 'opportunity', label: 'Opportunités estimées', value: '2 850 €',  sub: "potentiel ce mois-ci",  accent: 'purple' },
]

export const NEXUS_IMPACT_STATS = [
  { id: 'time',        icon: 'clock',       label: 'Temps économisé',   value: '14h',       sub: 'ce mois-ci', accent: 'blue'   },
  { id: 'requests',    icon: 'agents',      label: 'Demandes traitées', value: '126',       sub: 'ce mois-ci', accent: 'blue'   },
  { id: 'validated',   icon: 'validate',    label: 'Actions validées',  value: '38',        sub: 'ce mois-ci', accent: 'purple' },
  { id: 'opportunity', icon: 'opportunity', label: 'Opportunités estimées', value: "2'850 CHF", sub: 'estimées ce mois-ci', accent: 'purple' },
]

export const NEXUS_IMPACT_SUMMARY = {
  hours: '14h',
  requests: 126,
  opportunities: "2'850",
  currency: 'CHF',
}

export const NEXUS_IMPACT_DAILY = [
  { label: 'Lun', requests: 12, validations: 4 },
  { label: 'Mar', requests: 18, validations: 6 },
  { label: 'Mer', requests: 21, validations: 7 },
  { label: 'Jeu', requests: 16, validations: 5 },
  { label: 'Ven', requests: 24, validations: 9 },
  { label: 'Sam', requests: 9,  validations: 3 },
  { label: 'Dim', requests: 14, validations: 4 },
]

export const NEXUS_IMPACT_BY_AGENT = [
  {
    id: 'receptionist', icon: 'receptionist', name: 'Agent Réceptionniste',
    metrics: [
      { label: 'Économisées', value: '6h' },
      { label: 'Demandes traitées', value: '42' },
    ],
  },
  {
    id: 'relance', icon: 'relance', name: 'Agent Relance',
    metrics: [
      { label: 'Opportunités estimées', value: "1'200 CHF" },
      { label: 'Relances préparées', value: '18' },
    ],
  },
  {
    id: 'content', icon: 'content', name: 'Agent Contenu',
    metrics: [
      { label: 'Économisées', value: '3h' },
      { label: 'Contenus générés', value: '12' },
    ],
  },
  {
    id: 'appointment', icon: 'appointment', name: 'Agent Rendez-vous',
    metrics: [
      { label: 'Économisées', value: '2h' },
      { label: 'Rendez-vous gérés', value: '8' },
    ],
  },
]

export const NEXUS_IMPACT_AVOIDED = [
  {
    id: 'sensitive',
    icon: 'shield',
    count: 2,
    text: 'conversations sensibles envoyées sans validation automatique',
  },
  {
    id: 'error',
    icon: 'alert',
    count: 1,
    text: "erreur d'automatisation détectée avant impact client",
  },
  {
    id: 'forgotten',
    icon: 'clock',
    count: 3,
    text: 'relances oubliées remises en attente de validation',
  },
]

export const NEXUS_MEMORY = {
  company: {
    name: 'AIxoria Café & Co',
    sector: 'Restauration',
    address: '12 rue du Rhône, 1204 Genève',
    website: 'www.aixoria-cafe.ch',
  },
  hours: [
    { day: 'Lundi',    value: '8h00 – 18h00' },
    { day: 'Mardi',    value: '8h00 – 18h00' },
    { day: 'Mercredi', value: '8h00 – 18h00' },
    { day: 'Jeudi',    value: '8h00 – 18h00' },
    { day: 'Vendredi', value: '8h00 – 20h00' },
    { day: 'Samedi',   value: '9h00 – 20h00' },
    { day: 'Dimanche', value: 'Fermé' },
  ],
  services: [
    'Réservation de table',
    'Commande à emporter',
    'Livraison à domicile',
    'Événements privés',
  ],
  tone: 'premium et posé',
  toneOptions: [
    { value: 'doux et rassurant',   label: 'Doux et rassurant' },
    { value: 'direct et challengeant', label: 'Direct et challengeant' },
    { value: 'premium et posé',     label: 'Premium et posé' },
    { value: 'chaleureux',          label: 'Chaleureux et proche' },
  ],
  rules: [
    'Toujours proposer une alternative si un créneau est indisponible.',
    'Ne jamais confirmer un rendez-vous sans vérifier la disponibilité réelle.',
    "Mentionner systématiquement le délai d'annulation gratuite (24h).",
  ],
  forbiddenPhrases: [
    'Ce n\'est pas possible',
    'Ce n\'est pas mon problème',
    'Je ne sais pas',
  ],
}

export const NEXUS_AUTOMATIONS = [
  {
    id: 'w1',
    name: 'Formulaire site → Agent Réceptionniste',
    source: 'Formulaire site',
    status: 'ok',
    lastRun: 'Il y a 8 min',
  },
  {
    id: 'w2',
    name: 'Relance devis n8n',
    source: 'n8n',
    status: 'ok',
    lastRun: 'Il y a 25 min',
  },
  {
    id: 'w3',
    name: 'Synchronisation Google Calendar',
    source: 'Google Calendar',
    status: 'error',
    lastRun: 'Il y a 2 h',
  },
  {
    id: 'w4',
    name: 'Publication réseaux sociaux',
    source: 'n8n',
    status: 'pending',
    lastRun: 'Il y a 6 h',
  },
  {
    id: 'w5',
    name: 'Import avis Google',
    source: 'Formulaire site',
    status: 'ok',
    lastRun: 'Il y a 1 h',
  },
]

export const NEXUS_PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: '24.90',
    period: 'CHF/mois',
    tag: null,
    description: 'Pour démarrer avec un premier agent IA.',
    features: [
      '1 agent IA actif',
      "Jusqu'à 100 actions / mois",
      'Validations manuelles',
      'Support par email',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '59.90',
    period: 'CHF/mois',
    tag: 'Recommandé',
    description: 'Pour piloter plusieurs agents avec un vrai suivi d\'impact.',
    features: [
      "Jusqu'à 4 agents IA actifs",
      'Actions illimitées',
      'Mémoire IA personnalisée',
      'Rapport d\'impact mensuel',
      'Support prioritaire',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 'dès 199',
    period: 'CHF/mois',
    tag: null,
    description: 'Pour les entreprises avec des besoins avancés et sur mesure.',
    features: [
      'Agents IA illimités',
      'Automatisations avancées (n8n, API)',
      'Mémoire IA multi-équipes',
      'Accompagnement dédié',
      'Support 7j/7',
    ],
  },
]

/* ══════════════════════════════════════════
   VUE GLOBALE NEXUS — tendance combinée 30 jours
   (activité agents + validations + opportunités,
   indexées en un score composite 0-100 pour la courbe)
   ══════════════════════════════════════════ */
function buildGlobalTrend() {
  const days = 30
  const trend = []
  for (let i = 0; i < days; i++) {
    const progress = i / (days - 1)
    const wobble = Math.sin(i / 2.3) * 6 + Math.sin(i / 5.7) * 3
    const value       = Math.round(Math.min(100, Math.max(28, 52 + progress * 24 + wobble)))
    const activity     = Math.round(58 + progress * 92 + Math.sin(i / 2.1) * 14)
    const validations  = Math.round(6 + progress * 14 + Math.sin(i / 2.6) * 3)
    const opportunities = Math.round(1400 + progress * 2600 + Math.sin(i / 3.1) * 400)
    trend.push({ day: i + 1, value, activity, validations, opportunities })
  }
  return trend
}

export const NEXUS_GLOBAL_TREND = buildGlobalTrend()
export const NEXUS_GLOBAL_TREND_DELTA = '+18%'
