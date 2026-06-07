import { useState } from 'react'
import BrandLogo from '../BrandLogo'
import '../../AuthPages.css'

const EyeOpen = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EyeOff = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)

function LoginPage({ onLogin, onGoRegister }) {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim())  { setError('Veuillez saisir votre adresse email.'); return }
    if (!password)      { setError('Veuillez saisir votre mot de passe.'); return }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onLogin(email.trim())
    }, 900)
  }

  return (
    <div className="auth-page">
      <div className="auth-bg" aria-hidden="true">
        <div className="auth-orb auth-orb-1" />
        <div className="auth-orb auth-orb-2" />
        <div className="auth-grid" />
      </div>

      <div className="auth-card fade-in">
        <div className="auth-brand">
          <BrandLogo size="lg" />
        </div>

        <h1 className="auth-title">Connexion</h1>
        <p className="auth-subtitle">Bon retour sur AIxoria Life</p>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="auth-field">
            <label className="auth-label" htmlFor="login-email">Adresse email</label>
            <input
              id="login-email"
              type="email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              autoComplete="email"
            />
          </div>

          <div className="auth-field">
            <label className="auth-label" htmlFor="login-pw">Mot de passe</label>
            <div className="auth-pw-wrapper">
              <input
                id="login-pw"
                type={showPw ? 'text' : 'password'}
                className="auth-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="auth-pw-toggle"
                onClick={() => setShowPw(!showPw)}
                aria-label={showPw ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPw ? <EyeOff /> : <EyeOpen />}
              </button>
            </div>
          </div>

          {error && <div className="auth-error" role="alert">{error}</div>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading
              ? <><span className="auth-spinner" /> Connexion en cours…</>
              : 'Se connecter'
            }
          </button>
        </form>

        <p className="auth-switch">
          Pas encore de compte ?{' '}
          <button className="auth-link" onClick={onGoRegister}>Créer un compte</button>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
