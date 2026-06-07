/*
 * CONNEXION TEMPORAIRE FRONTEND — À remplacer avant production.
 * Cette authentification est une protection de maquette uniquement.
 * Avant mise en ligne : remplacer par une vraie authentification sécurisée côté serveur
 * (JWT, sessions serveur, OAuth, etc.) avec vérification en base de données.
 * Les accès clients devront être liés à une base de données et à Stripe.
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BrandLogo from '../components/BrandLogo'
import PlanBadge from '../components/PlanBadge'
import { MODULES, PLAN_CONFIG, ADMIN_EMAIL } from '../data'

/* ── Identifiants temporaires — REMPLACER avant production ── */
const TEMP_EMAIL    = 'contact@aixoriaswift.pro'
const TEMP_PASSWORD = 'AIXORIA2026'

/* ── Stats vides — alimentées par le backend après connexion ── */
const EMPTY_STATS = [
  { label: "Clients inscrits",   value: "0",       sub: "Aucun utilisateur inscrit",   icon: "👥", color: "#60a5fa" },
  { label: "Abonnements actifs", value: "0",       sub: "En attente de Stripe",         icon: "💳", color: "#34d399" },
  { label: "MRR estimé",        value: "0 CHF",   sub: "Revenus mensuels récurrents",  icon: "💰", color: "#a78bfa" },
  { label: "Taux d'utilisation", value: "0 %",    sub: "Aucune session enregistrée",   icon: "📊", color: "#f472b6" },
  { label: "Paiements reçus",   value: "0 CHF",   sub: "En attente de Stripe",         icon: "🏦", color: "#fbbf24" },
]

/* ── Roadmap technique ── */
const ROADMAP_ITEMS = [
  { icon: "🔐", label: "Authentification utilisateurs",  note: "Firebase / Supabase / Auth0" },
  { icon: "🗄️", label: "Base de données",               note: "PostgreSQL / Supabase DB" },
  { icon: "💳", label: "Stripe abonnements",             note: "Plans Starter · Builder · Pro" },
  { icon: "🔑", label: "Gestion des rôles",              note: "Permissions par plan" },
  { icon: "🤖", label: "Connexion IA par module",        note: "API Claude / OpenAI" },
  { icon: "📧", label: "Emails transactionnels",         note: "Resend / SendGrid" },
]

/* ── Rôles & accès ── */
const ROLES = [
  {
    id: 'admin',
    name: 'Administrateur',
    badge: '🛡️',
    color: '#fbbf24',
    description: "Accès complet à toute la plateforme, à la gestion des utilisateurs et à la configuration des modules.",
    accessLabel: "Accès illimité — tous les modules + panel admin",
    moduleIds: MODULES.map((m) => m.id),
  },
  {
    id: 'starter',
    name: 'Client Starter',
    badge: '🌱',
    color: '#60a5fa',
    description: "Accès aux modules fondamentaux pour démarrer sa discipline quotidienne et son organisation.",
    moduleIds: MODULES.filter((m) => m.planRequired === 'starter').map((m) => m.id),
  },
  {
    id: 'builder',
    name: 'Client Builder',
    badge: '🔨',
    color: '#fbbf24',
    description: "Accès étendu pour construire son activité, développer sa vision et créer son contenu.",
    moduleIds: MODULES.filter((m) => ['starter', 'builder'].includes(m.planRequired)).map((m) => m.id),
  },
  {
    id: 'pro',
    name: 'Client Pro',
    badge: '⚡',
    color: '#a78bfa',
    description: "Accès complet à tous les modules, y compris Finance, Confidence et les fonctionnalités premium à venir.",
    moduleIds: MODULES.map((m) => m.id),
  },
]

/* ══════════════════════════════════════════
   ADMIN LOGIN
   ══════════════════════════════════════════ */
function AdminLogin({ onSuccess }) {
  const navigate = useNavigate()
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [error, setError]         = useState('')
  const [shaking, setShaking]     = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (email.trim() === TEMP_EMAIL && password === TEMP_PASSWORD) {
      onSuccess()
    } else {
      const msg = email.trim() !== TEMP_EMAIL
        ? "Email incorrect."
        : "Mot de passe incorrect."
      setError(msg)
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    }
  }

  return (
    <div className="admin-login-page">
      <div className={`admin-login-card${shaking ? ' aal-shake' : ''}`}>
        <div className="aal-brand"><BrandLogo size="lg" /></div>

        <div className="aal-header">
          <div className="aal-shield">🛡️</div>
          <h1 className="aal-title">Accès administrateur</h1>
          <p className="aal-sub">Espace réservé à l'administration AIxoria Life</p>
        </div>

        <form className="aal-form" onSubmit={handleSubmit} noValidate>
          <div className="aal-field">
            <label className="aal-label" htmlFor="adm-email">Adresse email</label>
            <input
              id="adm-email"
              type="email"
              className={`aal-input${error ? ' aal-input--error' : ''}`}
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError('') }}
              placeholder="admin@exemple.com"
              autoComplete="email"
              autoFocus
            />
          </div>
          <div className="aal-field">
            <label className="aal-label" htmlFor="adm-password">Mot de passe</label>
            <input
              id="adm-password"
              type="password"
              className={`aal-input${error ? ' aal-input--error' : ''}`}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </div>
          {error && <p className="aal-error">{error}</p>}
          <button type="submit" className="aal-btn">Se connecter</button>
        </form>

        <p className="aal-security-note">
          🔒 Authentification sécurisée à connecter avant mise en production
        </p>
        <button className="aal-back" onClick={() => navigate('/')}>← Retour au site</button>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   ADMIN SIDEBAR
   ══════════════════════════════════════════ */
const ADMIN_NAV = [
  { id: 'overview',  label: "Vue d'ensemble", icon: "▦" },
  { id: 'users',     label: "Utilisateurs",   icon: "👥" },
  { id: 'plans',     label: "Abonnements",    icon: "📦" },
  { id: 'plan-cfg',  label: "Plans",          icon: "🏷️" },
  { id: 'modules',   label: "Modules",        icon: "⚡" },
  { id: 'access',    label: "Accès & rôles",  icon: "🔑" },
  { id: 'payments',  label: "Paiements",      icon: "💳" },
  { id: 'settings',  label: "Paramètres",     icon: "⚙️" },
]

function AdminSidebar({ section, onSection, onLogout, navigate }) {
  return (
    <aside className="sidebar adm-sidebar">
      <div className="sidebar-logo">
        <BrandLogo onClick={() => navigate('/')} />
      </div>

      <div className="adm-sidebar-identity">
        <div className="adm-identity-avatar">🛡️</div>
        <div>
          <div className="adm-identity-name">Administrateur</div>
          <div className="adm-identity-email">{ADMIN_EMAIL}</div>
        </div>
      </div>

      <nav className="sidebar-nav" aria-label="Navigation admin">
        <span className="sidebar-nav-label">Administration</span>
        {ADMIN_NAV.map((item) => (
          <button
            key={item.id}
            className={`adm-nav-item${section === item.id ? ' adm-nav-item--active' : ''}`}
            onClick={() => onSection(item.id)}
          >
            <span className="adm-nav-icon">{item.icon}</span>
            <span className="adm-nav-label-text">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="adm-sidebar-footer">
        <span className="sidebar-nav-label" style={{ padding: '8px 8px 4px', display: 'block' }}>Navigation</span>
        <button className="adm-footer-item" onClick={() => navigate('/app')}>
          <span>👤</span>
          <span>Retour espace client</span>
        </button>
        <button className="adm-footer-item" onClick={() => navigate('/')}>
          <span>🌐</span>
          <span>Retour site public</span>
        </button>
        <button className="adm-footer-item adm-footer-item--logout" onClick={onLogout}>
          <span>↩</span>
          <span>Se déconnecter</span>
        </button>
      </div>
    </aside>
  )
}

/* ══════════════════════════════════════════
   SHARED: Backend pending badge + note
   ══════════════════════════════════════════ */
function BackendPendingBanner() {
  return (
    <div className="adm-backend-banner">
      <span className="adm-backend-dot" />
      <div>
        <strong>En attente de connexion backend</strong>
        <p>Les données réelles apparaîtront ici après connexion de l'authentification, de la base de données et de Stripe.</p>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   SECTION: Vue d'ensemble
   ══════════════════════════════════════════ */
function OverviewSection() {
  return (
    <div className="adm-section fade-in-up">
      <div className="adm-section-header">
        <div>
          <h1 className="adm-section-title">Vue d'ensemble</h1>
          <p className="adm-section-sub">Tableau de bord de la plateforme AIxoria Life</p>
        </div>
        <span className="adm-env-badge">⚙️ Environnement de développement</span>
      </div>

      <BackendPendingBanner />

      <div className="admin-stats-grid">
        {EMPTY_STATS.map((s) => (
          <div key={s.label} className="admin-stat-card adm-stat-empty" style={{ '--sc': s.color }}>
            <div className="asc-top">
              <span className="asc-icon">{s.icon}</span>
              <span className="asc-value asc-value--zero">{s.value}</span>
            </div>
            <div className="asc-label">{s.label}</div>
            <div className="asc-sub asc-sub--pending">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="adm-roadmap-card">
        <div className="adm-roadmap-header">
          <h3 className="adm-roadmap-title">🚀 Prochaines connexions techniques</h3>
          <p className="adm-roadmap-sub">Ces intégrations activeront les données réelles dans ce tableau de bord.</p>
        </div>
        <div className="adm-roadmap-grid">
          {ROADMAP_ITEMS.map((item) => (
            <div key={item.label} className="adm-roadmap-item">
              <span className="adm-roadmap-icon">{item.icon}</span>
              <div>
                <div className="adm-roadmap-label">{item.label}</div>
                <div className="adm-roadmap-note">{item.note}</div>
              </div>
              <span className="adm-roadmap-status">À connecter</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   SECTION: Utilisateurs (vide)
   ══════════════════════════════════════════ */
function UsersSection() {
  return (
    <div className="adm-section fade-in-up">
      <div className="adm-section-header">
        <div>
          <h1 className="adm-section-title">Utilisateurs</h1>
          <p className="adm-section-sub">Gestion des comptes utilisateurs inscrits</p>
        </div>
        <button className="adm-action-btn">+ Ajouter un utilisateur</button>
      </div>

      <BackendPendingBanner />

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr className="adm-table-head">
              <th>Nom d'utilisateur</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Plan</th>
              <th>Statut</th>
              <th>Dernière connexion</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={7}>
                <div className="adm-empty-state">
                  <span className="adm-empty-icon">👥</span>
                  <h3 className="adm-empty-title">Aucun utilisateur inscrit pour le moment</h3>
                  <p className="adm-empty-sub">
                    Les utilisateurs apparaîtront ici une fois l'authentification connectée.
                  </p>
                  <button className="adm-action-btn">+ Ajouter un utilisateur</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   SECTION: Abonnements (Stripe pending)
   ══════════════════════════════════════════ */
function SubscriptionsSection() {
  return (
    <div className="adm-section fade-in-up">
      <div className="adm-section-header">
        <div>
          <h1 className="adm-section-title">Abonnements</h1>
          <p className="adm-section-sub">Suivi des abonnements actifs et des revenus Stripe</p>
        </div>
      </div>

      <BackendPendingBanner />

      <div className="adm-stripe-status-card">
        <div className="adm-stripe-icon">💳</div>
        <div>
          <h3 className="adm-stripe-title">Stripe non connecté</h3>
          <p className="adm-stripe-sub">
            Les abonnements, paiements et revenus récurrents s'afficheront ici après la connexion de Stripe.<br />
            Plans configurés : Starter (Gratuit) · Builder (19 CHF/mois) · Pro (39 CHF/mois)
          </p>
        </div>
        <button className="adm-stripe-btn">Configurer Stripe</button>
      </div>

      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr className="adm-table-head">
              <th>Utilisateur</th>
              <th>Plan</th>
              <th>Statut</th>
              <th>Montant</th>
              <th>Prochaine facturation</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6}>
                <div className="adm-empty-state">
                  <span className="adm-empty-icon">💳</span>
                  <h3 className="adm-empty-title">Aucun abonnement actif</h3>
                  <p className="adm-empty-sub">Les abonnements Stripe apparaîtront ici après connexion.</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   SECTION: Plans
   ══════════════════════════════════════════ */
function PlansSection() {
  return (
    <div className="adm-section fade-in-up">
      <div className="adm-section-header">
        <div>
          <h1 className="adm-section-title">Plans</h1>
          <p className="adm-section-sub">Configuration des plans et des modules inclus</p>
        </div>
      </div>

      <div className="adm-stripe-inline-note">
        <span>💳</span>
        <span>Les tarifs seront gérés via Stripe après connexion. Configuration actuelle : maquette uniquement.</span>
      </div>

      <div className="adm-plans-grid">
        {Object.entries(PLAN_CONFIG).map(([key, plan]) => {
          const lockedMods = MODULES.filter((m) => !plan.modules.includes(m.id))
          return (
            <div key={key} className="adm-plan-card" style={{ '--pc': plan.color }}>
              <div className="adm-plan-card-top">
                <div className="adm-plan-badge-row">
                  <span className="adm-plan-icon">{plan.badge}</span>
                  <h3 className="adm-plan-name" style={{ color: plan.color }}>{plan.name}</h3>
                </div>
                <div className="adm-plan-price-row">
                  <span className="adm-plan-price">{plan.price}</span>
                  <span className="adm-stripe-badge">Non connecté à Stripe</span>
                </div>
              </div>

              <div className="adm-plan-modules-list">
                <div className="adm-plan-modules-label">Modules inclus ({plan.modules.length})</div>
                {plan.modules.map((mId) => {
                  const m = MODULES.find((x) => x.id === mId)
                  return (
                    <div key={mId} className="adm-plan-mod-row adm-plan-mod-row--on">
                      <span>{m?.icon}</span>
                      <span>{m?.name}</span>
                      <span className="adm-plan-mod-check">✓</span>
                    </div>
                  )
                })}
                {lockedMods.length > 0 && (
                  <>
                    <div className="adm-plan-modules-label" style={{ marginTop: '10px' }}>Non inclus</div>
                    {lockedMods.map((m) => (
                      <div key={m.id} className="adm-plan-mod-row adm-plan-mod-row--off">
                        <span>🔒</span>
                        <span>{m.name}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>

              <button className="adm-plan-edit-btn" style={{ '--pc': plan.color }}>
                Configurer le plan {plan.name}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   SECTION: Modules
   ══════════════════════════════════════════ */
function ModulesSection() {
  const statusColors = { 'actif': '#34d399', 'en développement': '#fbbf24' }
  const statusLabels = { 'actif': 'Actif', 'en développement': 'En développement' }
  return (
    <div className="adm-section fade-in-up">
      <div className="adm-section-header">
        <div>
          <h1 className="adm-section-title">Modules</h1>
          <p className="adm-section-sub">{MODULES.length} modules sur la plateforme</p>
        </div>
      </div>

      <div className="adm-modules-grid">
        {MODULES.map((m) => (
          <div key={m.id} className="adm-module-card" style={{ '--mc': m.color }}>
            <div className="adm-mod-top">
              <span className="adm-mod-icon">{m.icon}</span>
              <span className="adm-mod-status-badge" style={{ color: statusColors[m.adminStatus] || '#94a3b8' }}>
                ● {statusLabels[m.adminStatus] || m.adminStatus}
              </span>
            </div>
            <h3 className="adm-mod-name">{m.name}</h3>
            <p className="adm-mod-desc">{m.description}</p>
            <div className="adm-mod-meta">
              <PlanBadge plan={m.planRequired} />
              <span className="adm-mod-features-count">{m.features.length} fonctionnalités</span>
            </div>
            <div className="adm-mod-actions">
              <button className="adm-mod-btn">Configurer</button>
              <button className="adm-mod-btn adm-mod-btn--secondary">Voir côté client</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   SECTION: Accès & rôles
   ══════════════════════════════════════════ */
function AccessSection() {
  return (
    <div className="adm-section fade-in-up">
      <div className="adm-section-header">
        <div>
          <h1 className="adm-section-title">Accès & rôles</h1>
          <p className="adm-section-sub">Gestion des permissions par rôle et par plan</p>
        </div>
      </div>

      <div className="adm-roles-grid">
        {ROLES.map((role) => {
          const mods = role.moduleIds === 'all'
            ? MODULES
            : MODULES.filter((m) => role.moduleIds.includes(m.id))
          return (
            <div key={role.id} className="adm-role-card" style={{ '--rc2': role.color }}>
              <div className="adm-role-top">
                <span className="adm-role-badge-icon">{role.badge}</span>
                <div>
                  <h3 className="adm-role-name" style={{ color: role.color }}>{role.name}</h3>
                  <span className="adm-role-count">{mods.length} module{mods.length > 1 ? 's' : ''}</span>
                </div>
              </div>
              <p className="adm-role-desc">{role.description}</p>
              <div className="adm-role-modules">
                {mods.slice(0, 4).map((m) => (
                  <span key={m.id} className="adm-role-mod-pill">
                    {m.icon} {m.name}
                  </span>
                ))}
                {mods.length > 4 && (
                  <span className="adm-role-mod-pill adm-role-mod-pill--more">
                    +{mods.length - 4} autres
                  </span>
                )}
              </div>
              <button className="adm-role-btn" style={{ '--rc2': role.color }}>
                Configurer
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   SECTION: Paiements (Stripe pending)
   ══════════════════════════════════════════ */
function PaymentsSection() {
  return (
    <div className="adm-section fade-in-up">
      <div className="adm-section-header">
        <div>
          <h1 className="adm-section-title">Paiements</h1>
          <p className="adm-section-sub">Historique des paiements et revenus Stripe</p>
        </div>
      </div>
      <BackendPendingBanner />
      <div className="adm-placeholder">
        <span className="adm-placeholder-icon">💳</span>
        <h3>Stripe non connecté</h3>
        <p>L'historique des paiements, les factures et les revenus récurrents s'afficheront ici après intégration de Stripe.</p>
        <span className="coming-soon-badge">🚧 Connexion Stripe à venir</span>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   SECTION: Paramètres
   ══════════════════════════════════════════ */
function SettingsSection() {
  return (
    <div className="adm-section fade-in-up">
      <div className="adm-section-header">
        <div>
          <h1 className="adm-section-title">Paramètres</h1>
          <p className="adm-section-sub">Configuration de la plateforme AIxoria Life</p>
        </div>
      </div>

      <div className="adm-settings-grid">
        <div className="adm-settings-card">
          <h3 className="adm-settings-card-title">🔐 Authentification</h3>
          <p className="adm-settings-card-desc">Connexion des utilisateurs, sessions, JWT, OAuth.</p>
          <span className="adm-settings-badge adm-settings-badge--pending">En attente</span>
        </div>
        <div className="adm-settings-card">
          <h3 className="adm-settings-card-title">🗄️ Base de données</h3>
          <p className="adm-settings-card-desc">Stockage des utilisateurs, modules, abonnements.</p>
          <span className="adm-settings-badge adm-settings-badge--pending">En attente</span>
        </div>
        <div className="adm-settings-card">
          <h3 className="adm-settings-card-title">💳 Stripe</h3>
          <p className="adm-settings-card-desc">Gestion des abonnements et paiements récurrents.</p>
          <span className="adm-settings-badge adm-settings-badge--pending">En attente</span>
        </div>
        <div className="adm-settings-card">
          <h3 className="adm-settings-card-title">📧 Emails</h3>
          <p className="adm-settings-card-desc">Emails de bienvenue, facturation, notifications.</p>
          <span className="adm-settings-badge adm-settings-badge--pending">En attente</span>
        </div>
        <div className="adm-settings-card">
          <h3 className="adm-settings-card-title">🤖 API IA</h3>
          <p className="adm-settings-card-desc">Connexion Claude / OpenAI pour les réponses IA par module.</p>
          <span className="adm-settings-badge adm-settings-badge--pending">En attente</span>
        </div>
        <div className="adm-settings-card">
          <h3 className="adm-settings-card-title">🌐 Domaine</h3>
          <p className="adm-settings-card-desc">Configuration du domaine, HTTPS, CORS.</p>
          <span className="adm-settings-badge adm-settings-badge--pending">En attente</span>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   ADMIN DASHBOARD — page principale
   ══════════════════════════════════════════ */
export default function AdminDashboard() {
  const navigate = useNavigate()
  const [authenticated, setAuthenticated] = useState(false)
  const [section, setSection]             = useState('overview')
  const [sidebarOpen, setSidebarOpen]     = useState(false)

  if (!authenticated) {
    return <AdminLogin onSuccess={() => setAuthenticated(true)} />
  }

  const renderSection = () => {
    switch (section) {
      case 'overview':  return <OverviewSection />
      case 'users':     return <UsersSection />
      case 'plans':     return <SubscriptionsSection />
      case 'plan-cfg':  return <PlansSection />
      case 'modules':   return <ModulesSection />
      case 'access':    return <AccessSection />
      case 'payments':  return <PaymentsSection />
      case 'settings':  return <SettingsSection />
      default:          return <OverviewSection />
    }
  }

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}

      <AdminSidebar
        section={section}
        onSection={(s) => { setSection(s); setSidebarOpen(false) }}
        onLogout={() => setAuthenticated(false)}
        navigate={navigate}
      />

      <main className="main-area adm-main-area">
        <div className="mobile-topbar">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)} aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <BrandLogo size="sm" />
          <span className="admin-topbar-badge">🛡️ Admin</span>
        </div>

        <div className="main-content">
          <div className="dev-nav-bar">
            <span className="dev-nav-label">Dev :</span>
            <button className="dev-nav-link" onClick={() => navigate('/')}>Landing</button>
            <button className="dev-nav-link" onClick={() => navigate('/app')}>Client</button>
          </div>
          {renderSection()}
        </div>
      </main>
    </div>
  )
}
