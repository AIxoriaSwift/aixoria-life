import { useState } from 'react'
import BrandLogo from '../BrandLogo'
import '../../AuthPages.css'

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    badge: '🌱',
    color: '#60a5fa',
    price: 'Gratuit',
    modules: ['AI Discipline', 'AI Planner'],
    desc: 'Discipline & organisation du quotidien',
    available: true,
  },
  {
    id: 'builder',
    name: 'Builder',
    badge: '🔨',
    color: '#fbbf24',
    price: '19€/mois',
    modules: ['AI Discipline', 'AI Planner', 'AI Business Builder', 'AI Finance'],
    desc: 'Lancer son activité & gérer son argent',
    available: true,
    popular: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    badge: '⚡',
    color: '#a78bfa',
    price: '39€/mois',
    modules: ['Tous les 8 modules'],
    desc: '+ AI Content, Confidence, Future Me, Life Pulse',
    available: true,
  },
]

const EyeOpen = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
)
const EyeOff = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)

function RegisterPage({ onRegister, onGoLogin }) {
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [plan, setPlan]         = useState('starter')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim())        { setError('Veuillez saisir votre prénom.'); return }
    if (!email.trim())       { setError('Veuillez saisir votre adresse email.'); return }
    if (password.length < 6) { setError('Le mot de passe doit contenir au moins 6 caractères.'); return }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onRegister({ name: name.trim(), email: email.trim(), plan })
    }, 1100)
  }

  return (
    <div className="auth-page">
      <div className="auth-bg" aria-hidden="true">
        <div className="auth-orb auth-orb-1" />
        <div className="auth-orb auth-orb-2" />
        <div className="auth-grid" />
      </div>

      <div className="auth-card auth-card--wide fade-in">
        <div className="auth-brand">
          <BrandLogo size="lg" />
        </div>

        <h1 className="auth-title">Créer mon compte</h1>
        <p className="auth-subtitle">Rejoins AIxoria Life et reprends le contrôle de ta vie</p>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="auth-fields-row">
            <div className="auth-field">
              <label className="auth-label" htmlFor="reg-name">Prénom</label>
              <input
                id="reg-name" type="text" className="auth-input"
                value={name} onChange={(e) => setName(e.target.value)}
                placeholder="Votre prénom" autoComplete="given-name"
              />
            </div>
            <div className="auth-field">
              <label className="auth-label" htmlFor="reg-email">Adresse email</label>
              <input
                id="reg-email" type="email" className="auth-input"
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com" autoComplete="email"
              />
            </div>
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="reg-pw">Mot de passe</label>
            <div className="auth-pw-wrapper">
              <input
                id="reg-pw" type={showPw ? 'text' : 'password'} className="auth-input"
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 caractères" autoComplete="new-password"
              />
              <button type="button" className="auth-pw-toggle" onClick={() => setShowPw(!showPw)}
                aria-label={showPw ? 'Masquer' : 'Afficher'}>
                {showPw ? <EyeOff /> : <EyeOpen />}
              </button>
            </div>
          </div>

          <div className="auth-plans">
            <span className="auth-label">Choisir mon plan</span>
            <div className="auth-plan-grid-new">
              {PLANS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className={['auth-plan-card-new', plan === p.id ? 'selected' : '', p.popular ? 'popular' : ''].join(' ')}
                  onClick={() => setPlan(p.id)}
                  style={{ '--pc': p.color }}
                >
                  {p.popular && <span className="auth-plan-popular-tag">Le plus choisi</span>}
                  <div className="apn-top">
                    <span className="apn-badge">{p.badge}</span>
                    <span className="apn-name">{p.name}</span>
                    <span className="apn-price">{p.price}</span>
                  </div>
                  <p className="apn-desc">{p.desc}</p>
                  <ul className="apn-modules">
                    {p.modules.map((m) => (
                      <li key={m}>✓ {m}</li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
          </div>

          {error && <div className="auth-error" role="alert">{error}</div>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading
              ? <><span className="auth-spinner" /> Création du compte…</>
              : 'Créer mon compte'
            }
          </button>
        </form>

        <p className="auth-switch">
          Déjà un compte ?{' '}
          <button className="auth-link" onClick={onGoLogin}>Se connecter</button>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
