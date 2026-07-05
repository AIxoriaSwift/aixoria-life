import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import BrandLogo from '../components/BrandLogo'
import PlanBadge from '../components/PlanBadge'
import { IconArrow, IconBack, IconLock, IconX } from '../components/icons'
import { MODULES, PLAN_CONFIG } from '../data'
import { loadAccount, loadSession, clearSession } from '../auth'

/* ══════════════════════════════════════════
   PROFIL — localStorage + défauts
   ══════════════════════════════════════════ */
const PROFILE_KEY = 'aixoria_life_profile'

const DEFAULT_USER = {
  name:                "",
  role:                "client",
  plan:                "builder",
  gender:              "female",
  situations:          [],
  goals:               [],
  blockers:            [],
  lifeSeasons:         [],
  motivationStyle:     '',
  lifeGoal:            '',
  mainProject:         '',
  projectStage:        '',
  currentFocus:        '',
  next30DaysGoal:      '',
  spiritualPreference: 'neutral',
}

function loadProfile() {
  try {
    const account = loadAccount()
    const source  = account?.profile || null
    const legacyRaw = localStorage.getItem(PROFILE_KEY)
    const legacy    = legacyRaw ? JSON.parse(legacyRaw) : null
    const parsed    = source || legacy

    if (parsed) {
      const motivationStyle = parsed.motivationStyle
        || (Array.isArray(parsed.motivationStyles) ? parsed.motivationStyles[0] : '')
        || ''
      return {
        ...DEFAULT_USER,
        name: account?.name || parsed.name || DEFAULT_USER.name,
        ...parsed,
        goals:          parsed.goals       || (parsed.goal        ? [parsed.goal]        : []),
        situations:     parsed.situations  || (parsed.situation   ? [parsed.situation]   : []),
        blockers:       parsed.blockers    || (parsed.mainBlocker ? [parsed.mainBlocker] : []),
        lifeSeasons:    parsed.lifeSeasons || (parsed.lifeSeason  ? [parsed.lifeSeason]  : []),
        motivationStyle,
      }
    }
    if (account) return { ...DEFAULT_USER, name: account.name }
  } catch { /* ignore */ }
  return DEFAULT_USER
}

/* ══════════════════════════════════════════
   ACCORD GRAMMATICAL
   agree(gender, feminin, masculin, neutre)
   ══════════════════════════════════════════ */
function agree(gender, female, male, neutral) {
  if (gender === 'male')    return male
  if (gender === 'neutral') return neutral ?? female
  return female
}

/* ── Dev plan switcher ── */
const PLAN_OPTS = [
  { label: "Starter", plan: "starter" },
  { label: "Builder", plan: "builder" },
  { label: "Pro",     plan: "pro"     },
]

/* ══════════════════════════════════════════
   LIFE PULSE — messages genrés
   ══════════════════════════════════════════ */
const PULSE_MESSAGES = [
  {
    female:  "Tu n'as pas besoin d'être parfaite aujourd'hui. Tu dois juste rester alignée avec la personne que tu veux devenir.",
    male:    "Tu n'as pas besoin d'être parfait aujourd'hui. Tu dois juste rester aligné avec la personne que tu veux devenir.",
    neutral: "Tu n'as pas besoin que tout soit parfait aujourd'hui. Reste aligné avec la personne que tu veux devenir.",
    category: "Mindset", moment: "Matin",
  },
  {
    female:  "Sois fière de toi : tu avances même quand ce n'est pas facile.",
    male:    "Sois fier de toi : tu avances même quand ce n'est pas facile.",
    neutral: "Reconnais ton effort : tu avances même quand ce n'est pas facile.",
    category: "Discipline", moment: "Journée",
  },
  {
    female:  "Tu n'es pas en retard. Tu es à une décision d'être la personne que tu veux devenir.",
    male:    "Tu n'es pas en retard. Tu es à une décision d'être la personne que tu veux devenir.",
    neutral: "Tu n'es pas en retard. Tu es à une décision de reprendre le contrôle.",
    category: "Future Me", moment: "Soir",
  },
  {
    female:  "Ton futur ne se construit pas avec de grandes promesses, mais avec de petites actions répétées.",
    male:    "Ton futur ne se construit pas avec de grandes promesses, mais avec de petites actions répétées.",
    neutral: "Ton futur ne se construit pas avec de grandes promesses, mais avec de petites actions répétées.",
    category: "Motivation", moment: "Journée",
  },
  {
    female:  "La confiance ne se trouve pas. Elle se construit par chaque action que tu oses faire.",
    male:    "La confiance ne se trouve pas. Elle se construit par chaque action que tu oses faire.",
    neutral: "La confiance ne se trouve pas. Elle se construit par chaque action que tu oses faire.",
    category: "Confiance", moment: "Matin",
  },
]

/* ══════════════════════════════════════════
   DÉBLOCAGE — 3 situations
   ══════════════════════════════════════════ */
const UNBLOCK_DATA = {
  procrastine: {
    title: { female: "Stop à la procrastination", male: "Stop à la procrastination", neutral: "Stop à la procrastination" },
    message: {
      female:  "Tu n'as pas besoin d'être parfaite. Choisis une action de 5 minutes et commence maintenant.",
      male:    "Tu n'as pas besoin d'être parfait. Choisis une action de 5 minutes et commence maintenant.",
      neutral: "Inutile que tout soit parfait. Choisis une action de 5 minutes et commence maintenant.",
    },
    micro: "Lance un timer de 25 minutes sur ta tâche la plus simple.",
  },
  doute: {
    title: {
      female:  "Tu peux être fière de toi",
      male:    "Tu peux être fier de toi",
      neutral: "Reconnais ton effort",
    },
    message: {
      female:  "Celles qui réussissent ne doutent pas moins. Elles avancent malgré le doute.",
      male:    "Ceux qui réussissent ne doutent pas moins. Ils avancent malgré le doute.",
      neutral: "Les personnes qui réussissent ne doutent pas moins. Elles avancent malgré le doute.",
    },
    micro: "Écris une chose que tu as bien faite cette semaine.",
  },
  project: {
    title: { female: "Avancer sur ton projet", male: "Avancer sur ton projet", neutral: "Avancer sur ton projet" },
    message: {
      female:  "Commence par le plus simple : qui veux-tu aider ? La réponse à cette question est ton offre.",
      male:    "Commence par le plus simple : qui veux-tu aider ? La réponse à cette question est ton offre.",
      neutral: "Commence par le plus simple : qui veux-tu aider ? La réponse à cette question est ton offre.",
    },
    micro: "Définis ton client idéal en une phrase. Maintenant.",
  },
}

/* ══════════════════════════════════════════
   CHECK-IN — états du jour
   ══════════════════════════════════════════ */
const CHECK_IN_OPTIONS = [
  { key: 'fatigue',   female: 'Fatiguée',  male: 'Fatigué',  neutral: 'Fatigué(e)' },
  { key: 'dispersee', female: 'Dispersée', male: 'Dispersé', neutral: 'Dispersé(e)' },
  { key: 'motivee',   female: 'Motivée',   male: 'Motivé',   neutral: 'Motivé(e)'   },
  { key: 'stressee',  female: 'Stressée',  male: 'Stressé',  neutral: 'Stressé(e)'  },
  { key: 'bloquee',   female: 'Bloquée',   male: 'Bloqué',   neutral: 'Bloqué(e)'   },
  { key: 'confiante', female: 'Confiante', male: 'Confiant', neutral: 'Confiant(e)' },
]

const CHECKIN_PRIORITY = {
  fatigue:   { title: "Choisis ta tâche la plus simple.",    sub: "Quand l'énergie est basse, avancer de 10 % vaut mieux que de ne pas avancer." },
  dispersee: { title: "Une seule chose. Maintenant.",         sub: "Une seule action bien choisie vaut mieux qu'une journée remplie de dispersion." },
  motivee:   { title: "Lance-toi sur ton action principale.", sub: "Tu es dans ta meilleure énergie. C'est le moment pour ce qui compte vraiment." },
  stressee:  { title: "Écris ce qui t'occupe l'esprit.",     sub: "Pose les 3 choses qui te pèsent. Puis choisis-en une seule à faire." },
  bloquee:   { title: "Fais une micro-action de 5 minutes.", sub: "Le début est toujours le plus difficile. 5 minutes pour démarrer." },
  confiante: { title: "Clarifie ton offre en une phrase.",   sub: "Tu es dans un bon état. C'est le moment pour avancer sur ce qui construit ton avenir." },
}

const DEFAULT_PRIORITY = {
  title: "Clarifie ton offre en une phrase.",
  sub:   "Une seule action claire vaut mieux qu'une journée remplie de dispersion.",
}

/* ── Messages adaptés au check-in (pour NextStepCard) ── */
const CHECKIN_ACTION_MESSAGES = {
  fatigue:   "Fais une action légère de 5 minutes pour garder le rythme.",
  dispersee: "Choisis une seule priorité. Le reste peut attendre.",
  motivee:   "Utilise ton énergie pour avancer 30 minutes sur une action qui crée un vrai résultat.",
  stressee:  "Décharge ce que tu as en tête, puis choisis une seule prochaine étape.",
  bloquee:   "Ouvre ton espace de travail et commence par la première micro-action.",
  confiante: "Fais une action visible aujourd'hui : publier, contacter, proposer ou vendre.",
}

const ACTION_MODAL_STEPS = [
  "Prépare ton espace",
  "Lance un timer de 10 minutes",
  "Fais uniquement cette action",
]

const PILLAR_DESCS = {
  confidence: "Oser te montrer, parler, vendre et croire en ta légitimité.",
  discipline: "Créer une constance réaliste, même quand la motivation baisse.",
  planner:    "Transformer le chaos mental en plan clair.",
  business:   "Structurer ton activité, ton offre et tes premières actions.",
}

const UNBLOCK_BTN_ITEMS = [
  { key: 'doute',       label: 'Je doute de moi' },
  { key: 'procrastine', label: 'Je procrastine' },
  { key: 'jugement',    label: "J'ai peur d'être jugé(e)" },
  { key: 'sais_pas',    label: 'Je ne sais pas par où commencer' },
]

const UNBLOCK_DETAIL = {
  doute: {
    feeling:    "Tu attends peut-être de te sentir légitime avant d'agir.",
    meaning:    "La confiance ne vient pas avant l'action. Elle vient souvent après les premières preuves.",
    microAction: "Écris une preuve que tu as déjà appris ou réussi quelque chose de difficile.",
  },
  procrastine: {
    feeling:    "L'action te paraît trop grande ou trop floue pour commencer.",
    meaning:    "Tu n'as pas besoin de tout faire. Tu dois juste trouver l'entrée la plus petite possible.",
    microAction: "Ouvre ton document ou tes notes et écris seulement le titre ou la première ligne.",
  },
  jugement: {
    feeling:    "Tu hésites à te montrer ou à partager ce que tu construis.",
    meaning:    "La visibilité se construit progressivement. Personne ne s'attend à la perfection.",
    microAction: "Écris une idée de contenu dans tes notes privées — sans la publier.",
  },
  sais_pas: {
    feeling:    "Tu as peut-être trop de choses en tête en même temps.",
    meaning:    "Il te faut une seule question : quelle est la prochaine action la plus petite possible ?",
    microAction: "Complète cette phrase : \"La seule chose que je peux faire maintenant c'est ___.\"",
  },
}

/* ══════════════════════════════════════════
   MODULES — mapping affichage
   ══════════════════════════════════════════ */
const PILLARS     = ['confidence', 'discipline', 'planner', 'business']
const COMPLEMENTS = ['future-me', 'life-pulse', 'content', 'finance']
const MODULE_LABELS = {
  confidence:   'Confiance',
  discipline:   'Discipline',
  planner:      'Organisation',
  business:     'Business Builder',
  'future-me':  'Future Me',
  'life-pulse': 'Life Pulse',
  content:      'Contenu',
  finance:      'Finance',
}

/* ══════════════════════════════════════════
   GENDER OPTIONS (pour paramètres)
   ══════════════════════════════════════════ */
const GENDER_OPTIONS = [
  { value: 'female',  label: 'Féminin',  example: 'parfaite, prête, fière' },
  { value: 'male',    label: 'Masculin', example: 'parfait, prêt, fier' },
  { value: 'neutral', label: 'Neutre',   example: 'tout soit parfait' },
]

/* ══════════════════════════════════════════
   BILAN DU SOIR — constantes + localStorage
   ══════════════════════════════════════════ */
const YESTERDAY_KEY = 'aixoria_bilan_veille'

const MOOD_BILAN_OPTIONS = [
  { key: 'fatigue',    female: 'Fatiguée',   male: 'Fatigué',   neutral: 'Fatigué(e)'   },
  { key: 'dispersee',  female: 'Dispersée',  male: 'Dispersé',  neutral: 'Dispersé(e)'  },
  { key: 'motivee',    female: 'Motivée',    male: 'Motivé',    neutral: 'Motivé(e)'    },
  { key: 'stresse',    female: 'Stressée',   male: 'Stressé',   neutral: 'Stressé(e)'   },
  { key: 'bloquee',    female: 'Bloquée',    male: 'Bloqué',    neutral: 'Bloqué(e)'    },
  { key: 'confiante',  female: 'Confiante',  male: 'Confiant',  neutral: 'Confiant(e)'  },
  { key: 'fiere',      female: 'Fière',      male: 'Fier',      neutral: 'Fier(e)'      },
  { key: 'decouragee', female: 'Découragée', male: 'Découragé', neutral: 'Découragé(e)' },
]

const BLOCKER_BILAN_OPTIONS = [
  { key: 'procrastination', label: 'Procrastination'         },
  { key: 'doute',           label: 'Doute'                   },
  { key: 'peur_jugement',   label: 'Peur du jugement'        },
  { key: 'manque_clarte',   label: 'Manque de clarté'        },
  { key: 'fatigue',         label: 'Fatigue'                 },
  { key: 'trop_de_choses',  label: 'Trop de choses à gérer'  },
  { key: 'manque_temps',    label: 'Manque de temps'         },
]

const FOCUS_BILAN_OPTIONS = [
  { key: 'ma_discipline',    label: 'Ma discipline'        },
  { key: 'ma_confiance',     label: 'Ma confiance'         },
  { key: 'mon_organisation', label: 'Mon organisation'     },
  { key: 'mon_projet',       label: 'Mon projet'           },
  { key: 'mon_contenu',      label: 'Mon contenu'          },
  { key: 'mon_argent',       label: 'Mon argent'           },
  { key: 'mon_calme',        label: 'Mon calme intérieur'  },
]

const PHRASE_COLORS = ['#60a5fa', '#f59e0b', '#34d399', '#a78bfa', '#fb7185']

function loadYesterdayCheckIn() {
  try {
    const raw = localStorage.getItem(YESTERDAY_KEY)
    if (raw) return JSON.parse(raw)
  } catch { /* ignore */ }
  return null
}

function saveEveningBilan(data) {
  try {
    localStorage.setItem(YESTERDAY_KEY, JSON.stringify({ ...data, savedAt: new Date().toISOString() }))
  } catch { /* ignore */ }
}

function saveProfile(update) {
  try {
    const current = loadProfile()
    localStorage.setItem(PROFILE_KEY, JSON.stringify({ ...current, ...update }))
  } catch { /* ignore */ }
}

const PROGRESS_KEY = 'aixoria_progress'

function loadProgressMemory() {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || [] } catch { return [] }
}

function saveProgressEntry(entry) {
  try {
    const mem = loadProgressMemory()
    const updated = [{ date: new Date().toISOString().slice(0, 10), ...entry }, ...mem].slice(0, 30)
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated))
  } catch { /* ignore */ }
}

function isBilanDoneToday(checkIn) {
  if (!checkIn?.savedAt) return false
  return new Date(checkIn.savedAt).toDateString() === new Date().toDateString()
}

/* ══════════════════════════════════════════
   PHRASES REPÈRES — localStorage
   ══════════════════════════════════════════ */
const SAVED_PHRASES_KEY = 'aixoria_saved_phrases'

function loadSavedPhrases() {
  try { return JSON.parse(localStorage.getItem(SAVED_PHRASES_KEY)) || [] } catch { return [] }
}

function savePhrase(entry) {
  try {
    const current = loadSavedPhrases()
    if (current.some((p) => p.text === entry.text)) return false
    const updated = [{ id: Date.now(), createdAt: new Date().toISOString(), ...entry }, ...current]
    localStorage.setItem(SAVED_PHRASES_KEY, JSON.stringify(updated))
    return true
  } catch { return false }
}

function removePhrase(id) {
  try {
    const current = loadSavedPhrases()
    localStorage.setItem(SAVED_PHRASES_KEY, JSON.stringify(current.filter((p) => p.id !== id)))
  } catch { /* ignore */ }
}

const REPERE_CATEGORY_COLORS = {
  'Élan du jour':          'rgba(139,92,246,.15)',
  'Confiance':             'rgba(59,130,246,.12)',
  'Discipline':            'rgba(245,158,11,.12)',
  'Ancrage':               'rgba(6,182,212,.1)',
  'Projet & Indépendance': 'rgba(16,185,129,.1)',
  'Indépendance':          'rgba(249,115,22,.1)',
  'Calme':                 'rgba(6,182,212,.1)',
  'Courage':               'rgba(236,72,153,.1)',
  'Inspiration':           'rgba(234,179,8,.1)',
}
const REPERE_CATEGORY_TEXT = {
  'Élan du jour':          '#c4b5fd',
  'Confiance':             '#93c5fd',
  'Discipline':            '#fcd34d',
  'Ancrage':               '#67e8f9',
  'Projet & Indépendance': '#6ee7b7',
  'Indépendance':          '#fdba74',
  'Calme':                 '#67e8f9',
  'Courage':               '#f9a8d4',
  'Inspiration':           '#fde68a',
}

function formatRepereDate(isoString) {
  try {
    const d = new Date(isoString)
    const today = new Date()
    if (d.toDateString() === today.toDateString()) return "Aujourd'hui"
    const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1)
    if (d.toDateString() === yesterday.toDateString()) return 'Hier'
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })
  } catch { return '' }
}

/* ══════════════════════════════════════════
   5 PHRASES DU JOUR — génération
   ══════════════════════════════════════════ */
function generateDailyPhrases(user, checkIn) {
  const { gender, goals = [], motivationStyle = '', mainProject = '', lifeGoal = '', currentFocus = '' } = user
  const mood      = checkIn?.mood          || null
  const blocker   = checkIn?.blocker       || null
  const focus     = checkIn?.tomorrowFocus || null
  const intention = checkIn?.intention     || checkIn?.tomorrowIntention || null

  const g = (f, m, n) => agree(gender, f, m, n ?? f)

  /* 1 — ANCRAGE */
  let ancrage
  if      (mood === 'fatigue')    ancrage = `Même avec peu d'énergie, une petite action peut protéger ton élan. Tu n'as pas besoin d'être ${g('parfaite', 'parfait', 'parfait(e)')} — juste ${g('présente', 'présent', 'présent(e)')}.`
  else if (mood === 'stresse')    ancrage = `Tu n'as pas besoin de tout résoudre aujourd'hui. Commence par clarifier une seule chose, et laisse le reste attendre.`
  else if (mood === 'bloquee')    ancrage = `Tu n'es pas ${g('bloquée', 'bloqué', 'bloqué(e)')} pour toujours. Tu as seulement besoin d'un premier mouvement pour relancer l'élan.`
  else if (mood === 'decouragee') ancrage = `Le découragement fait partie du chemin. ${g('Celle', 'Celui', 'La personne')} que tu veux devenir avance malgré les jours difficiles.`
  else if (mood === 'dispersee')  ancrage = `Aujourd'hui, reviens à une seule priorité. Une seule chose bien faite vaut mieux qu'une dizaine de choses commencées.`
  else if (mood === 'motivee' || mood === 'fiere' || mood === 'confiante')
    ancrage = `Tu as de l'élan aujourd'hui. Utilise-le pour une action qui compte vraiment, pas juste une action facile.`
  else
    ancrage = `Tu n'as pas besoin d'être ${g('parfaite', 'parfait', 'parfait(e)')} aujourd'hui. Tu dois juste rester ${g('alignée', 'aligné', 'aligné(e)')} avec la personne que tu veux devenir.`

  /* 2 — CONFIANCE */
  let confiance
  if      (blocker === 'doute')          confiance = `La confiance ne se trouve pas. Elle se construit par chaque action que tu oses faire, même imparfaite. Tu es plus légitime que tu ne le crois.`
  else if (blocker === 'peur_jugement')  confiance = `${g('Celles', 'Ceux', 'Les personnes')} qui progressent n'attendent pas l'approbation des autres. Ils agissent quand même. Ton projet mérite d'être vu.`
  else if (blocker === 'manque_clarte')  confiance = `La clarté vient à travers l'action, pas avant. Commence à avancer — les réponses se préciseront d'elles-mêmes.`
  else if (blocker === 'procrastination') confiance = `Tu n'as pas à tout faire. Tu as juste à commencer. La version de toi qui agit est toujours plus puissante que celle qui attend.`
  else if (blocker === 'trop_de_choses') confiance = `Tout faire à la fois, c'est ne rien faire vraiment. Choisis une seule chose. Ta valeur ne dépend pas de ta productivité.`
  else
    confiance = `${g('Celle', 'Celui', 'La personne')} que tu veux devenir ne doute pas moins. Elle avance malgré le doute — et chaque jour, tu fais pareil.`

  /* 3 — DISCIPLINE */
  let discipline
  if (mood === 'fatigue')
    discipline = `Aujourd'hui, la discipline ce n'est pas en faire plus. C'est protéger ton élan en faisant une seule chose, même petite.`
  else if (focus === 'ma_discipline' || focus === 'mon_organisation')
    discipline = `La constance bat le talent sur le long terme. Fais ta tâche du jour — même 15 minutes — et tu auras avancé.`
  else if (focus === 'mon_projet' || focus === 'mon_contenu')
    discipline = `Une action par jour sur ton projet crée plus d'impact que 3 heures une fois par semaine. Fais ta part aujourd'hui.`
  else
    discipline = `Tu n'as pas besoin de te sentir ${g('motivée', 'motivé', 'motivé(e)')} pour agir. Commence. La motivation suivra.`

  /* 4 — PROJET / INDÉPENDANCE */
  let projet
  const hasBusinessGoal = goals.some((gl) => ['lancer mon activité', 'préparer mon indépendance'].includes(gl))
  if (intention) {
    const intent = intention.charAt(0).toLowerCase() + intention.slice(1)
    projet = `Ton intention d'aujourd'hui : "${intent}". Garde-la visible. Elle est ton cap du jour.`
  } else if (mainProject) {
    projet = `Ton projet "${mainProject}" se construit une action à la fois. Quelle est la seule action qui te rapproche de ta liberté aujourd'hui ?`
  } else if (focus === 'mon_projet' || hasBusinessGoal) {
    projet = `Ton projet d'indépendance se construit une action à la fois. Quelle est la seule action qui te rapproche de ta liberté aujourd'hui ?`
  } else if (goals.includes('reprendre confiance en moi')) {
    projet = `Chaque jour où tu avances malgré la peur, tu te prouves quelque chose. C'est comme ça que la confiance se construit vraiment.`
  } else {
    projet = `Rappelle-toi pourquoi tu as commencé. Ce projet, cette vie que tu veux bâtir — il mérite une action de ta part aujourd'hui.`
  }

  /* 5 — STYLE MOTIVATIONNEL */
  let motiv
  if      (motivationStyle === 'doux et rassurant')             motiv = `Tu fais du bon travail, même quand tu n'en as pas l'impression. Avance à ton rythme, avec bienveillance envers toi-même.`
  else if (motivationStyle === 'direct et challengeant')         motiv = `Arrête d'attendre le bon moment. Tu as les ressources. Tu as la vision. Il ne manque qu'une décision : agir maintenant, même imparfaitement.`
  else if (motivationStyle === 'premium et posé')                motiv = `Les grandes réussites se construisent dans le silence, avec méthode et constance. Ta valeur ne se prouve pas — elle se démontre par l'action.`
  else if (motivationStyle === 'inspirant')                      motiv = `Tu es en train de bâtir quelque chose de rare. Peu de personnes ont le courage de choisir leur vie. Toi, tu l'as choisi.`
  else if (motivationStyle === 'très concret et orienté action') motiv = `Identifie la tâche #1 qui crée le plus d'impact aujourd'hui. Fais-la en premier. Le reste suivra.`
  else                                                            motiv = `Tu es ${g('capable', 'capable', 'capable')} de plus que ce que tu penses. Aujourd'hui, choisis une action qui le prouve.`

  return [
    { id: 1, category: 'Ancrage',               text: ancrage    },
    { id: 2, category: 'Confiance',              text: confiance  },
    { id: 3, category: 'Discipline',             text: discipline },
    { id: 4, category: 'Projet & Indépendance',  text: projet     },
    { id: 5, category: 'Élan du jour',           text: motiv      },
  ]
}

/* ══════════════════════════════════════════
   ÉLAN DU JOUR — constantes spirituelles
   ══════════════════════════════════════════ */
const BIBLE_VERSES = {
  courage: {
    text: "Car ce n'est pas un esprit de timidité que Dieu nous a donné, mais un esprit de force, d'amour et de sagesse.",
    ref:  "2 Timothée 1:7",
  },
  perseverance: {
    text: "Tout ce que vous faites, faites-le de bon cœur.",
    ref:  "Colossiens 3:23",
  },
  confiance: {
    text: "Je puis tout par celui qui me fortifie.",
    ref:  "Philippiens 4:13",
  },
  direction: {
    text: "Recommande tes œuvres à l'Éternel, et tes projets réussiront.",
    ref:  "Proverbes 16:3",
  },
}

const SPIRITUAL_MESSAGES = {
  courage:      "Tu n'as pas besoin de voir tout le chemin. Tu as seulement besoin d'honorer le prochain pas.",
  perseverance: "Le chemin est parfois lent. Mais chaque jour où tu avances, tu te rappelles qui tu es.",
  confiance:    "La force dont tu as besoin aujourd'hui est déjà en toi. Fais confiance au chemin.",
  direction:    "Chaque action posée avec intention est un pas vers la vie que tu veux créer.",
}

/* ══════════════════════════════════════════
   ÉLAN DU JOUR — génération personnalisée
   ══════════════════════════════════════════ */
function generateDailyMomentum(profile, seed = 0) {
  const {
    gender = 'female', goals = [], blockers = [], lifeSeasons = [],
    motivationStyle = '', mainProject = '', lastCheckIn,
  } = profile

  const checkIn   = lastCheckIn || null
  const energy    = (checkIn?.energy     || '').toLowerCase()
  const conf      = (checkIn?.confidence || '').toLowerCase()
  const g         = (f, m, n) => agree(gender, f, m, n ?? f)
  const pick      = (arr) => arr[seed % arr.length]

  const hasBusinessGoal = goals.some((gl) => ['lancer mon activité', 'préparer mon indépendance'].includes(gl))
  const hasDoubt        = blockers.some((b) => b.includes('doute') || b === 'je doute de moi')
  const hasFearJudge    = blockers.some((b) => b.includes('jugement') || b.includes("peur d'être"))
  const isRebuilding    = lifeSeasons.includes('je me reconstruis')
  const lowEnergy       = energy === 'basse'
  const lowConf         = conf === 'basse'

  if (lowEnergy && lowConf) return {
    message: pick([
      g("Les jours difficiles font partie du chemin. Tu n'as pas à performer — rester présente aujourd'hui, c'est déjà courageux.",
        "Les jours difficiles font partie du chemin. Tu n'as pas à performer — rester présent aujourd'hui, c'est déjà courageux.",
        "Les jours difficiles font partie du chemin. Rester présent(e) aujourd'hui, c'est déjà courageux."),
      "Quand l'énergie est basse, une seule chose compte : protéger ton élan. Fais la plus petite action possible et honore cet effort.",
    ]),
    verseKey: 'perseverance',
  }

  if (hasFearJudge) return {
    message: pick([
      (mainProject ? `"${mainProject}"` : "Ton projet") + g(
        " mérite d'être vu. Les personnes qui progressent n'attendent pas l'approbation. Elles avancent, imparfaitement — et c'est ça qui les rend visibles.",
        " mérite d'être vu. Les personnes qui progressent n'attendent pas l'approbation. Ils avancent, imparfaitement — et c'est ça qui les rend visibles.",
        " mérite d'être vu. Avancer imparfaitement, c'est ce qui crée la visibilité.",
      ),
      g("Tu n'as pas besoin que tout le monde comprenne ce que tu construis. Tu as juste besoin d'avancer malgré le regard des autres.",
        "Tu n'as pas besoin que tout le monde comprenne ce que tu construis. Tu as juste besoin d'avancer malgré le regard des autres.",
        "Tu n'as pas besoin que tout le monde comprenne. Avancer malgré le regard des autres, c'est le vrai courage."),
    ]),
    verseKey: 'courage',
  }

  if (hasDoubt) return {
    message: pick([
      g("La légitimité ne se trouve pas en attendant de te sentir prête. Elle se construit avec chaque action que tu oses faire, même quand tu doutes.",
        "La légitimité ne se trouve pas en attendant de te sentir prêt. Elle se construit avec chaque action que tu oses faire, même quand tu doutes.",
        "La légitimité se construit avec chaque action osée, même dans le doute."),
      "Tu es plus capable que tu ne le penses. Le doute est une réaction normale face à quelque chose qui compte vraiment. Continue.",
    ]),
    verseKey: 'confiance',
  }

  if (isRebuilding) return {
    message: pick([
      g("Tu n'es pas en retard. Tu es en train de te reconstruire — et c'est l'une des choses les plus courageuses qu'une personne puisse faire.",
        "Tu n'es pas en retard. Tu es en train de te reconstruire — et c'est l'une des choses les plus courageuses qu'une personne puisse faire.",
        "Tu n'es pas en retard. Se reconstruire est l'un des actes les plus courageux qui soit."),
      "Chaque jour où tu te relèves, tu écris une nouvelle page. Le chemin compte autant que la destination.",
    ]),
    verseKey: 'perseverance',
  }

  if (hasBusinessGoal) {
    const proj = mainProject ? `"${mainProject}"` : "ton projet"
    return {
      message: pick([
        g(`Tu es en train de bâtir ${proj} — quelque chose de rare. Peu de personnes ont le courage de choisir leur liberté. Toi, tu l'as choisi. Continue.`,
          `Tu es en train de bâtir ${proj} — quelque chose de rare. Peu de personnes ont le courage de choisir leur liberté. Toi, tu l'as choisi. Continue.`,
          `Tu es en train de bâtir ${proj} — quelque chose de rare. Aujourd'hui, tu continues ce choix courageux.`),
        g(`Construire ${proj}, c'est choisir ta liberté. Chaque action posée aujourd'hui est un investissement dans la vie que tu veux vivre.`,
          `Construire ${proj}, c'est choisir ta liberté. Chaque action posée aujourd'hui est un investissement dans la vie que tu veux vivre.`,
          `Construire ${proj} est un choix de liberté. Chaque action d'aujourd'hui y contribue.`),
      ]),
      verseKey: 'direction',
    }
  }

  const styleMessages = {
    'doux et rassurant': [
      g("Tu fais du bon travail, même quand tu n'en as pas l'impression. Avance à ton rythme, avec bienveillance envers toi-même.",
        "Tu fais du bon travail, même quand tu n'en as pas l'impression. Avance à ton rythme, avec bienveillance envers toi-même.",
        "Tu fais du bon travail, même sans en avoir l'impression. Avance à ton rythme."),
      g("Il n'y a pas de bonne ou mauvaise vitesse. Il y a juste ton rythme — et il est valide.",
        "Il n'y a pas de bonne ou mauvaise vitesse. Il y a juste ton rythme — et il est valide.",
        "Il n'y a pas de bonne ou mauvaise vitesse. Ton rythme est valide."),
    ],
    'direct et challengeant': [
      "Arrête d'attendre le bon moment. Tu as les ressources. Tu as la vision. Il ne manque qu'une décision : agir maintenant, même imparfaitement.",
      "Le temps passe de toute façon. Autant qu'il passe pendant que tu construis quelque chose.",
    ],
    'premium et posé': [
      "Les grandes réussites se construisent dans le silence, avec méthode et constance. Ta valeur ne se prouve pas — elle se démontre par l'action.",
      "La qualité de ton attention détermine la qualité de ton travail. Aujourd'hui, sois pleinement là.",
    ],
    'inspirant': [
      g("Tu es en train de bâtir quelque chose de rare. Peu de personnes ont le courage de choisir leur vie. Toi, tu l'as choisi.",
        "Tu es en train de bâtir quelque chose de rare. Peu de personnes ont le courage de choisir leur vie. Toi, tu l'as choisi.",
        "Tu es en train de bâtir quelque chose de rare. Peu de personnes ont le courage de choisir leur vie. Aujourd'hui, tu continues ce choix."),
      "Le monde a besoin de ce que tu construis. Pas demain. Aujourd'hui.",
    ],
    'très concret et orienté action': [
      "Identifie la tâche #1 qui crée le plus d'impact aujourd'hui. Fais-la en premier, sans attendre la motivation. L'action crée l'élan.",
      "Une chose. Une heure. Tout le reste peut attendre. C'est comme ça qu'on construit.",
    ],
  }

  if (styleMessages[motivationStyle]) {
    return { message: pick(styleMessages[motivationStyle]), verseKey: 'direction' }
  }

  return {
    message: pick([
      g("Tu es capable de plus que ce que tu penses. Aujourd'hui, une seule action qui te rapproche de la personne que tu veux devenir suffit.",
        "Tu es capable de plus que ce que tu penses. Aujourd'hui, une seule action qui te rapproche de la personne que tu veux devenir suffit.",
        "Une seule action aujourd'hui, qui te rapproche de la personne que tu veux devenir. C'est assez."),
      g("Chaque jour où tu choisis d'avancer malgré l'incertitude, tu deviens la personne que tu veux être.",
        "Chaque jour où tu choisis d'avancer malgré l'incertitude, tu deviens la personne que tu veux être.",
        "Chaque jour où on avance malgré l'incertitude, on devient la personne qu'on veut être."),
    ]),
    verseKey: 'direction',
  }
}

/* ══════════════════════════════════════════
   MISSION PERSONNALISÉE — génération
   ══════════════════════════════════════════ */
function generateDailyMission(profile) {
  const checkIn = profile.lastCheckIn || null
  const energy  = (checkIn?.energy || '').toLowerCase()

  const raw = (() => {
    const {
      gender, mainProject = '', projectStage = '', currentFocus = '',
      goals = [], blockers = [], motivationStyle = '',
    } = profile
    const tomorrowIntention = checkIn?.tomorrowIntention || ''
    const checkInBlocker    = checkIn?.mainBlocker || ''
    const primaryBlocker    = checkInBlocker || (blockers[0] || '')
    const hasProject        = mainProject.trim().length > 0

    const g = (f, m, n) => agree(gender, f, m, n ?? f)

    // Priority 1 : intention d'hier soir
    if (tomorrowIntention && tomorrowIntention.trim().length > 8) {
      const intent = tomorrowIntention.trim()
      return {
        title: "Ton mouvement d'aujourd'hui",
        action: intent,
        why: "Hier soir, tu as choisi cette intention. C'est le moment de la transformer en action concrète.",
        duration: '30 minutes',
        difficulty: 'modérée',
        impact: 'fort',
        microAction: "Commence par : ouvre ton espace de travail et note la première étape.",
        steps: [
          "Ouvre un espace de travail dédié",
          "Note 3 micro-étapes pour avancer",
          "Lance un timer et commence la première",
        ]
      }
    }

    // Priority 2 : peur du jugement / crédibilité
    const fearJudgment = primaryBlocker.toLowerCase().includes('crédible')
      || primaryBlocker.toLowerCase().includes('jugement')
      || blockers.includes("j'ai peur du jugement")
    if (fearJudgment) {
      return {
        title: "Clarifie ton offre sans pression",
        action: hasProject
          ? `Écris en 5 lignes ce que "${mainProject}" peut apporter à un client.`
          : "Écris en 5 lignes ce que tu peux apporter à un client.",
        why: `Ton prochain blocage n'est pas technique. C'est oser rendre ton offre claire et visible. Avant d'être ${g('visible', 'visible', 'visible')}, tu dois savoir ce que tu veux dire.`,
        duration: '15 minutes',
        difficulty: 'douce',
        impact: 'fort',
        microAction: "Complète cette phrase : J'aide ___ à ___ grâce à ___.",
        steps: [
          "Ouvre un document vierge",
          "Complète : J'aide ___ à ___ grâce à ___",
          "Garde ce texte — c'est ton message clé",
        ]
      }
    }

    // Priority 3 : procrastination
    const procrastine = primaryBlocker.toLowerCase().includes('procrastin') || blockers.includes('je procrastine')
    if (procrastine) {
      return {
        title: "5 minutes suffisent",
        action: hasProject
          ? `Réduis ton projet "${mainProject}" à une seule action de 5 minutes.`
          : "Réduis ce que tu dois faire à une seule action de 5 minutes.",
        why: "Tu ne manques pas de capacité. L'action est juste devenue trop grande dans ta tête. Commence petit — l'élan viendra ensuite.",
        duration: '5 minutes',
        difficulty: 'douce',
        impact: 'modéré',
        microAction: "Lance un timer de 5 minutes maintenant et fais une seule chose.",
        steps: [
          "Identifie la plus petite action possible",
          "Lance un timer de 5 minutes",
          "Commence — ne t'arrête pas avant qu'il sonne",
        ]
      }
    }

    // Priority 4 : lancer activité / indépendance
    if (goals.includes('lancer mon activité') || goals.includes('préparer mon indépendance')) {
      return {
        title: hasProject ? `Avance sur "${mainProject}"` : "Clarifie ton offre",
        action: currentFocus
          ? `Aujourd'hui, concentre-toi sur : ${currentFocus.toLowerCase().replace(/\.$/, '')}.`
          : hasProject
            ? `Clarifie ton offre pour "${mainProject}" en une phrase.`
            : "Clarifie ton offre en une phrase.",
        why: "Lancer une activité commence toujours par une offre claire. Plus tôt tu la formules, plus vite tu passes à l'action réelle.",
        duration: '20 minutes',
        difficulty: 'modérée',
        impact: 'fort',
        microAction: "Complète : Je propose ___ à ___ pour obtenir ___ résultat.",
        steps: [
          "Prends une feuille ou ouvre un doc",
          "Écris ton offre en une phrase",
          "Demande à une personne de confiance ce qu'elle en pense",
        ]
      }
    }

    // Priority 5 : reprendre confiance
    if (goals.includes('reprendre confiance en moi')) {
      return {
        title: "Construis des preuves de tes capacités",
        action: "Note 3 preuves que tu es capable d'apprendre et de progresser.",
        why: "La confiance ne se décrète pas. Elle se construit avec des preuves concrètes. Chaque souvenir noté devient une ancre pour les moments de doute.",
        duration: '10 minutes',
        difficulty: 'douce',
        impact: 'fort',
        microAction: `Écris : 1 chose que tu as ${g('réussie', 'réussie', 'réussi(e)')} cette semaine, même petite.`,
        steps: [
          "Prends un cahier ou ouvre les notes",
          "Note 3 moments où tu as appris ou avancé",
          "Relis-les à voix haute",
        ]
      }
    }

    // Priority 6 : créer du contenu
    if (goals.includes('créer du contenu')) {
      return {
        title: "Montre ton chemin, pas ton résultat",
        action: "Écris un post simple sur ce que tu apprends en construisant ton projet.",
        why: "Ton contenu n'a pas besoin d'être parfait. Les gens ne suivent pas les experts — ils suivent ceux qui osent partager leur chemin.",
        duration: '15 minutes',
        difficulty: 'modérée',
        impact: 'modéré',
        microAction: "Complète : Aujourd'hui j'ai appris que ___ m'a aidé à ___.",
        steps: [
          "Note une chose apprise récemment",
          "Écris-la comme si tu l'expliquais à un ami",
          "Sauvegarde le brouillon — tu décides plus tard si tu publies",
        ]
      }
    }

    // Default : projet ou mission générale
    if (hasProject) {
      return {
        title: `Avance sur "${mainProject}"`,
        action: projectStage
          ? `Là où tu en es : ${projectStage.split('.')[0]}. Identifie et réalise la prochaine micro-action concrète.`
          : "Identifie et réalise la prochaine micro-action concrète sur ton projet.",
        why: "Une action par jour sur ton projet crée plus d'impact que 3 heures une fois par semaine.",
        duration: '25 minutes',
        difficulty: 'modérée',
        impact: 'fort',
        microAction: "Écris ta prochaine étape en une phrase et commence.",
        steps: [
          "Relis où tu en es sur ton projet",
          "Identifie la plus petite prochaine étape",
          "Fais uniquement cette étape",
        ]
      }
    }

    return {
      title: "Ton mouvement du jour",
      action: "Choisis une seule chose importante et avance dessus pendant 20 minutes.",
      why: "Une action claire par jour construit plus que dix intentions non réalisées.",
      duration: '20 minutes',
      difficulty: 'modérée',
      impact: 'modéré',
      microAction: "Écris en une phrase ce que tu veux réaliser maintenant.",
      steps: [
        "Identifie ta priorité du jour",
        "Lance-toi sur une action de 20 minutes",
        "Note ta progression à la fin",
      ]
    }
  })()

  // Adapte la durée selon l'énergie du dernier bilan
  if (energy === 'basse') return { ...raw, duration: '10 minutes', difficulty: 'douce' }
  if (energy === 'haute') {
    const mins = parseInt(raw.duration) || 20
    return { ...raw, duration: `${Math.min(mins + 10, 40)} minutes` }
  }
  return raw
}

/* ══════════════════════════════════════════
   EN-TÊTE DE SESSION
   ══════════════════════════════════════════ */
function SessionHeader({ user }) {
  const cap     = user.lifeGoal || user.goals?.[0] || null
  const project = user.mainProject || null
  const rythme  = user.motivationStyle || null

  return (
    <div className="session-header">
      <div className="sh-top">
        <h1 className="sh-greeting">
          Bonjour <span className="sh-name">{user.name || 'toi'}</span>
        </h1>
        <p className="sh-tagline">Aujourd'hui, on avance avec clarté, pas avec pression.</p>
      </div>
      <div className="sh-badges">
        {cap && (
          <div className="sh-badge sh-badge--cap">
            <span className="sh-badge-label">Cap</span>
            <span className="sh-badge-value">{cap}</span>
          </div>
        )}
        {project && (
          <div className="sh-badge sh-badge--project">
            <span className="sh-badge-label">Projet</span>
            <span className="sh-badge-value">{project}</span>
          </div>
        )}
        {rythme && (
          <div className="sh-badge sh-badge--rythme">
            <span className="sh-badge-label">Rythme</span>
            <span className="sh-badge-value">{rythme}</span>
          </div>
        )}
        <div className="sh-badge sh-badge--apercu">
          <span className="sh-badge-value">Mode aperçu</span>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   MODALE MISSION LANCÉE
   ══════════════════════════════════════════ */
function MissionModal({ mission, onClose }) {
  const [note, setNote]           = useState('')
  const [completed, setCompleted] = useState(false)

  const handleComplete = () => {
    saveProgressEntry({ completedAction: mission.title, note: note.trim() })
    setCompleted(true)
  }

  if (completed) {
    return (
      <div className="action-modal-overlay" onClick={onClose}>
        <div className="action-modal" onClick={(e) => e.stopPropagation()}>
          <div className="am-done-icon" aria-hidden="true">✓</div>
          <h2 className="am-title">Mission lancée !</h2>
          <p style={{ textAlign: 'center', color: 'rgba(203,213,255,.72)', marginBottom: 28, fontSize: '.9rem', lineHeight: 1.6 }}>
            Continue sur cet élan. Chaque action compte.
          </p>
          <button className="am-back-btn" onClick={onClose}>Fermer</button>
        </div>
      </div>
    )
  }

  return (
    <div className="action-modal-overlay" onClick={onClose}>
      <div className="action-modal" onClick={(e) => e.stopPropagation()}>
        <div className="am-tag">Mission lancée</div>
        <h2 className="am-title">{mission?.title || 'Ta mission'}</h2>
        <ol className="am-steps">
          {(mission?.steps || []).map((step, i) => (
            <li key={i} className="am-step">
              <span className="am-step-num">{i + 1}</span>
              <span className="am-step-text">{step}</span>
            </li>
          ))}
        </ol>
        <div style={{ marginTop: 18 }}>
          <label style={{ fontSize: '.79rem', fontWeight: 600, color: 'rgba(203,213,255,.6)', display: 'block', marginBottom: 8 }}>
            Note rapide (optionnel)
          </label>
          <input
            type="text"
            className="bilan-input"
            placeholder="Ex : Je commence par contacter un prospect..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={120}
          />
        </div>
        <div className="am-actions">
          <button className="am-complete-btn" onClick={handleComplete}>J'ai posé le premier pas</button>
          <button className="am-back-btn" onClick={onClose}>Terminer plus tard</button>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   CARTE PRINCIPALE — Ton prochain pas
   ══════════════════════════════════════════ */
function NextStepCard({ checkIn, onLaunch }) {
  const actionText = checkIn ? CHECKIN_ACTION_MESSAGES[checkIn] : null

  return (
    <div className={`next-step-card${!checkIn ? ' next-step-card--idle' : ''}`}>
      {checkIn && <div className="nsc-accent" aria-hidden="true" />}
      <div className="nsc-tag">Ton prochain pas</div>
      <h2 className="nsc-title">Ton prochain pas</h2>
      {actionText ? (
        <>
          <div className="nsc-action-box">
            <span className="nsc-action-label">Action du jour</span>
            <p className="nsc-action-text">{actionText}</p>
          </div>
          <button className="nsc-cta" onClick={onLaunch}>
            <span>Commencer mon action</span>
            <IconArrow size={15} />
          </button>
        </>
      ) : (
        <p className="nsc-idle-text">
          Choisis ton état du jour pour recevoir une action adaptée.
        </p>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════
   CHECK-IN — grande section centrale
   ══════════════════════════════════════════ */
function CheckInSection({ gender, selected, onSelect }) {
  return (
    <div className="checkin-section" id="checkin">
      <h2 className="checkin-title">Comment tu te sens aujourd'hui ?</h2>
      <p className="checkin-sub">Choisis ton état du moment. AIxoria Life adapte ensuite ton prochain pas.</p>
      <div className="checkin-grid">
        {CHECK_IN_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            className={`checkin-btn${selected === opt.key ? ' checkin-btn--selected' : ''}`}
            onClick={() => onSelect(opt.key === selected ? null : opt.key)}
            aria-pressed={selected === opt.key}
          >
            {agree(gender, opt.female, opt.male, opt.neutral)}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   ESPACE DE RÉPONSE — interactif
   ══════════════════════════════════════════ */
function ResponseSpace({ mission }) {
  const [text, setText]   = useState('')
  const [state, setState] = useState(null)

  const handleStarted = () => {
    if (text.trim().length < 2) return
    saveProgressEntry({ responseText: text.trim(), missionTitle: mission?.title || '' })
    setState('started')
  }

  if (state === 'started') {
    return (
      <div className="response-space response-space--done">
        <div className="rs-done-icon">✓</div>
        <p className="rs-done-msg">C'est enregistré. Ce début compte déjà.</p>
        <button className="rs-reset-btn" onClick={() => { setText(''); setState(null) }}>
          Ajouter une note
        </button>
      </div>
    )
  }

  return (
    <div className="response-space">
      <div className="rs-header">
        <span className="rs-title">Ta réponse</span>
        {state === 'blocked'    && <span className="rs-state-tag">Mission réduite</span>}
        {state === 'simplified' && <span className="rs-state-tag">Version simplifiée</span>}
      </div>

      {state === 'blocked' && (
        <div className="rs-alt-prompt">
          On réduit la mission. Écris seulement : <strong>J'aide ___ à ___.</strong>
        </div>
      )}
      {state === 'simplified' && (
        <div className="rs-alt-prompt">
          Écris seulement le nom du type de client que tu veux aider.
        </div>
      )}

      <textarea
        className="rs-textarea"
        placeholder={
          state === 'blocked'    ? "J'aide ___ à ___." :
          state === 'simplified' ? "Mon client idéal est…" :
          "Écris ici ta première version. Elle n'a pas besoin d'être parfaite."
        }
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={4}
      />

      <div className="rs-actions">
        <button
          className="rs-btn rs-btn--primary"
          onClick={handleStarted}
          disabled={text.trim().length < 2}
        >
          J'ai commencé
        </button>
        {state !== 'blocked' && (
          <button className="rs-btn rs-btn--secondary" onClick={() => setState('blocked')}>
            Je suis bloquée
          </button>
        )}
        {state !== 'simplified' && (
          <button className="rs-btn rs-btn--ghost" onClick={() => setState('simplified')}>
            Rends la mission plus simple
          </button>
        )}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   SESSION DU JOUR — grande carte centrale
   ══════════════════════════════════════════ */
const DIFFICULTY_LABELS = { douce: 'Doux', modérée: 'Moyen', intense: 'Intense' }
const IMPACT_LABELS     = { léger: 'Léger', modéré: 'Modéré', fort: 'Fort' }

function DaySessionCard({ profile, mission, onChangeMission }) {
  const { mainProject, lifeGoal, goals = [], blockers = [], lastCheckIn } = profile
  const checkIn = lastCheckIn || null

  const contextProject = mainProject || null
  const contextGoal    = lifeGoal || goals[0] || null
  const contextBlocker = checkIn?.mainBlocker || blockers[0] || null
  const contextState   = checkIn?.energy
    ? `Énergie ${checkIn.energy.toLowerCase()}${checkIn.confidence ? ` · Confiance ${checkIn.confidence.toLowerCase()}` : ''}`
    : null

  const contextItems = [
    contextProject && { label: 'Tu veux construire',  value: contextProject },
    contextGoal    && { label: 'Tu veux avancer vers', value: contextGoal },
    contextBlocker && { label: 'Ton blocage actuel',  value: contextBlocker },
    contextState   && { label: 'Ton état récent',     value: contextState },
  ].filter(Boolean)

  return (
    <div className="day-session-card">
      <div className="dsc-top-label">Ta session du jour</div>

      {contextItems.length > 0 && (
        <div className="dsc-context">
          <span className="dsc-context-title">Ce que j'ai pris en compte</span>
          <div className="dsc-ctx-list">
            {contextItems.map((item) => (
              <div key={item.label} className="dsc-ctx-row">
                <span className="dsc-ctx-label">{item.label}</span>
                <span className="dsc-ctx-value">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="dsc-divider" aria-hidden="true" />

      <div className="dsc-mission">
        <div className="dsc-mission-meta-row">
          <span className="dsc-mission-tag">Ta mission ciblée</span>
          <div className="dsc-meta-pills">
            <span className="dsc-meta-pill">{mission.duration}</span>
            <span className="dsc-meta-pill dsc-meta-pill--level">
              {DIFFICULTY_LABELS[mission.difficulty] || mission.difficulty}
            </span>
            <span className="dsc-meta-pill dsc-meta-pill--impact">
              Impact {IMPACT_LABELS[mission.impact] || mission.impact}
            </span>
          </div>
        </div>

        <h2 className="dsc-mission-title">{mission.title}</h2>
        <p className="dsc-mission-action">{mission.action}</p>

        <div className="dsc-why">
          <span className="dsc-detail-label">Pourquoi cette mission</span>
          <p className="dsc-detail-text">{mission.why}</p>
        </div>

        <div className="dsc-micro">
          <span className="dsc-detail-label">Micro-action pour commencer</span>
          <p className="dsc-micro-text">{mission.microAction}</p>
        </div>

        <button className="dsc-change-btn" onClick={onChangeMission}>
          Changer de mission →
        </button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   LIFE PULSE — sélection intelligente
   ══════════════════════════════════════════ */
function getRelevantPulseIdx(user) {
  const blockers = user.blockers       || []
  const goals    = user.goals          || []
  const seasons  = user.lifeSeasons    || []
  const style    = user.motivationStyle || ''

  if (blockers.includes('je doute de moi'))               return 4
  if (blockers.includes('je procrastine'))                 return 1
  if (goals.includes('lancer mon activité') || goals.includes('préparer mon indépendance')) return 3
  if (seasons.includes('je me reconstruis'))               return 2
  if (style === 'doux et rassurant')                       return 0
  if (style === 'direct et challengeant')                  return 1
  return 0
}

function LifePulseCard({ user }) {
  const [idx, setIdx] = useState(() => getRelevantPulseIdx(user))
  const current = PULSE_MESSAGES[idx]
  const text    = agree(user.gender, current.female, current.male, current.neutral)

  return (
    <div className="life-pulse-card">
      <div className="lpc-header">
        <span className="lpc-tag">Life Pulse</span>
        <button
          className="lpc-btn"
          onClick={() => setIdx((i) => (i + 1) % PULSE_MESSAGES.length)}
        >
          Nouvelle phrase
        </button>
      </div>
      <blockquote className="lpc-quote">"{text}"</blockquote>
      <span className="lpc-meta">{current.moment} · {current.category}</span>
    </div>
  )
}

/* ══════════════════════════════════════════
   5 PHRASES DU JOUR — carte principale
   ══════════════════════════════════════════ */
/* ══════════════════════════════════════════
   ÉLAN DU JOUR — MomentumCard
   ══════════════════════════════════════════ */
function MomentumCard({ profile }) {
  const [seed, setSeed]   = useState(0)
  const momentum          = generateDailyMomentum(profile, seed)
  const spiritualPref     = profile.spiritualPreference || 'neutral'
  const bibleVerse        = spiritualPref === 'bible' ? BIBLE_VERSES[momentum.verseKey] : null
  const spiritualMsg      = spiritualPref === 'spiritual' ? SPIRITUAL_MESSAGES[momentum.verseKey] : null

  const [saved, setSaved] = useState(() => loadSavedPhrases().some((p) => p.text === momentum.message))

  useEffect(() => {
    setSaved(loadSavedPhrases().some((p) => p.text === momentum.message))
  }, [momentum.message])

  const handleSave = () => {
    if (saved) return
    savePhrase({
      text:     momentum.message,
      category: 'Élan du jour',
      source:   'Élan du jour',
      project:  profile.mainProject || null,
    })
    setSaved(true)
  }

  return (
    <div className="momentum-card">
      <div className="mom-glow" aria-hidden="true" />
      <div className="mom-header">
        <span className="mom-label">Élan du jour</span>
        <p className="mom-sub">Une impulsion pensée pour ton cap et ton état du moment.</p>
      </div>
      <p className="mom-message">{momentum.message}</p>
      {spiritualMsg && (
        <div className="mom-spiritual">
          <p className="mom-spiritual-text">{spiritualMsg}</p>
        </div>
      )}
      {bibleVerse && (
        <div className="mom-verse">
          <span className="mom-verse-eyebrow">Inspiration</span>
          <p className="mom-verse-text">"{bibleVerse.text}"</p>
          <span className="mom-verse-ref">— {bibleVerse.ref}</span>
        </div>
      )}
      <div className="mom-actions">
        <button
          className={`mom-save-btn${saved ? ' mom-save-btn--saved' : ''}`}
          onClick={handleSave}
          disabled={saved}
        >
          {saved ? '★ Élan gardé' : '☆ Garder cet élan'}
        </button>
        <button
          className="mom-refresh-btn"
          onClick={() => setSeed((s) => s + 1)}
        >
          Nouvel élan
        </button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   TON ESPACE DU JOUR — carte principale
   ══════════════════════════════════════════ */
function EspaceDuJourCard({ mission, onChangeMission }) {
  const [sessionOpen, setSessionOpen] = useState(false)
  const [text, setText]               = useState('')
  const [done, setDone]               = useState(false)

  const handleStarted = () => {
    if (text.trim().length < 2) return
    saveProgressEntry({ responseText: text.trim(), missionTitle: mission?.title || '' })
    setDone(true)
  }

  if (done) {
    return (
      <div className="espace-card espace-card--done">
        <div className="ec-done-icon" aria-hidden="true">✓</div>
        <p className="ec-done-msg">C'est enregistré. Ce premier pas compte déjà.</p>
        <button className="ec-reset-btn" onClick={() => { setText(''); setDone(false); setSessionOpen(false) }}>
          Ajouter une note
        </button>
      </div>
    )
  }

  return (
    <div className="espace-card">
      <div className="ec-header">
        <h2 className="ec-title">Ton espace du jour</h2>
        <p className="ec-sub">Un moment pour revenir à ce qui compte vraiment.</p>
      </div>

      <div className="ec-lines">
        <div className="ec-line">
          <span className="ec-line-label">Ce qui compte aujourd'hui</span>
          <p className="ec-line-value">{mission.title}</p>
        </div>
        <div className="ec-line">
          <span className="ec-line-label">Pourquoi maintenant</span>
          <p className="ec-line-value">{mission.why}</p>
        </div>
        <div className="ec-line">
          <span className="ec-line-label">Ton prochain pas</span>
          <p className="ec-line-value">{mission.microAction}</p>
        </div>
      </div>

      {!sessionOpen ? (
        <div className="ec-actions">
          <button className="ec-btn-primary" onClick={() => setSessionOpen(true)}>
            Entrer dans ma session
          </button>
          <button className="ec-btn-ghost" onClick={onChangeMission}>
            Rendre plus simple
          </button>
        </div>
      ) : (
        <div className="ec-session">
          <span className="ec-session-tag">Session ouverte</span>
          <p className="ec-session-text">
            Prends 10 minutes. Tu n'as pas besoin de réussir parfaitement. Tu as seulement besoin de commencer avec honnêteté.
          </p>
          <textarea
            className="ec-textarea"
            placeholder="Écris ici ta première version…"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
          />
          <div className="ec-session-actions">
            <button
              className="ec-btn-primary"
              onClick={handleStarted}
              disabled={text.trim().length < 2}
            >
              J'ai posé le premier pas
            </button>
            <button className="ec-btn-secondary" onClick={onChangeMission}>
              Je veux une version plus simple
            </button>
            <button className="ec-btn-ghost" onClick={() => setSessionOpen(false)}>
              Je continue plus tard
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════
   CE QUI MÉRITE TON ÉNERGIE
   ══════════════════════════════════════════ */
function EnergieSection({ profile, mission }) {
  const hasBusinessGoal = (profile.goals || []).some((g) =>
    ['lancer mon activité', 'préparer mon indépendance'].includes(g)
  )
  const hasDoubt = (profile.blockers || []).some((b) => b.includes('doute') || b === 'je doute de moi')

  const items = [
    { key: 'mouvement', text: mission.action || mission.title },
    hasDoubt
      ? { key: 'confiance', text: "Reprendre confiance dans ta légitimité, une preuve à la fois." }
      : { key: 'clarté', text: "Clarifier ton message pour avancer sans te disperser." },
    hasBusinessGoal
      ? { key: 'visibilité', text: "Préparer une action visible, sans te forcer à tout montrer aujourd'hui." }
      : { key: 'focus', text: "Rester concentré sur une seule chose qui compte vraiment." },
  ]

  return (
    <div className="energie-section">
      <div className="ens-header">
        <h2 className="ens-title">Ce qui mérite ton énergie</h2>
      </div>
      <div className="ens-list">
        {items.map((item, i) => (
          <div key={item.key} className="ens-item">
            <span className="ens-num">{i + 1}</span>
            <p className="ens-item-text">{item.text}</p>
            <button className="ens-item-btn" disabled>Approfondir</button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   QUAND C'EST FLOU
   ══════════════════════════════════════════ */
const FLOU_DATA = {
  doute: {
    message:  "Le doute ne signifie pas que tu n'es pas capable. Il signifie que tu es à un endroit important.",
    nextStep: "Écris une preuve que tu as déjà progressé dans quelque chose de difficile.",
  },
  reposse: {
    message:  "Tu n'as pas besoin de motivation. Tu as besoin d'une entrée plus petite.",
    nextStep: "Ouvre ton document et écris seulement une ligne.",
  },
  eparpillee: {
    message:  "Quand tout semble urgent, rien ne l'est vraiment. Une seule chose. La plus proche.",
    nextStep: "Complète cette phrase : \"La seule chose que je peux faire maintenant c'est ___\".",
  },
  jugement: {
    message:  "Tu n'as pas encore besoin d'être vue par tout le monde. Tu peux d'abord clarifier ce que tu veux dire.",
    nextStep: "Écris ton idée sans la publier.",
  },
}

function QuandCestFlouSection({ gender }) {
  const [active, setActive] = useState(null)

  const items = [
    { key: 'doute',      label: 'Je doute' },
    { key: 'reposse',    label: 'Je repousse' },
    { key: 'eparpillee', label: agree(gender, 'Je suis éparpillée', 'Je suis éparpillé', 'Je suis éparpillé(e)') },
    { key: 'jugement',   label: agree(gender, "J'ai peur d'être jugée", "J'ai peur d'être jugé", "J'ai peur d'être jugé(e)") },
  ]

  const response = active ? FLOU_DATA[active] : null

  return (
    <div className="flou-section">
      <div className="flou-header">
        <h2 className="flou-title">Quand c'est flou</h2>
        <p className="flou-sub">Choisis ce qui se passe en toi. AIxoria Life réduit le bruit.</p>
      </div>
      <div className="flou-btns">
        {items.map((item) => (
          <button
            key={item.key}
            className={`flou-btn${active === item.key ? ' flou-btn--active' : ''}`}
            onClick={() => setActive(active === item.key ? null : item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {response && (
        <div className="flou-response">
          <p className="flou-response-msg">{response.message}</p>
          <div className="flou-nextstep">
            <span className="flou-nextstep-label">Prochain pas</span>
            <p className="flou-nextstep-text">{response.nextStep}</p>
          </div>
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════
   RITUEL DU SOIR
   ══════════════════════════════════════════ */
function RituelSoirCard({ gender, yesterdayCheckIn, onSave }) {
  const done = isBilanDoneToday(yesterdayCheckIn)
  const [open, setOpen]   = useState(false)
  const [form, setForm]   = useState({ whatAdvanced: '', whatTookSpace: '', whatToPreserve: '', nextSmallStep: '', energy: '', confidence: '' })
  const [saved, setSaved] = useState(done)

  const canSave = form.nextSmallStep.trim().length >= 3

  const handleSave = () => {
    if (!canSave) return
    onSave({
      whatDone:          form.whatAdvanced,
      mainBlocker:       form.whatTookSpace,
      tomorrowIntention: form.nextSmallStep,
      energy:            form.energy,
      confidence:        form.confidence,
    })
    setSaved(true)
    setOpen(false)
  }

  const setField = (key, val) => setForm((f) => ({ ...f, [key]: val }))
  const toggleLevel = (key, val) => setField(key, form[key] === val ? '' : val)

  if (saved) {
    return (
      <div className="rituel-card rituel-card--done">
        <span className="rc-done-icon">✓</span>
        <div>
          <p className="rc-done-title">Rituel du soir enregistré.</p>
          <p className="rc-done-sub">C'est enregistré. Demain, ton espace pourra repartir de ce que tu as vécu aujourd'hui.</p>
        </div>
        <button className="rc-edit-btn" onClick={() => { setSaved(false); setOpen(true) }}>Modifier</button>
      </div>
    )
  }

  if (!open) {
    return (
      <div className="rituel-card rituel-card--cta" onClick={() => setOpen(true)}>
        <div className="rc-cta-inner">
          <div className="rc-moon" aria-hidden="true">◐</div>
          <div>
            <h3 className="rc-title">Rituel du soir</h3>
            <p className="rc-sub">Quelques lignes pour que demain soit mieux adapté à ta réalité.</p>
          </div>
        </div>
        <button className="rc-open-btn" onClick={(e) => { e.stopPropagation(); setOpen(true) }}>
          Préparer demain
        </button>
      </div>
    )
  }

  return (
    <div className="rituel-card rituel-card--form">
      <div className="rc-form-header">
        <h3 className="rc-title">Rituel du soir</h3>
        <button className="rc-close-btn" onClick={() => setOpen(false)} aria-label="Fermer">
          <IconX />
        </button>
      </div>
      <p className="rc-sub">Quelques lignes pour que demain soit mieux adapté à ta réalité.</p>

      {[
        { key: 'whatAdvanced',    label: "Qu'est-ce qui a avancé aujourd'hui ?",           placeholder: "Ex : J'ai avancé sur mon offre." },
        { key: 'whatTookSpace',   label: "Qu'est-ce qui a pris trop de place ?",             placeholder: "Ex : La peur de ne pas être crédible." },
        { key: 'whatToPreserve',  label: "Qu'est-ce que tu veux préserver demain ?",         placeholder: "Ex : Mon calme, ma concentration." },
        { key: 'nextSmallStep',   label: "Quel petit pas compterait vraiment ?",             placeholder: "Ex : Oser préparer un message pour un prospect." },
      ].map(({ key, label, placeholder }) => (
        <div key={key} className="rc-field">
          <label className="rc-label">{label}</label>
          <input
            type="text"
            className={`rc-input${key === 'nextSmallStep' ? ' rc-input--highlight' : ''}`}
            placeholder={placeholder}
            value={form[key]}
            onChange={(e) => setField(key, e.target.value)}
            maxLength={150}
          />
        </div>
      ))}

      <div className="rc-levels">
        {[
          { key: 'energy',     label: "Énergie" },
          { key: 'confidence', label: "Confiance" },
        ].map(({ key, label }) => (
          <div key={key} className="rc-level-group">
            <span className="rc-level-label">{label}</span>
            <div className="rc-level-opts">
              {['Basse', 'Moyenne', 'Haute'].map((lvl) => (
                <button
                  key={lvl}
                  className={`rc-level-btn${form[key] === lvl ? ' rc-level-btn--on' : ''}`}
                  onClick={() => toggleLevel(key, lvl)}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        className={`rc-save-btn${!canSave ? ' rc-save-btn--disabled' : ''}`}
        onClick={handleSave}
        disabled={!canSave}
      >
        Préparer demain
      </button>
    </div>
  )
}

/* ══════════════════════════════════════════
   TRAJECTOIRE — données honnêtes à 0
   ══════════════════════════════════════════ */
function TrajectoireCard() {
  return (
    <div className="trajectoire-card">
      <h3 className="traj-title">Trajectoire</h3>
      <div className="traj-stats">
        <div className="traj-stat">
          <span className="traj-val">0</span>
          <span className="traj-label">Premiers pas posés</span>
        </div>
        <div className="traj-divider" />
        <div className="traj-stat">
          <span className="traj-val">0</span>
          <span className="traj-label">Jours suivis</span>
        </div>
        <div className="traj-divider" />
        <div className="traj-stat">
          <span className="traj-val traj-val--text">En construction</span>
          <span className="traj-label">Clarté du cap</span>
        </div>
      </div>
      <p className="traj-note">
        Ta trajectoire commencera à évoluer dès que ton compte sera connecté.
      </p>
    </div>
  )
}

function DailyPhrasesCard({ user, yesterdayCheckIn }) {
  const phrases = generateDailyPhrases(user, yesterdayCheckIn).filter((p) => p.category !== 'Élan du jour')
  const [saved, setSaved] = useState(() => {
    const sp = loadSavedPhrases()
    return Object.fromEntries(phrases.map((p) => [p.id, sp.some((s) => s.text === p.text)]))
  })

  const handleSave = (phrase) => {
    if (saved[phrase.id]) return
    savePhrase({ text: phrase.text, category: phrase.category, source: 'Life Pulse', project: user.mainProject || null })
    setSaved((s) => ({ ...s, [phrase.id]: true }))
  }

  return (
    <div className="daily-phrases-section">
      <div className="dps-header">
        <span className="dps-tag">Tes autres phrases du jour</span>
        <p className="dps-sub">
          {yesterdayCheckIn
            ? "Créées selon ton profil et ton bilan de la veille."
            : "Créées selon ton profil. Fais le rituel du soir pour les personnaliser davantage."}
        </p>
      </div>
      <div className="dps-phrases">
        {phrases.map((p, i) => (
          <div key={p.id} className="phrase-item" style={{ '--pc': PHRASE_COLORS[i] }}>
            <span className="phrase-cat">{p.category}</span>
            <p className="phrase-text">"{p.text}"</p>
            <div className="phrase-actions">
              <button
                className={`phrase-save-btn${saved[p.id] ? ' phrase-save-btn--saved' : ''}`}
                onClick={() => handleSave(p)}
                disabled={saved[p.id]}
              >
                {saved[p.id] ? '★ Gardée' : '☆ Garder'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   PRÉPARER DEMAIN — section bilan simple
   ══════════════════════════════════════════ */
function TomorrowBilan({ gender, yesterdayCheckIn, onSave }) {
  const done = isBilanDoneToday(yesterdayCheckIn)
  const [form, setForm]   = useState({ whatDone: '', whatBlocked: '', tomorrowIntention: '' })
  const [saved, setSaved] = useState(done)

  const canSave = form.tomorrowIntention.trim().length >= 3

  const handleSave = () => {
    if (!canSave) return
    onSave({
      whatDone:          form.whatDone,
      mainBlocker:       form.whatBlocked,
      tomorrowIntention: form.tomorrowIntention,
    })
    setSaved(true)
  }

  if (saved) {
    return (
      <div className="tomorrow-bilan tomorrow-bilan--done">
        <span className="tb-done-icon">✓</span>
        <div>
          <p className="tb-done-title">Ton bilan est enregistré.</p>
          <p className="tb-done-sub">Ta prochaine mission pourra être adaptée.</p>
        </div>
        <button className="tb-edit-btn" onClick={() => setSaved(false)}>Modifier</button>
      </div>
    )
  }

  return (
    <div className="tomorrow-bilan">
      <div className="tb-header">
        <span className="tb-title">Préparer demain</span>
        <p className="tb-sub">Ce que tu écris ici permettra à AIxoria Life d'adapter ta prochaine mission.</p>
      </div>
      <div className="tb-form">
        <div className="tb-field">
          <label className="tb-label">Qu'as-tu réussi à faire aujourd'hui ?</label>
          <input
            type="text"
            className="tb-input"
            placeholder="Ex : J'ai travaillé sur mon site."
            value={form.whatDone}
            onChange={(e) => setForm((f) => ({ ...f, whatDone: e.target.value }))}
            maxLength={150}
          />
        </div>
        <div className="tb-field">
          <label className="tb-label">
            Qu'est-ce qui t'{agree(gender, 'a bloquée', 'a bloqué', 'a bloqué(e)')} ?
          </label>
          <input
            type="text"
            className="tb-input"
            placeholder="Ex : La peur de ne pas être crédible."
            value={form.whatBlocked}
            onChange={(e) => setForm((f) => ({ ...f, whatBlocked: e.target.value }))}
            maxLength={150}
          />
        </div>
        <div className="tb-field">
          <label className="tb-label">Quelle est ton intention pour demain ?</label>
          <input
            type="text"
            className="tb-input tb-input--highlight"
            placeholder="Ex : Oser préparer un message pour un prospect."
            value={form.tomorrowIntention}
            onChange={(e) => setForm((f) => ({ ...f, tomorrowIntention: e.target.value }))}
            maxLength={150}
          />
        </div>
        <button
          className={`tb-save-btn${!canSave ? ' tb-save-btn--disabled' : ''}`}
          onClick={handleSave}
          disabled={!canSave}
        >
          Préparer ma prochaine mission
        </button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   PARCOURS — 4 modules clés
   ══════════════════════════════════════════ */
const SESSION_PILLARS = [
  { id: 'life-pulse', label: 'Clarté',        icon: '💫', color: '#f472b6' },
  { id: 'discipline', label: 'Discipline',    icon: '🧠', color: '#8b5cf6' },
  { id: 'future-me',  label: 'Confiance',     icon: '🌟', color: '#a78bfa' },
  { id: 'business',   label: 'Indépendance',  icon: '🚀', color: '#f59e0b' },
]

function SimplifiedModules({ onModuleClick, planConfig }) {
  const isLocked = (id) => !planConfig.modules.includes(id)

  return (
    <div className="simple-modules">
      <div className="smod-header">
        <span className="smod-title">Ton parcours</span>
      </div>
      <div className="smod-grid">
        {SESSION_PILLARS.map((p) => {
          const locked = isLocked(p.id)
          const mod    = MODULES.find((m) => m.id === p.id)
          return (
            <button
              key={p.id}
              className={`smod-card${locked ? ' smod-card--locked' : ''}`}
              style={{ '--mc': p.color }}
              onClick={() => mod && onModuleClick(mod, locked)}
            >
              <span className="smod-icon" aria-hidden="true">{p.icon}</span>
              <span className="smod-label">{p.label}</span>
              {locked && <span className="smod-lock"><IconLock /></span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   BILAN DU SOIR — formulaire complet (Life Pulse)
   ══════════════════════════════════════════ */
const BILAN_INIT = { whatDone: '', mainBlocker: '', confidence: '', energy: '', tomorrowIntention: '' }
const LEVEL_OPTIONS = ['Basse', 'Moyenne', 'Haute']

function EveningSummaryCard({ gender, yesterdayCheckIn, onSave }) {
  const done              = isBilanDoneToday(yesterdayCheckIn)
  const [open, setOpen]   = useState(false)
  const [form, setForm]   = useState(BILAN_INIT)
  const [saved, setSaved] = useState(done)

  const canSave = form.tomorrowIntention.trim().length >= 5

  const handleSave = () => {
    if (!canSave) return
    onSave(form)
    setSaved(true)
    setOpen(false)
  }

  const setField = (key, val) => setForm((f) => ({ ...f, [key]: val }))
  const toggleLevel = (key, val) => setField(key, form[key] === val ? '' : val)

  if (saved) {
    return (
      <div className="bilan-card bilan-card--done">
        <span className="bilan-done-check">✓</span>
        <div>
          <span className="bilan-done-title">Rituel du soir enregistré</span>
          <p className="bilan-done-sub">Ton espace de demain sera adapté à ta réalité.</p>
        </div>
        <button className="bilan-edit-btn" onClick={() => { setSaved(false); setOpen(true) }}>
          Modifier
        </button>
      </div>
    )
  }

  if (!open) {
    return (
      <div className="bilan-card bilan-card--cta" onClick={() => setOpen(true)}>
        <div className="bilan-cta-inner">
          <div className="bilan-moon" aria-hidden="true">◐</div>
          <div>
            <h3 className="bilan-title">Rituel du soir</h3>
            <p className="bilan-sub">Ce que tu écris ce soir adapte ta mission et tes phrases de demain.</p>
          </div>
        </div>
        <button className="bilan-open-btn" onClick={(e) => { e.stopPropagation(); setOpen(true) }}>
          Préparer demain
        </button>
      </div>
    )
  }

  return (
    <div className="bilan-card bilan-card--form">
      <div className="bilan-form-header">
        <h3 className="bilan-title">Bilan du soir</h3>
        <button className="bilan-close-btn" onClick={() => setOpen(false)} aria-label="Fermer">
          <IconX />
        </button>
      </div>
      <p className="bilan-sub">Ce que tu écris ici permet à AIxoria Life d'adapter ta mission et tes phrases de demain.</p>

      <div className="bilan-question">
        <label className="bilan-q-label">
          Qu'as-tu {agree(gender, 'fait', 'fait', 'fait')} aujourd'hui ?
        </label>
        <input
          type="text"
          className="bilan-input"
          placeholder="Ex : J'ai travaillé sur mon site et contacté un prospect."
          value={form.whatDone}
          onChange={(e) => setField('whatDone', e.target.value)}
          maxLength={150}
        />
      </div>

      <div className="bilan-question">
        <label className="bilan-q-label">
          Qu'est-ce qui t'a {agree(gender, 'bloquée', 'bloqué', 'bloqué(e)')} ?
        </label>
        <input
          type="text"
          className="bilan-input"
          placeholder="Ex : La peur de ne pas être crédible..."
          value={form.mainBlocker}
          onChange={(e) => setField('mainBlocker', e.target.value)}
          maxLength={150}
        />
      </div>

      <div className="bilan-question">
        <label className="bilan-q-label">Ton niveau de confiance aujourd'hui</label>
        <div className="bilan-q-options">
          {LEVEL_OPTIONS.map((lvl) => (
            <button
              key={lvl}
              className={`bilan-opt${form.confidence === lvl ? ' bilan-opt--selected' : ''}`}
              onClick={() => toggleLevel('confidence', lvl)}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="bilan-question">
        <label className="bilan-q-label">Ton niveau d'énergie aujourd'hui</label>
        <div className="bilan-q-options">
          {LEVEL_OPTIONS.map((lvl) => (
            <button
              key={lvl}
              className={`bilan-opt${form.energy === lvl ? ' bilan-opt--selected' : ''}`}
              onClick={() => toggleLevel('energy', lvl)}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="bilan-question">
        <label className="bilan-q-label">Ton intention pour demain</label>
        <input
          type="text"
          className="bilan-input"
          placeholder="Ex : Oser préparer un message pour un prospect."
          value={form.tomorrowIntention}
          onChange={(e) => setField('tomorrowIntention', e.target.value)}
          maxLength={150}
        />
      </div>

      <button
        className={`bilan-save-btn${!canSave ? ' bilan-save-btn--disabled' : ''}`}
        onClick={handleSave}
        disabled={!canSave}
      >
        Préparer demain
      </button>
    </div>
  )
}

/* ══════════════════════════════════════════
   LIFE PULSE MODULE VIEW — vue complète
   ══════════════════════════════════════════ */
function LifePulseModuleView({ user, yesterdayCheckIn, onSaveBilan, onBack }) {
  const phrases = generateDailyPhrases(user, yesterdayCheckIn)
  const [saved, setSaved] = useState(() => {
    const sp = loadSavedPhrases()
    return Object.fromEntries(phrases.map((p) => [p.id, sp.some((s) => s.text === p.text)]))
  })

  const handleSave = (phrase) => {
    if (saved[phrase.id]) return
    savePhrase({ text: phrase.text, category: phrase.category, source: 'Life Pulse', project: user.mainProject || null })
    setSaved((s) => ({ ...s, [phrase.id]: true }))
  }

  const labelFor = (options, key) => options.find((o) => o.key === key)?.label || key

  return (
    <div className="module-view fade-in-up">
      <button className="btn-back" onClick={onBack}>
        <IconBack />
        Retour au dashboard
      </button>

      <div className="module-view-header" style={{ '--mc': '#a78bfa' }}>
        <div className="mvh-accent" />
        <div className="mvh-inner">
          <span className="mvh-icon" aria-hidden="true">💫</span>
          <div>
            <h1 className="mvh-title">Life Pulse</h1>
            <p className="mvh-desc">Tes élans du jour, ton état émotionnel et ton rituel du soir.</p>
          </div>
        </div>
      </div>

      <section className="lp-section">
        <div className="lp-section-header">
          <h2 className="lp-section-title">Tes élans du jour</h2>
          <p className="lp-section-sub">
            {yesterdayCheckIn
              ? "Personnalisées selon ton bilan de la veille et ton profil."
              : "Générées selon ton profil. Fais ton bilan du soir pour les personnaliser davantage."}
          </p>
        </div>
        <div className="dps-phrases">
          {phrases.map((p, i) => (
            <div key={p.id} className="phrase-item" style={{ '--pc': PHRASE_COLORS[i] }}>
              <span className="phrase-cat">{p.category}</span>
              <p className="phrase-text">"{p.text}"</p>
              <div className="phrase-actions">
                <button
                  className={`phrase-save-btn${saved[p.id] ? ' phrase-save-btn--saved' : ''}`}
                  onClick={() => handleSave(p)}
                  disabled={saved[p.id]}
                >
                  {saved[p.id] ? '★ Gardée' : '☆ Garder'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {yesterdayCheckIn && (
        <section className="lp-section">
          <div className="lp-section-header">
            <h2 className="lp-section-title">Ton bilan utilisé</h2>
            <p className="lp-section-sub">Données de ton dernier bilan du soir.</p>
          </div>
          <div className="lp-context-grid">
            {yesterdayCheckIn.whatDone && (
              <div className="lp-ctx-item lp-ctx-item--full">
                <span className="lp-ctx-label">Ce que tu as fait</span>
                <span className="lp-ctx-value lp-ctx-value--quote">"{yesterdayCheckIn.whatDone}"</span>
              </div>
            )}
            {yesterdayCheckIn.mainBlocker && (
              <div className="lp-ctx-item">
                <span className="lp-ctx-label">Blocage</span>
                <span className="lp-ctx-value">{yesterdayCheckIn.mainBlocker}</span>
              </div>
            )}
            {yesterdayCheckIn.confidence && (
              <div className="lp-ctx-item">
                <span className="lp-ctx-label">Confiance</span>
                <span className="lp-ctx-value">{yesterdayCheckIn.confidence}</span>
              </div>
            )}
            {yesterdayCheckIn.energy && (
              <div className="lp-ctx-item">
                <span className="lp-ctx-label">Énergie</span>
                <span className="lp-ctx-value">{yesterdayCheckIn.energy}</span>
              </div>
            )}
            {(yesterdayCheckIn.tomorrowIntention || yesterdayCheckIn.intention) && (
              <div className="lp-ctx-item lp-ctx-item--full">
                <span className="lp-ctx-label">Intention pour aujourd'hui</span>
                <span className="lp-ctx-value lp-ctx-value--quote">"{yesterdayCheckIn.tomorrowIntention || yesterdayCheckIn.intention}"</span>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="lp-section">
        <div className="lp-section-header">
          <h2 className="lp-section-title">Rituel du soir</h2>
          <p className="lp-section-sub">Remplis ce rituel pour personnaliser ton espace de demain.</p>
        </div>
        <EveningSummaryCard
          gender={user.gender}
          yesterdayCheckIn={yesterdayCheckIn}
          onSave={onSaveBilan}
        />
      </section>
    </div>
  )
}

/* ══════════════════════════════════════════
   MON PROJET — formulaire de personnalisation
   ══════════════════════════════════════════ */
const PROJECT_FIELDS = [
  { key: 'lifeGoal',       label: 'Objectif de vie',    rows: 2, placeholder: 'Ex : Devenir indépendante.' },
  { key: 'mainProject',    label: 'Projet principal',   rows: 2, placeholder: 'Ex : Lancer mon agence IA.' },
  { key: 'projectStage',   label: 'Où tu en es',        rows: 3, placeholder: "Ex : J'ai commencé le site, mais je dois clarifier mon offre et oser parler aux clients." },
  { key: 'currentFocus',   label: 'Mon focus actuel',   rows: 2, placeholder: 'Ex : Préparer mon offre et contacter mes premiers prospects.' },
  { key: 'next30DaysGoal', label: 'Objectif 30 jours',  rows: 2, placeholder: 'Ex : Avoir ma première offre claire et un premier contact client.' },
]

function MyProjectSection({ user, onSave, onBack }) {
  const [form, setForm] = useState({
    lifeGoal:       user.lifeGoal       || '',
    mainProject:    user.mainProject    || '',
    projectStage:   user.projectStage   || '',
    currentFocus:   user.currentFocus   || '',
    next30DaysGoal: user.next30DaysGoal || '',
  })
  const [saved, setSaved] = useState(false)

  const setField    = (key, val) => { setForm((f) => ({ ...f, [key]: val })); setSaved(false) }
  const hasContent  = Object.values(form).some((v) => v.trim().length > 0)

  const handleSave = () => {
    onSave(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="module-view fade-in-up">
      <button className="btn-back" onClick={onBack}>
        <IconBack />
        Retour au dashboard
      </button>
      <div className="settings-section">
        <div className="settings-header">
          <span className="settings-icon">🎯</span>
          <div>
            <h1 className="settings-title">Mon cap</h1>
            <p className="settings-sub">
              Ces informations permettent à AIxoria Life de personnaliser ton mouvement du jour, tes élans et tes recommandations.
            </p>
          </div>
        </div>
        <div className="project-form">
          {PROJECT_FIELDS.map(({ key, label, rows, placeholder }) => (
            <div key={key} className="project-field">
              <label className="pf-label">{label}</label>
              <textarea
                className="pf-textarea"
                placeholder={placeholder}
                value={form[key]}
                onChange={(e) => setField(key, e.target.value)}
                rows={rows}
                maxLength={300}
              />
            </div>
          ))}
          <button
            className={`bilan-save-btn${saved ? ' bilan-save-btn--saved' : ''}${!hasContent ? ' bilan-save-btn--disabled' : ''}`}
            onClick={handleSave}
            disabled={!hasContent}
          >
            {saved ? '✓ Cap enregistré !' : 'Enregistrer mon cap'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   PROGRESSION — données honnêtes à 0
   ══════════════════════════════════════════ */
function ProgressionCard() {
  return (
    <div className="progression-card">
      <h3 className="prog-title">Progression</h3>
      <div className="prog-stats">
        <div className="prog-stat">
          <span className="prog-val">0 %</span>
          <span className="prog-label">Score discipline</span>
        </div>
        <div className="prog-divider" />
        <div className="prog-stat">
          <span className="prog-val">0</span>
          <span className="prog-label">Jour de série</span>
        </div>
        <div className="prog-divider" />
        <div className="prog-stat">
          <span className="prog-val">0 / 3</span>
          <span className="prog-label">Actions réalisées</span>
        </div>
      </div>
      <p className="prog-note">
        Ta progression commencera à évoluer dès que ton compte sera connecté.
      </p>
    </div>
  )
}

/* ══════════════════════════════════════════
   TON PARCOURS — piliers + outils
   ══════════════════════════════════════════ */
function ModulesSection({ planConfig, onModuleClick }) {
  const isLocked = (modId) => !planConfig.modules.includes(modId)

  const renderPillar = (modId) => {
    const mod    = MODULES.find((m) => m.id === modId)
    const locked = isLocked(modId)
    if (!mod) return null

    return (
      <div
        key={modId}
        className={`pillar-card${locked ? ' pillar-card--locked' : ''}`}
        style={{ '--mc': mod.color }}
        onClick={() => onModuleClick(mod, locked)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onModuleClick(mod, locked)}
      >
        <div className="pc-top">
          <span className="pc-icon" aria-hidden="true">{mod.icon}</span>
          {locked && <span className="pc-lock" aria-label="Verrouillé"><IconLock /></span>}
        </div>
        <h3 className="pc-name">{MODULE_LABELS[modId] || mod.name}</h3>
        <p className="pc-desc">{PILLAR_DESCS[modId] || mod.description}</p>
        <div className="pc-footer">
          {locked
            ? <span className="pc-status-locked">Plan supérieur requis</span>
            : <span className="pc-status-open">Ouvrir →</span>
          }
        </div>
      </div>
    )
  }

  const renderTool = (modId) => {
    const mod    = MODULES.find((m) => m.id === modId)
    const locked = isLocked(modId)
    if (!mod) return null

    return (
      <div
        key={modId}
        className={`tool-card${locked ? ' tool-card--locked' : ''}`}
        style={{ '--mc': mod.color }}
        onClick={() => onModuleClick(mod, locked)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onModuleClick(mod, locked)}
      >
        <span className="tc-icon" aria-hidden="true">{mod.icon}</span>
        <span className="tc-name">{MODULE_LABELS[modId] || mod.name}</span>
        {locked && <span className="tc-lock"><IconLock /></span>}
      </div>
    )
  }

  return (
    <div className="modules-section">
      <div className="modules-header">
        <h3 className="modules-title">Ton parcours AIxoria Life</h3>
        <p className="modules-sub">4 piliers pour structurer ta progression</p>
      </div>
      <div className="modules-pillars">
        {PILLARS.map(renderPillar)}
      </div>
      <h4 className="modules-comp-title">Outils complémentaires</h4>
      <div className="modules-tools">
        {COMPLEMENTS.map(renderTool)}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   PHRASES REPÈRES — mini-carte pour Aujourd'hui
   ══════════════════════════════════════════ */
function PhrasesReperesMinCard({ onNavigate }) {
  const phrases = loadSavedPhrases()
  const last    = phrases[0] || null

  return (
    <div className="repere-mini-card">
      <div className="rmc-header">
        <span className="rmc-label">Phrase repère</span>
        <button className="rmc-link" onClick={() => onNavigate('phrases-reperes')}>
          Voir mes phrases repères →
        </button>
      </div>
      {last ? (
        <p className="rmc-text">"{last.text}"</p>
      ) : (
        <p className="rmc-empty">
          Garde les phrases qui te parlent. Elles construiront ta bibliothèque personnelle.
        </p>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════
   PHRASES REPÈRES — page complète
   ══════════════════════════════════════════ */
function PhrasesReperesView({ onBack, onGoToday }) {
  const [phrases, setPhrases] = useState(() => loadSavedPhrases())
  const [usedToday, setUsedToday] = useState({})

  const handleRemove = (id) => {
    removePhrase(id)
    setPhrases(loadSavedPhrases())
  }

  const handleUseToday = (id) => {
    setUsedToday((s) => ({ ...s, [id]: true }))
    setTimeout(() => setUsedToday((s) => ({ ...s, [id]: false })), 2500)
  }

  return (
    <div className="phrases-reperes-page fade-in-up">
      <button className="btn-back" onClick={onBack}>
        <IconBack />
        Retour au dashboard
      </button>

      <div className="pr-page-header">
        <h1 className="pr-page-title">Mes phrases repères</h1>
        <p className="pr-page-sub">
          Les mots que tu as choisis de garder pour revenir à ton cap quand tu en as besoin.
        </p>
      </div>

      {phrases.length === 0 ? (
        <div className="pr-empty">
          <div className="pr-empty-inner">
            <div className="pr-empty-icon" aria-hidden="true">◈</div>
            <h2 className="pr-empty-title">Ton espace d'inspiration est encore vide.</h2>
            <p className="pr-empty-text">
              Quand une phrase te parle, garde-la. Elle deviendra un repère pour les jours où tu auras besoin de revenir à toi.
            </p>
            <button className="pr-empty-btn" onClick={onGoToday}>
              Voir mes élans du jour
            </button>
          </div>
        </div>
      ) : (
        <div className="pr-list">
          {phrases.map((phrase) => {
            const bgColor   = REPERE_CATEGORY_COLORS[phrase.category]  || 'rgba(255,255,255,.04)'
            const textColor = REPERE_CATEGORY_TEXT[phrase.category]    || 'rgba(203,213,255,.65)'
            const contextLine = phrase.project
              ? `Liée à ton projet : ${phrase.project}`
              : null

            return (
              <div key={phrase.id} className="pr-card">
                <div className="pr-card-top">
                  <span
                    className="pr-badge"
                    style={{ background: bgColor, color: textColor }}
                  >
                    {phrase.category}
                  </span>
                  <span className="pr-date">{formatRepereDate(phrase.createdAt)}</span>
                </div>
                <p className="pr-text">"{phrase.text}"</p>
                {contextLine && (
                  <p className="pr-context">{contextLine}</p>
                )}
                <div className="pr-card-actions">
                  {usedToday[phrase.id] ? (
                    <span className="pr-used-confirm">Phrase activée pour aujourd'hui</span>
                  ) : (
                    <button className="pr-btn pr-btn--use" onClick={() => handleUseToday(phrase.id)}>
                      Utiliser aujourd'hui
                    </button>
                  )}
                  <button
                    className="pr-btn pr-btn--remove"
                    onClick={() => handleRemove(phrase.id)}
                  >
                    Retirer
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════
   DASHBOARD HOME — session personnelle
   ══════════════════════════════════════════ */
function DashboardHome({ user, planConfig, onModuleClick, onNavigate, yesterdayCheckIn, onSaveBilan }) {
  const profile = { ...user, lastCheckIn: yesterdayCheckIn }
  const [mission, setMission]           = useState(() => generateDailyMission(profile))
  const [refreshCount, setRefreshCount] = useState(0)

  const handleChangeMission = () => {
    const varied = {
      ...profile,
      blockers: profile.blockers.slice(1).concat(profile.blockers.slice(0, 1)),
      _refresh: refreshCount + 1,
    }
    setMission(generateDailyMission(varied))
    setRefreshCount((n) => n + 1)
  }

  return (
    <div className="today-page fade-in-up">
      <SessionHeader user={user} />
      <EspaceDuJourCard mission={mission} onChangeMission={handleChangeMission} />
      <MomentumCard profile={profile} />
      <PhrasesReperesMinCard onNavigate={onNavigate} />
      <EnergieSection profile={profile} mission={mission} />
      <QuandCestFlouSection gender={user.gender} />
      <RituelSoirCard gender={user.gender} yesterdayCheckIn={yesterdayCheckIn} onSave={onSaveBilan} />
      <TrajectoireCard />
      <SimplifiedModules onModuleClick={onModuleClick} planConfig={planConfig} />
    </div>
  )
}

/* ══════════════════════════════════════════
   MODULE VIEW
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
          <span className="mvh-icon" aria-hidden="true">{mod.icon}</span>
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
            <span className="fc-icon" aria-hidden="true">{feature.icon}</span>
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
   PARAMÈTRES
   ══════════════════════════════════════════ */
function SettingsSection({ user, planConfig, onGenderChange, onBack }) {
  const preview = agree(
    user.gender,
    "Tu n'as pas besoin d'être parfaite aujourd'hui.",
    "Tu n'as pas besoin d'être parfait aujourd'hui.",
    "Tu n'as pas besoin que tout soit parfait aujourd'hui."
  )

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
            <div className="sc-row"><span>Plan</span><strong>{planConfig.name} — {planConfig.price}</strong></div>
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
            <div className="sc-row"><span>Life Pulse quotidien</span><strong>À connecter</strong></div>
            <div className="sc-row"><span>Rappels discipline</span><strong>À connecter</strong></div>
            <button className="sc-btn">Configurer</button>
          </div>
        </div>

        <div className="settings-gender-section">
          <div className="sgs-header">
            <h3 className="sgs-title">✍️ Accord des phrases</h3>
            <p className="sgs-sub">Choisis comment AIxoria Life s'adresse à toi dans les messages motivants.</p>
          </div>
          <div className="sgs-options">
            {GENDER_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`sgs-option${user.gender === opt.value ? ' sgs-option--active' : ''}`}
                onClick={() => onGenderChange(opt.value)}
              >
                <span className="sgs-option-label">{opt.label}</span>
                <span className="sgs-option-example">{opt.example}</span>
                {user.gender === opt.value && (
                  <span className="sgs-option-check" aria-label="Sélectionné">✓</span>
                )}
              </button>
            ))}
          </div>
          <p className="sgs-note">💡 Ce réglage sera sauvegardé dans ton profil après connexion.</p>
          <div className="sgs-preview">
            <span className="sgs-preview-label">Aperçu :</span>
            <span className="sgs-preview-text">"{preview}"</span>
          </div>
        </div>

        <div className="settings-profile-section">
          <h3 className="sps-title">🎯 Mon profil complet</h3>

          {/* Champ unique : style de motivation */}
          <div className="profile-multi-row">
            <span className="pms-label">Style de motivation</span>
            {user.motivationStyle ? (
              <div className="pms-badges">
                <span className="pms-badge">{user.motivationStyle.charAt(0).toUpperCase() + user.motivationStyle.slice(1)}</span>
              </div>
            ) : (
              <span className="pms-empty">Non renseigné — complète l'onboarding</span>
            )}
          </div>

          {/* Champs multiples */}
          {[
            { key: 'situations',  label: 'Situation' },
            { key: 'goals',       label: 'Objectifs' },
            { key: 'blockers',    label: 'Blocages' },
            { key: 'lifeSeasons', label: 'Période de vie' },
          ].map(({ key, label }) => {
            const values = user[key] || []
            return (
              <div key={key} className="profile-multi-row">
                <span className="pms-label">{label}</span>
                {values.length > 0 ? (
                  <div className="pms-badges">
                    {values.map((v) => <span key={v} className="pms-badge">{v}</span>)}
                  </div>
                ) : (
                  <span className="pms-empty">Non renseigné — complète l'onboarding</span>
                )}
              </div>
            )
          })}
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
   PAGE PRINCIPALE
   ══════════════════════════════════════════ */
export default function ClientDashboard() {
  const navigate = useNavigate()
  const [user, setUser]                         = useState(() => loadProfile())
  const [activeModule, setActiveModule]         = useState(null)
  const [lockedModal, setLockedModal]           = useState(null)
  const [sidebarOpen, setSidebarOpen]           = useState(false)
  const [yesterdayCheckIn, setYesterdayCheckIn] = useState(() => loadYesterdayCheckIn())

  useEffect(() => {
    const session = loadSession()
    if (!session?.loggedIn) { navigate('/login'); return }
    setUser(loadProfile())
  }, [navigate])

  const planConfig = PLAN_CONFIG[user.plan] || PLAN_CONFIG.starter

  const handleSaveBilan = (data) => {
    saveEveningBilan(data)
    setYesterdayCheckIn({ ...data, savedAt: new Date().toISOString() })
  }

  const handleSaveProject = (projectData) => {
    saveProfile(projectData)
    setUser((u) => ({ ...u, ...projectData }))
  }

  const handleModuleClick = (mod, locked) => {
    if (locked) setLockedModal(mod)
    else { setActiveModule(mod.id); setSidebarOpen(false) }
  }

  const handleNav = (id) => { setActiveModule(id); setSidebarOpen(false) }

  const handlePlanSwitch = (plan) => { setUser((u) => ({ ...u, plan })); setActiveModule(null) }

  const handleGenderChange = (gender) => setUser((u) => ({ ...u, gender }))

  const currentMod = MODULES.find((m) => m.id === activeModule)

  const renderContent = () => {
    if (activeModule === 'settings') {
      return (
        <SettingsSection
          user={user}
          planConfig={planConfig}
          onGenderChange={handleGenderChange}
          onBack={() => setActiveModule(null)}
        />
      )
    }
    if (activeModule === 'my-project') {
      return (
        <MyProjectSection
          user={user}
          onSave={handleSaveProject}
          onBack={() => setActiveModule(null)}
        />
      )
    }
    if (activeModule === 'life-pulse') {
      return (
        <LifePulseModuleView
          user={user}
          yesterdayCheckIn={yesterdayCheckIn}
          onSaveBilan={handleSaveBilan}
          onBack={() => setActiveModule(null)}
        />
      )
    }
    if (activeModule === 'phrases-reperes') {
      return (
        <PhrasesReperesView
          onBack={() => setActiveModule(null)}
          onGoToday={() => setActiveModule(null)}
        />
      )
    }
    if (activeModule && currentMod) {
      return <ModuleView mod={currentMod} onBack={() => setActiveModule(null)} />
    }
    return (
      <DashboardHome
        user={user}
        planConfig={planConfig}
        onModuleClick={handleModuleClick}
        onNavigate={handleNav}
        yesterdayCheckIn={yesterdayCheckIn}
        onSaveBilan={handleSaveBilan}
        onEditProject={() => { setActiveModule('my-project'); setSidebarOpen(false) }}
      />
    )
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
        onLogout={() => { clearSession(); navigate('/login') }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="main-area">
        <div className="mobile-topbar">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Ouvrir le menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <BrandLogo size="sm" onClick={() => setActiveModule(null)} />
        </div>

        <div className="main-content">
          <div className="dev-nav-bar">
            <span className="dev-nav-label">Dev :</span>
            {PLAN_OPTS.map((m) => (
              <button
                key={m.plan}
                className={`dev-nav-link${user.plan === m.plan ? ' dev-nav-link--on' : ''}`}
                onClick={() => handlePlanSwitch(m.plan)}
              >
                {m.label}
              </button>
            ))}
            <span className="dev-nav-sep">|</span>
            <button className="dev-nav-link" onClick={() => navigate('/')}>Landing</button>
            <button className="dev-nav-link" onClick={() => navigate('/admin')}>Admin</button>
            <button className="dev-nav-link" onClick={() => navigate('/onboarding')}>Onboarding</button>
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
              <strong>{planConfig.name}</strong>.
            </p>
            <p className="modal-hint">
              Passe au plan{' '}
              <strong>{lockedModal.planRequired === 'builder' ? 'Builder' : 'Pro'}</strong>{' '}
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
