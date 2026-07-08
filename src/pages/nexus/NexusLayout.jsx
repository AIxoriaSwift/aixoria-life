import { Outlet } from 'react-router-dom'
import '../../NexusDashboard.css'
import NexusHeader from '../../components/nexus/NexusHeader'
import NexusSidebar from '../../components/nexus/NexusSidebar'

function NexusLayout() {
  return (
    <div className="nx-page">
      <NexusHeader />
      <div className="nx-body">
        <NexusSidebar />
        <main className="nx-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default NexusLayout
