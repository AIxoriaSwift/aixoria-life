import { Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import ClientDashboard from './pages/ClientDashboard'
import AdminDashboard from './pages/AdminDashboard'
import OnboardingPage from './pages/OnboardingPage'

export default function App() {
  return (
    <Routes>
      <Route path="/"            element={<LandingPage />} />
      <Route path="/signup"      element={<SignupPage />} />
      <Route path="/login"       element={<LoginPage />} />
      <Route path="/onboarding"  element={<OnboardingPage />} />
      <Route path="/app"         element={<ClientDashboard />} />
      <Route path="/admin"       element={<AdminDashboard />} />
      <Route path="*"            element={<LandingPage />} />
    </Routes>
  )
}
