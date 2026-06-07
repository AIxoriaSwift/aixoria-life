import BrandLogo from './BrandLogo'

/* ── SVG icons ── */
const IconHome = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const IconLock = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

const IconLogout = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

/* ── Navigation items ── */
const NAV_ITEMS = [
  { type: 'item',  id: null,         label: 'Dashboard',       icon: null },
  { type: 'label', label: 'Modules' },
  { type: 'item',  id: 'life-pulse', label: 'Life Pulse',      icon: '💫' },
  { type: 'item',  id: 'discipline', label: 'AI Discipline',   icon: '🧠' },
  { type: 'item',  id: 'planner',    label: 'AI Planner',      icon: '📅' },
  { type: 'item',  id: 'future-me',  label: 'Future Me',       icon: '🌟' },
  { type: 'item',  id: 'business',   label: 'Business Builder',icon: '🚀' },
  { type: 'item',  id: 'content',    label: 'AI Content',      icon: '✨' },
  { type: 'item',  id: 'finance',    label: 'AI Finance',      icon: '💰' },
  { type: 'item',  id: 'confidence', label: 'AI Confidence',   icon: '💎' },
  { type: 'label', label: 'Compte' },
  { type: 'item',  id: 'settings',   label: 'Paramètres',      icon: '⚙️' },
]

function Sidebar({ user, planConfig, activeModule, onNavigate, onLogout, isOpen }) {
  const isLocked = (modId) => {
    if (modId === null || modId === 'settings') return false
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
              key={item.id ?? '__dash__'}
              className={[
                'sidebar-nav-item',
                isActive ? 'active' : '',
                locked ? 'locked' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => { if (!locked) onNavigate(item.id) }}
              title={locked ? `${item.label} — plan supérieur requis` : undefined}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="sidebar-nav-icon">
                {item.icon === null ? <IconHome /> : item.icon}
              </span>
              <span className="sidebar-nav-name">{item.label}</span>
              {locked && (
                <span className="sidebar-nav-lock" aria-label="Verrouillé">
                  <IconLock />
                </span>
              )}
            </button>
          )
        })}
      </nav>

      <div className="sidebar-plan">
        <div className="sidebar-plan-label">Mon plan</div>
        <div className="sidebar-plan-row">
          <div className="sidebar-plan-name">{planConfig?.badge} {planConfig?.name}</div>
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
        <button className="sidebar-logout" onClick={onLogout} aria-label="Se déconnecter" title="Se déconnecter">
          <IconLogout />
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
