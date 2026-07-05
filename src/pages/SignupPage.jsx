// Authentification temporaire frontend.
// À remplacer par une vraie authentification sécurisée côté serveur avant production.
// Version développement uniquement. Les mots de passe ne doivent jamais être stockés
// en clair en production. À remplacer par Supabase Auth ou Firebase Auth avant lancement.

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo'
import { IconArrow } from '../components/icons'
import { loadAccount, saveAccount } from '../auth'

function validate(name, email, password, confirm) {
  const e = {}
  if (!name.trim())                      e.name     = "Prénom obligatoire."
  if (!email.trim())                     e.email    = "Email obligatoire."
  else if (!/\S+@\S+\.\S+/.test(email)) e.email    = "Email invalide."
  if (!password)                         e.password = "Mot de passe obligatoire."
  else if (password.length < 6)         e.password = "Minimum 6 caractères."
  if (password !== confirm)             e.confirm  = "Les mots de passe ne correspondent pas."
  return e
}

export default function SignupPage() {
  const navigate = useNavigate()
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm]   = useState('')
  const [errors, setErrors]     = useState({})
  const [loading, setLoading]   = useState(false)
  const [globalError, setGlobalError] = useState('')

  const clearField = (key) => setErrors((prev) => ({ ...prev, [key]: '' }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setGlobalError('')
    const errs = validate(name, email, password, confirm)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})

    const existingAccount = loadAccount()
    if (existingAccount && existingAccount.email === email.trim().toLowerCase()) {
      setGlobalError("Un compte existe déjà avec cet email. Connecte-toi.")
      return
    }

    setLoading(true)

    const account = {
      id:                  Date.now(),
      name:                name.trim(),
      email:               email.trim().toLowerCase(),
      password,
      role:                'client',
      plan:                'builder',
      createdAt:           new Date().toISOString(),
      onboardingCompleted: false,
      profile:             null,
    }
    saveAccount(account)

    setTimeout(() => navigate('/onboarding'), 400)
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">
          <BrandLogo size="lg" onClick={() => navigate('/')} />
        </div>

        <h1 className="login-title">Créer mon compte</h1>
        <p className="login-sub">Rejoins AIxoria Life et commence ton parcours.</p>

        <form className="login-form" onSubmit={handleSubmit} noValidate>

          {globalError && (
            <div className="login-error" role="alert">
              <span aria-hidden="true">⚠</span>
              <span>{globalError}</span>
            </div>
          )}

          <div className="login-field">
            <label className="login-label" htmlFor="su-name">Prénom</label>
            <input
              id="su-name"
              type="text"
              className={`login-input${errors.name ? ' login-input--error' : ''}`}
              placeholder="Ex : Maëlle"
              value={name}
              onChange={(e) => { setName(e.target.value); clearField('name') }}
              autoFocus
              maxLength={40}
              autoComplete="given-name"
            />
            {errors.name && <span className="login-field-error">{errors.name}</span>}
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="su-email">Email</label>
            <input
              id="su-email"
              type="email"
              className={`login-input${errors.email ? ' login-input--error' : ''}`}
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearField('email') }}
              autoComplete="email"
            />
            {errors.email && <span className="login-field-error">{errors.email}</span>}
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="su-password">Mot de passe</label>
            <input
              id="su-password"
              type="password"
              className={`login-input${errors.password ? ' login-input--error' : ''}`}
              placeholder="••••••••"
              value={password}
              onChange={(e) => { setPassword(e.target.value); clearField('password') }}
              autoComplete="new-password"
            />
            {errors.password && <span className="login-field-error">{errors.password}</span>}
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="su-confirm">Confirmer le mot de passe</label>
            <input
              id="su-confirm"
              type="password"
              className={`login-input${errors.confirm ? ' login-input--error' : ''}`}
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => { setConfirm(e.target.value); clearField('confirm') }}
              autoComplete="new-password"
            />
            {errors.confirm && <span className="login-field-error">{errors.confirm}</span>}
          </div>

          <button
            type="submit"
            className={`login-btn${loading ? ' login-btn--loading' : ''}`}
            disabled={loading}
          >
            {loading
              ? <span>Création…</span>
              : <><span>Créer mon compte</span><IconArrow size={15} /></>
            }
          </button>
        </form>

        <div className="login-divider">
          <span className="login-divider-line" />
          <span className="login-divider-text">J'ai déjà un compte</span>
          <span className="login-divider-line" />
        </div>

        <button
          className="login-register-btn"
          type="button"
          onClick={() => navigate('/login')}
        >
          Me connecter
        </button>

        <div className="login-dev-notice">
          <div className="login-dev-notice-label">🔒 Note développement</div>
          <p className="login-dev-notice-text">
            Version développement uniquement. Les mots de passe ne doivent jamais être stockés en clair en production. À remplacer par Supabase Auth ou Firebase Auth avant lancement.
          </p>
        </div>

      </div>
    </div>
  )
}
