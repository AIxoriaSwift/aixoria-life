import BrandLogo from './BrandLogo'

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

const IconShield = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const IconLogout = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
)

/* Navigation entries — type:'label' renders a section header, type:'item' a nav button */
const NAV_ITEMS = [
  { type: 'item',  id: null,         label: 'Dashboard',       icon: null },
  { type: 'label', label: 'Modules IA' },
  { type: 'item',  id: 'discipline', label: 'Discipline',      icon: '🧠' },
  { type: 'item',  id: 'planner',    label: 'Planner',         icon: '📅' },
  { type: 'item',  id: 'business',   label: 'Business Builder',icon: '🚀' },
  { type: 'item',  id: 'finance',    label: 'Finance',         icon: '💰' },
  { type: 'item',  id: 'content',    label: 'Content',         icon: '✨' },
  { type: 'item',  id: 'confidence', label: 'Confidence',      icon: '💎' },
  { type: 'item',  id: 'future-me',  label: 'Future Me',       icon: '🌟' },
  { type: 'item',  id: 'life-pulse', label: 'Life Pulse',      icon: '💫' },
]

function Sidebar({ user, planConfig, activeModule, modules, onNavigate, onLogout, isOpen }) {
  const isLocked = (modId) => {
    if (modId === null) return false
    if (!user) return true
    if (user.role === 'admin') return false
    return !planConfig.modules.includes(modId)
  }

  const initials = user?.name
    ? user.name.slice(0, 2).toUpperCase()
    : '?'

  return (
    <aside className={`sidebar${isOpen ? ' sidebar--open' : ''}`} role="navigation" aria-label="Navigation principale">
      {/* Logo */}
      <div className="sidebar-logo">
        <BrandLogo onClick={() => onNavigate(null)} />
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item, i) => {
          if (item.type === 'label') {
            return (
              <span key={`label-${i}`} className="sidebar-nav-label">
                {item.label}
              </span>
            )
          }

          const locked = isLocked(item.id)
          const isActive = item.id === null
            ? activeModule === null
            : activeModule === item.id

          return (
            <button
              key={item.id ?? '__dash__'}
              className={[
                'sidebar-nav-item',
                isActive ? 'active' : '',
                locked ? 'locked' : '',
              ].join(' ')}
              onClick={() => { if (!locked) onNavigate(item.id) }}
              title={locked ? `${item.label} — plan supérieur requis` : item.label}
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

        {/* Admin Center — visible uniquement pour l'admin */}
        {user?.role === 'admin' && (
          <>
            <span className="sidebar-nav-label">Administration</span>
            <button
              className={`sidebar-nav-item sidebar-nav-item--admin${activeModule === null ? ' active' : ''}`}
              onClick={() => onNavigate(null)}
              title="Admin Center"
            >
              <span className="sidebar-nav-icon"><IconShield /></span>
              <span className="sidebar-nav-name">Admin Center</span>
            </button>
          </>
        )}
      </nav>

      {/* Plan info */}
      {user?.role !== 'admin' ? (
        <div className="sidebar-plan">
          <div className="sidebar-plan-label">Mon plan</div>
          <div className="sidebar-plan-name">{planConfig.badge} {planConfig.name}</div>
          {planConfig.name !== 'Pro' && (
            <button className="sidebar-plan-upgrade">Passer à Pro ⚡ →</button>
          )}
        </div>
      ) : (
        <div className="sidebar-plan" style={{ background: 'rgba(245,158,11,.07)', borderColor: 'rgba(245,158,11,.18)' }}>
          <div className="sidebar-plan-label">Mode</div>
          <div className="sidebar-plan-name" style={{ color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <IconShield /> Administrateur
          </div>
        </div>
      )}

      {/* User */}
      <div className="sidebar-user">
        <div className="sidebar-user-avatar">{initials}</div>
        <div className="sidebar-user-info">
          <div className="sidebar-user-name">{user?.name}</div>
          <div className="sidebar-user-email">{user?.email}</div>
        </div>
        <button className="sidebar-logout" onClick={onLogout} aria-label="Se déconnecter" title="Se déconnecter">
          <IconLogout />
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
