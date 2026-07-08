/* ══════════════════════════════════════════
   AIxoria Nexus — données de démonstration
   (mock local, aucun backend connecté)
   ══════════════════════════════════════════ */

export const NEXUS_STATS = [
  { id: 'agents',        icon: 'agents',      label: 'Agents actifs',         value: '3',        sub: 'sur 4 déployés',        accent: 'blue'   },
  { id: 'actions',       icon: 'validate',    label: 'Actions à valider',     value: '7',        sub: 'en attente',            accent: 'purple' },
  { id: 'errors',        icon: 'alert',       label: 'Erreurs détectées',     value: '2',        sub: 'sur les 7 derniers jours', accent: 'amber' },
  { id: 'time',          icon: 'clock',       label: 'Temps économisé',       value: '14h',      sub: 'ce mois-ci',            accent: 'blue'   },
  { id: 'opportunities', icon: 'opportunity', label: 'Opportunités estimées', value: '2 850 €',  sub: "potentiel ce mois-ci",  accent: 'purple' },
]

export const NEXUS_AGENTS = [
  {
    id: 'receptionist',
    icon: 'receptionist',
    name: 'Agent Réceptionniste',
    status: 'active',
    health: 96,
    lastActivity: 'Il y a 12 min — a répondu à 4 nouveaux messages clients',
    description: 'Accueille vos clients, répond aux questions fréquentes et qualifie les demandes entrantes, 24h/24.',
    channel: 'Site web · WhatsApp',
    actionsThisMonth: 182,
    uptime: '99.8 %',
  },
  {
    id: 'relance',
    icon: 'relance',
    name: 'Agent Relance',
    status: 'active',
    health: 88,
    lastActivity: 'Il y a 1 h — a relancé 6 clients inactifs',
    description: 'Relance automatiquement les clients silencieux ainsi que les devis et paniers en attente.',
    channel: 'Email · SMS',
    actionsThisMonth: 94,
    uptime: '99.1 %',
  },
  {
    id: 'content',
    icon: 'content',
    name: 'Agent Contenu',
    status: 'review',
    health: 71,
    lastActivity: 'Il y a 3 h — a généré 2 publications à valider',
    description: 'Rédige vos publications, descriptions et réponses aux avis selon le ton de votre marque.',
    channel: 'Réseaux sociaux · Avis Google',
    actionsThisMonth: 47,
    uptime: '97.4 %',
  },
  {
    id: 'appointment',
    icon: 'appointment',
    name: 'Agent Rendez-vous',
    status: 'active',
    health: 92,
    lastActivity: 'Il y a 40 min — a confirmé 3 rendez-vous',
    description: 'Planifie, confirme et rappelle les rendez-vous clients en lien avec votre agenda.',
    channel: 'Google Calendar · SMS',
    actionsThisMonth: 63,
    uptime: '99.5 %',
  },
]

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

export const NEXUS_IMPACT_STATS = [
  { id: 'time',        icon: 'clock',       label: 'Temps économisé',      value: '14h',  sub: 'ce mois-ci',         accent: 'blue'   },
  { id: 'opportunity', icon: 'opportunity', label: 'Opportunités estimées', value: '2 850 €', sub: 'potentiel ce mois-ci', accent: 'purple' },
  { id: 'requests',    icon: 'validate',    label: 'Demandes traitées',    value: '286',  sub: 'ce mois-ci',         accent: 'blue'   },
  { id: 'followups',   icon: 'agents',      label: 'Relances préparées',   value: '58',   sub: 'ce mois-ci',         accent: 'purple' },
]

export const NEXUS_IMPACT_WEEKLY = [
  { label: 'S1', value: 42 },
  { label: 'S2', value: 58 },
  { label: 'S3', value: 51 },
  { label: 'S4', value: 74 },
  { label: 'S5', value: 68 },
  { label: 'S6', value: 89 },
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
