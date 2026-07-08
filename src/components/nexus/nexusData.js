/* ══════════════════════════════════════════
   AIxoria Nexus — données de démonstration
   (mock local, aucun backend connecté)
   ══════════════════════════════════════════ */

export const NEXUS_STATS = [
  { id: 'agents',        icon: 'agents',      label: 'Agents actifs',         value: '3',        sub: 'sur 3 déployés',        accent: 'blue'   },
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
  },
  {
    id: 'relance',
    icon: 'relance',
    name: 'Agent Relance',
    status: 'active',
    health: 88,
    lastActivity: 'Il y a 1 h — a relancé 6 clients inactifs',
    description: 'Relance automatiquement les clients silencieux ainsi que les devis et paniers en attente.',
  },
  {
    id: 'content',
    icon: 'content',
    name: 'Agent Contenu',
    status: 'review',
    health: 71,
    lastActivity: 'Il y a 3 h — a généré 2 publications à valider',
    description: 'Rédige vos publications, descriptions et réponses aux avis selon le ton de votre marque.',
  },
]

export const NEXUS_PENDING_ACTIONS = [
  {
    id: 'a1',
    type: 'relance',
    title: 'Relance client — Julie M.',
    agent: 'Agent Relance',
    description: "Message de relance prêt pour un devis envoyé il y a 5 jours, resté sans réponse.",
    time: 'Il y a 20 min',
  },
  {
    id: 'a2',
    type: 'avis',
    title: 'Réponse à un avis négatif',
    agent: 'Agent Contenu',
    description: "Réponse proposée pour l'avis 2★ laissé par un client sur Google.",
    time: 'Il y a 1 h',
  },
  {
    id: 'a3',
    type: 'rdv',
    title: 'Confirmation de rendez-vous',
    agent: 'Agent Réceptionniste',
    description: 'Confirmation à envoyer pour le rendez-vous du 12 juillet à 14h30.',
    time: 'Il y a 2 h',
  },
]
