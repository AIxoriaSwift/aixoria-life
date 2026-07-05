import BrandLogo from './BrandLogo'

/* ── SVG icons professionnels ── */
const IcHome = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)
const IcConfidence = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)
const IcDiscipline = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)
const IcOrganisation = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)
const IcBusiness = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
)
const IcFutureMe = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)
const IcLifePulse = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
)
const IcContent = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
)
const IcFinance = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
)
const IcSettings = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)
const IcMyProject = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
)
const IcPhrasesReperes = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
  </svg>
)
const IcLock = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)
const IcLogout = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

const ICONS = {
  home:               <IcHome />,
  confidence:         <IcConfidence />,
  discipline:         <IcDiscipline />,
  organisation:       <IcOrganisation />,
  business:           <IcBusiness />,
  'future-me':        <IcFutureMe />,
  'life-pulse':       <IcLifePulse />,
  'phrases-reperes':  <IcPhrasesReperes />,
  content:            <IcContent />,
  finance:            <IcFinance />,
  settings:           <IcSettings />,
  'my-project':       <IcMyProject />,
}

/* ── Navigation items ── */
const NAV_ITEMS = [
  { type: 'item',  id: null,           label: "Aujourd'hui",     icon: 'home' },
  { type: 'item',  id: 'my-project',   label: 'Mon cap',         icon: 'my-project' },
  { type: 'label', label: 'Modules' },
  { type: 'item',  id: 'confidence',   label: 'Confiance',       icon: 'confidence'   },
  { type: 'item',  id: 'discipline',   label: 'Discipline',      icon: 'discipline'   },
  { type: 'item',  id: 'planner',      label: 'Organisation',    icon: 'organisation' },
  { type: 'item',  id: 'business',     label: 'Business Builder',icon: 'business'     },
  { type: 'item',  id: 'future-me',    label: 'Future Me',       icon: 'future-me'    },
  { type: 'item',  id: 'life-pulse',      label: 'Life Pulse',           icon: 'life-pulse'      },
  { type: 'item',  id: 'phrases-reperes', label: 'Mes phrases repères',  icon: 'phrases-reperes' },
  { type: 'item',  id: 'content',         label: 'Contenu',              icon: 'content'         },
  { type: 'item',  id: 'finance',      label: 'Finance',         icon: 'finance'      },
  { type: 'label', label: 'Compte' },
  { type: 'item',  id: 'settings',     label: 'Paramètres',      icon: 'settings'     },
]

function Sidebar({ user, planConfig, activeModule, onNavigate, onLogout, isOpen }) {
  const isLocked = (modId) => {
    if (modId === null || modId === 'settings' || modId === 'my-project' || modId === 'phrases-reperes') return false
    if (!user) return true
    if (user.role === 'admin') return false
    return !planConfig.modules.includes(modId)
  }

  const initials = user?.name ? user.name.slice(0, 2).toUpperCase() : '?'

  return (
    <aside className={`sidebar${isOpen ? ' sidebar--open' : ''}`} role="navigation" aria-label="Navigation principale">
      <div className="sidebar-logo">
        <BrandLogo onClick={() => onNavigate(null)} />
      </div>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item, i) => {
          if (item.type === 'label') {
            return <span key={`lbl-${i}`} className="sidebar-nav-label">{item.label}</span>
          }

          const locked   = isLocked(item.id)
          const isActive = activeModule === item.id

          return (
            <button
              key={item.id ?? '__home__'}
              className={[
                'sidebar-nav-item',
                isActive ? 'active' : '',
                locked  ? 'locked' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => { if (!locked) onNavigate(item.id) }}
              title={locked ? `${item.label} — plan supérieur requis` : undefined}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="sidebar-nav-icon">
                {ICONS[item.icon] || <IcHome />}
              </span>
              <span className="sidebar-nav-name">{item.label}</span>
              {locked && (
                <span className="sidebar-nav-lock" aria-label="Verrouillé">
                  <IcLock />
                </span>
              )}
            </button>
          )
        })}
      </nav>

      <div className="sidebar-plan">
        <div className="sidebar-plan-label">Mon plan</div>
        <div className="sidebar-plan-row">
          <div className="sidebar-plan-name">
            <span className={`sidebar-plan-tier sidebar-plan-tier--${user?.plan}`}>{planConfig?.badge}</span>
            {planConfig?.name}
          </div>
          {planConfig?.name !== 'Pro' && (
            <button className="sidebar-plan-upgrade">Changer →</button>
          )}
        </div>
      </div>

      <div className="sidebar-user">
        <div className="sidebar-user-avatar">{initials}</div>
        <div className="sidebar-user-info">
          <div className="sidebar-user-name">{user?.name}</div>
          <div className="sidebar-user-role">Plan {planConfig?.name}</div>
        </div>
        <button className="sidebar-logout" onClick={onLogout} aria-label="Se déconnecter">
          <IcLogout />
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
