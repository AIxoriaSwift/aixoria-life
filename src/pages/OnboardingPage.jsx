import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo'
import { IconArrow } from '../components/icons'
import { loadAccount, saveAccount, saveSession } from '../auth'

export const PROFILE_KEY = 'aixoria_life_profile'

/* ══════════════════════════════════════════
   ÉTAPES D'ONBOARDING
   ══════════════════════════════════════════ */
const STEPS = [
  {
    id: 'name',
    type: 'text',
    emoji: '👋',
    title: "Comment tu t'appelles ?",
    sub: "Ton prénom pour personnaliser ton espace AIxoria Life.",
    placeholder: "Ex : Maëlle",
  },
  {
    id: 'gender',
    type: 'single',
    emoji: '✍️',
    title: "Quel accord veux-tu pour tes phrases ?",
    sub: "Choisis l'accord qui te correspond le mieux pour personnaliser tes affirmations.",
    cols: 3,
    options: [
      { value: 'female',  label: 'Féminin',          desc: 'parfaite, prête, fière',     icon: '🌸' },
      { value: 'male',    label: 'Masculin',          desc: 'parfait, prêt, fier',        icon: '✦' },
      { value: 'neutral', label: 'Neutre / inclusif', desc: 'tout soit parfait, tu peux', icon: '◇' },
    ],
  },
  {
    id: 'situations',
    type: 'multi',
    emoji: '📍',
    title: "Quelle est ta situation actuelle ?",
    sub: "Sélectionne ce qui correspond à ta vie actuelle. AIxoria Life adaptera ton parcours selon ta réalité.",
    cols: 2,
    options: [
      { value: 'je travaille déjà',                label: 'Je travaille déjà',               icon: '💼' },
      { value: "je suis étudiant(e)",               label: "Je suis étudiant(e)",              icon: '📚' },
      { value: "je veux devenir indépendant(e)",    label: "Je veux devenir indépendant(e)",   icon: '🚀' },
      { value: "je suis déjà indépendant(e)",       label: "Je suis déjà indépendant(e)",      icon: '⚡' },
      { value: "je suis en transition",             label: "Je suis en transition",             icon: '🔄' },
      { value: "je veux reprendre ma vie en main",  label: "Je veux reprendre ma vie en main",  icon: '🦁' },
    ],
  },
  {
    id: 'goals',
    type: 'multi',
    emoji: '🎯',
    title: "Quels sont tes objectifs principaux ?",
    sub: "Sélectionne les objectifs qui comptent le plus pour toi. AIxoria Life adaptera ton plan, tes affirmations et tes modules.",
    cols: 2,
    options: [
      { value: "devenir plus discipliné(e)",  label: "Devenir plus discipliné(e)",   icon: '🧠' },
      { value: "lancer mon activité",          label: "Lancer mon activité",           icon: '🚀' },
      { value: "mieux organiser ma vie",       label: "Mieux organiser ma vie",        icon: '📅' },
      { value: "reprendre confiance en moi",   label: "Reprendre confiance en moi",    icon: '💎' },
      { value: "gérer mon argent",             label: "Gérer mon argent",              icon: '💰' },
      { value: "créer du contenu",             label: "Créer du contenu",              icon: '✨' },
      { value: "préparer mon indépendance",    label: "Préparer mon indépendance",     icon: '🌟' },
    ],
  },
  {
    id: 'blockers',
    type: 'multi',
    emoji: '🔍',
    title: "Qu'est-ce qui te bloque le plus aujourd'hui ?",
    sub: "Sélectionne les blocages que tu veux apprendre à dépasser.",
    cols: 2,
    options: [
      { value: "je procrastine",                      label: "Je procrastine",                       icon: '🚫' },
      { value: "je doute de moi",                     label: "Je doute de moi",                      icon: '💭' },
      { value: "je manque de clarté",                 label: "Je manque de clarté",                  icon: '🌫️' },
      { value: "je suis fatigué(e)",                  label: "Je suis fatigué(e)",                   icon: '😮‍💨' },
      { value: "j'ai peur du jugement",               label: "J'ai peur du jugement",                icon: '👁️' },
      { value: "je ne sais pas par où commencer",     label: "Je ne sais pas par où commencer",      icon: '🗺️' },
      { value: "je commence mais je ne tiens pas",    label: "Je commence mais je ne tiens pas",     icon: '🔁' },
    ],
  },
  {
    id: 'lifeSeasons',
    type: 'multi',
    emoji: '🌿',
    title: "Dans quelle période de vie te reconnais-tu ?",
    sub: "Ta période de vie aide AIxoria Life à t'envoyer des messages plus justes et plus adaptés.",
    cols: 2,
    options: [
      { value: "je veux changer de vie",            label: "Je veux changer de vie",              icon: '🌅' },
      { value: "je construis un projet",             label: "Je construis un projet",               icon: '🏗️' },
      { value: "je me reconstruis",                  label: "Je me reconstruis",                    icon: '🌱' },
      { value: "je veux devenir auto-entrepreneur",  label: "Je veux devenir auto-entrepreneur",    icon: '🏢' },
      { value: "je veux mieux gérer mon quotidien",  label: "Je veux mieux gérer mon quotidien",    icon: '📋' },
      { value: "je veux retrouver une discipline",   label: "Je veux retrouver une discipline",     icon: '🎯' },
    ],
  },
  {
    id: 'motivationStyle',
    type: 'single',
    emoji: '💬',
    title: "Quel style de motivation te parle le plus ?",
    sub: "Choisis le ton principal qu'AIxoria Life utilisera pour tes affirmations et tes rappels.",
    cols: 2,
    options: [
      { value: "doux et rassurant",             label: "Doux et rassurant",       desc: "Bienveillant et doux",          icon: '🌸' },
      { value: "direct et challengeant",         label: "Direct et challengeant",  desc: "Qui te pousse à agir fort",     icon: '⚡' },
      { value: "premium et posé",                label: "Premium et posé",          desc: "Élégant et profond",            icon: '💎' },
      { value: "inspirant",                      label: "Inspirant",                desc: "Qui élève ta vision",           icon: '🌟' },
      { value: "très concret et orienté action", label: "Très concret",             desc: "Actions claires, sans détour",  icon: '🎯' },
    ],
  },
  {
    id: 'spiritualPreference',
    type: 'single',
    emoji: '🌿',
    title: "As-tu une dimension spirituelle dans ta vie ?",
    sub: "AIxoria Life peut intégrer une touche spirituelle dans ton élan quotidien — ou rester totalement laïque. Tu choisis.",
    cols: 1,
    options: [
      { value: "neutral",   label: "Sans dimension spirituelle", desc: "Messages de coaching purs, sans référence spirituelle ou religieuse", icon: '🧭' },
      { value: "spiritual", label: "Spiritualité générale",       desc: "Une touche inspirante — sagesse, énergie, connexion à soi",           icon: '🌿' },
      { value: "bible",     label: "Versets bibliques",           desc: "Un verset de la Bible choisi selon ton contexte du jour",             icon: '📖' },
    ],
  },
  {
    id: 'summary',
    type: 'summary',
    emoji: '✨',
    title: "Ton profil AIxoria Life",
    sub: "Voici ce qu'AIxoria Life a compris de toi. Tout est personnalisé selon tes réponses.",
  },
]

const GENDER_LABELS = { female: 'Féminin', male: 'Masculin', neutral: 'Neutre / inclusif' }

const SUMMARY_MULTI = [
  { key: 'situations',  label: 'Situation' },
  { key: 'goals',       label: 'Objectifs' },
  { key: 'blockers',    label: 'Blocages' },
  { key: 'lifeSeasons', label: 'Période de vie' },
]

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '—')

/* ══════════════════════════════════════════
   COMPOSANT PRINCIPAL
   ══════════════════════════════════════════ */
export default function OnboardingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const account = loadAccount()
    if (!account) { navigate('/signup'); return }
    if (account.onboardingCompleted) { navigate('/app') }
  }, [navigate])

  const account = loadAccount()
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState({
    name:            account?.name || '',
    gender:          '',
    situations:      [],
    goals:           [],
    blockers:        [],
    lifeSeasons:          [],
    motivationStyle:      '',
    spiritualPreference:  '',
  })
  const [textVal, setTextVal] = useState(account?.name || '')
  const [saving, setSaving]   = useState(false)

  const cur     = STEPS[step]
  const isFirst = step === 0
  const isLast  = step === STEPS.length - 1

  const canContinue = (() => {
    if (cur.type === 'text')    return textVal.trim().length >= 2
    if (cur.type === 'single')  return !!answers[cur.id]
    if (cur.type === 'multi')   return Array.isArray(answers[cur.id]) && answers[cur.id].length >= 1
    if (cur.type === 'summary') return true
    return false
  })()

  const handleSelect = (value) => {
    if (cur.type === 'single') {
      setAnswers((a) => ({ ...a, [cur.id]: value }))
    } else if (cur.type === 'multi') {
      setAnswers((a) => {
        const arr    = a[cur.id]
        const exists = arr.includes(value)
        return { ...a, [cur.id]: exists ? arr.filter((v) => v !== value) : [...arr, value] }
      })
    }
  }

  const handleContinue = () => {
    if (!canContinue) return

    if (cur.type === 'text') {
      setAnswers((a) => ({ ...a, name: textVal.trim() }))
      setStep((s) => s + 1)
      return
    }

    if (isLast) {
      const profile = { ...answers, role: 'client', plan: 'builder' }
      setSaving(true)
      try {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile))
        const currentAccount = loadAccount()
        if (currentAccount) {
          const updatedAccount = {
            ...currentAccount,
            name:                answers.name || currentAccount.name,
            onboardingCompleted: true,
            profile,
          }
          saveAccount(updatedAccount)
          saveSession(updatedAccount.email)
        }
      } catch { /* ignore */ }
      setTimeout(() => navigate('/app'), 600)
      return
    }

    setStep((s) => s + 1)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && canContinue) handleContinue()
  }

  const displayName = answers.name || textVal || 'toi'

  if (saving) {
    return (
      <div className="onb-shell onb-shell--saving">
        <div className="onb-saving-card">
          <span className="onb-saving-icon">✨</span>
          <h2 className="onb-saving-title">Ton espace est en cours de création…</h2>
          <p className="onb-saving-sub">AIxoria Life se prépare pour {displayName}.</p>
          <div className="onb-saving-bar"><div className="onb-saving-bar-fill" /></div>
        </div>
      </div>
    )
  }

  return (
    <div className="onb-shell">
      {/* Header */}
      <header className="onb-header">
        <BrandLogo size="md" onClick={() => navigate('/')} />
      </header>

      {/* Card centrale */}
      <div className="onb-center">
        <div className="onb-card">

          {/* Barre de progression */}
          <div className="onb-progress">
            {STEPS.map((s, i) => (
              <span
                key={s.id}
                className={`onb-dot ${i < step ? 'onb-dot--done' : ''} ${i === step ? 'onb-dot--active' : ''}`}
                aria-label={`Étape ${i + 1}${i < step ? ' (complète)' : i === step ? ' (en cours)' : ''}`}
              />
            ))}
          </div>
          <p className="onb-step-label">Étape {step + 1} sur {STEPS.length}</p>

          {/* Contenu de l'étape */}
          <div className="onb-question" key={step}>
            <div className="onb-emoji" aria-hidden="true">{cur.emoji}</div>
            <h2 className="onb-title">{cur.title}</h2>
            {cur.sub && <p className="onb-sub">{cur.sub}</p>}

            {/* Champ texte */}
            {cur.type === 'text' && (
              <div className="onb-text-field">
                <input
                  type="text"
                  className="onb-text-input"
                  placeholder={cur.placeholder}
                  value={textVal}
                  onChange={(e) => setTextVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  maxLength={40}
                  autoComplete="given-name"
                />
              </div>
            )}

            {/* Options choix unique ou multiple */}
            {(cur.type === 'single' || cur.type === 'multi') && (
              <>
                {cur.type === 'multi' && (
                  <p className="onb-multi-hint">Tu peux sélectionner plusieurs réponses.</p>
                )}
                <div className={`onb-options onb-options--cols${cur.cols}`}>
                  {cur.options.map((opt) => {
                    const selected = cur.type === 'single'
                      ? answers[cur.id] === opt.value
                      : answers[cur.id].includes(opt.value)
                    return (
                      <button
                        key={opt.value}
                        className={`onb-option${selected ? ' onb-option--selected' : ''}`}
                        onClick={() => handleSelect(opt.value)}
                        aria-pressed={selected}
                      >
                        {opt.icon && (
                          <span className="onb-opt-icon" aria-hidden="true">{opt.icon}</span>
                        )}
                        <span className="onb-opt-label">{opt.label}</span>
                        {opt.desc && <span className="onb-opt-desc">{opt.desc}</span>}
                        {selected && <span className="onb-opt-check" aria-label="Sélectionné">✓</span>}
                      </button>
                    )
                  })}
                </div>
              </>
            )}

            {/* Résumé du profil */}
            {cur.type === 'summary' && (
              <div className="onb-summary">
                <div className="onb-summary-row">
                  <span className="onb-summary-label">Prénom</span>
                  <div className="onb-summary-badges">
                    <span className="onb-summary-badge">{answers.name || '—'}</span>
                  </div>
                </div>
                <div className="onb-summary-row">
                  <span className="onb-summary-label">Accord des phrases</span>
                  <div className="onb-summary-badges">
                    <span className="onb-summary-badge onb-summary-badge--single">
                      {GENDER_LABELS[answers.gender] || answers.gender || '—'}
                    </span>
                  </div>
                </div>
                <div className="onb-summary-row">
                  <span className="onb-summary-label">Style de motivation</span>
                  <div className="onb-summary-badges">
                    <span className="onb-summary-badge onb-summary-badge--single">
                      {cap(answers.motivationStyle)}
                    </span>
                  </div>
                </div>
                <div className="onb-summary-row">
                  <span className="onb-summary-label">Dimension spirituelle</span>
                  <div className="onb-summary-badges">
                    <span className="onb-summary-badge onb-summary-badge--single">
                      {answers.spiritualPreference === 'bible'
                        ? '📖 Versets bibliques'
                        : answers.spiritualPreference === 'spiritual'
                        ? '🌿 Spiritualité générale'
                        : '🧭 Sans dimension spirituelle'}
                    </span>
                  </div>
                </div>
                {SUMMARY_MULTI.map(({ key, label }) => (
                  answers[key] && answers[key].length > 0 ? (
                    <div key={key} className="onb-summary-row">
                      <span className="onb-summary-label">{label}</span>
                      <div className="onb-summary-badges">
                        {answers[key].map((v) => (
                          <span key={v} className="onb-summary-badge">{v}</span>
                        ))}
                      </div>
                    </div>
                  ) : null
                ))}
              </div>
            )}
          </div>

          {/* Note de confidentialité (étape 1 seulement) */}
          {isFirst && (
            <p className="onb-privacy">
              🔒 Tes réponses restent privées et te permettent de vivre une expérience personnalisée.
            </p>
          )}

          {/* Lien connexion */}
          <p className="onb-login-link">
            J'ai déjà un compte —{' '}
            <Link to="/login" className="onb-login-link-anchor">me connecter</Link>
          </p>

          {/* Navigation */}
          <div className="onb-footer">
            {!isFirst ? (
              <button className="onb-back-btn" onClick={() => setStep((s) => s - 1)}>
                ← Retour
              </button>
            ) : (
              <div />
            )}
            <button
              className={`onb-continue-btn${!canContinue ? ' onb-continue-btn--disabled' : ''}`}
              onClick={handleContinue}
              disabled={!canContinue}
            >
              {isLast
                ? <><span>Créer mon espace</span><IconArrow size={15} /></>
                : <><span>Continuer</span><IconArrow size={15} /></>
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
