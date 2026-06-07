import { Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import ClientDashboard from './pages/ClientDashboard'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <Routes>
      <Route path="/"      element={<LandingPage />} />
      <Route path="/app"   element={<ClientDashboard />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*"      element={<LandingPage />} />
    </Routes>
  )
}
