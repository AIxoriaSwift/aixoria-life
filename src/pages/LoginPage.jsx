// Authentification temporaire frontend.
// À remplacer par une vraie authentification sécurisée côté serveur avant production.

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo'
import { IconArrow } from '../components/icons'
import { loadAccount, saveSession } from '../auth'

export default function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email.trim() || !password) return
    setError('')
    setLoading(true)

    setTimeout(() => {
      const account = loadAccount()
      const normalizedEmail = email.trim().toLowerCase()

      if (account && account.email === normalizedEmail && account.password === password) {
        saveSession(account.email)
        if (account.onboardingCompleted) {
          navigate('/app')
        } else {
          navigate('/onboarding')
        }
        return
      }

      setError('Email ou mot de passe incorrect.')
      setLoading(false)
    }, 400)
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">
          <BrandLogo size="lg" onClick={() => navigate('/')} />
        </div>

        <h1 className="login-title">Connexion</h1>
        <p className="login-sub">Accédez à votre espace AIxoria Life.</p>

        <form className="login-form" onSubmit={handleSubmit} noValidate>

          {error && (
            <div className="login-error" role="alert">
              <span aria-hidden="true">⚠</span>
              <span>{error}</span>
            </div>
          )}

          <div className="login-field">
            <label className="login-label" htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              className="login-input"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError('') }}
              autoFocus
              required
              autoComplete="email"
            />
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="login-password">Mot de passe</label>
            <input
              id="login-password"
              type="password"
              className="login-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className={`login-btn${loading ? ' login-btn--loading' : ''}`}
            disabled={loading}
          >
            {loading
              ? <span>Connexion…</span>
              : <><span>Se connecter</span><IconArrow size={15} /></>
            }
          </button>
        </form>

        <div className="login-divider">
          <span className="login-divider-line" />
          <span className="login-divider-text">Pas encore de compte ?</span>
          <span className="login-divider-line" />
        </div>

        <button
          className="login-register-btn"
          type="button"
          onClick={() => navigate('/signup')}
        >
          Créer mon compte AIxoria Life
        </button>

        <div className="login-dev-notice">
          <div className="login-dev-notice-label">🧪 Mode développement</div>
          <p className="login-dev-notice-text">
            Authentification temporaire frontend. À remplacer par une authentification sécurisée côté serveur avant production.
          </p>
        </div>

      </div>
    </div>
  )
}
