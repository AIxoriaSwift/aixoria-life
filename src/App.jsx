import { Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ClientDashboard from './pages/ClientDashboard'
import AdminDashboard from './pages/AdminDashboard'
import OnboardingPage from './pages/OnboardingPage'
import NexusLayout from './pages/nexus/NexusLayout'
import NexusDashboardPage from './pages/nexus/NexusDashboardPage'
import NexusAgentsPage from './pages/nexus/NexusAgentsPage'
import NexusValidationsPage from './pages/nexus/NexusValidationsPage'
import NexusImpactPage from './pages/nexus/NexusImpactPage'
import NexusMemoryPage from './pages/nexus/NexusMemoryPage'
import NexusAutomationsPage from './pages/nexus/NexusAutomationsPage'
import NexusPricingPage from './pages/nexus/NexusPricingPage'

export default function App() {
  return (
    <Routes>
      <Route path="/"            element={<LandingPage />} />
      <Route path="/signup"      element={<SignupPage />} />
      <Route path="/login"       element={<LoginPage />} />
      <Route path="/onboarding"  element={<OnboardingPage />} />
      <Route path="/app"         element={<ClientDashboard />} />
      <Route path="/nexus"       element={<NexusLayout />}>
        <Route index                    element={<NexusDashboardPage />} />
        <Route path="agents"            element={<NexusAgentsPage />} />
        <Route path="validations"       element={<NexusValidationsPage />} />
        <Route path="impact"            element={<NexusImpactPage />} />
        <Route path="memoire"           element={<NexusMemoryPage />} />
        <Route path="automatisations"   element={<NexusAutomationsPage />} />
        <Route path="tarifs"            element={<NexusPricingPage />} />
      </Route>
      <Route path="/admin"       element={<AdminDashboard />} />
      <Route path="*"            element={<LandingPage />} />
    </Routes>
  )
}
