import { Link } from 'react-router-dom'

function NexusHeader() {
  return (
    <header className="nx-header">
      <div className="nx-header-brand">
        <div className="nx-logo-mark" aria-hidden="true">
          <span className="nx-logo-dot" />
        </div>
        <div className="nx-header-titles">
          <span className="nx-header-name">AIxoria Nexus</span>
          <span className="nx-header-tagline">Le cockpit central de vos agents IA.</span>
        </div>
      </div>

      <div className="nx-header-actions">
        <Link to="/app" className="nx-header-link">AIxoria Life</Link>
        <div className="nx-header-avatar" title="Mon compte">AI</div>
      </div>
    </header>
  )
}

export default NexusHeader
