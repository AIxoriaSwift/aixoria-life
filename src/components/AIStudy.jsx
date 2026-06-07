import { useState } from 'react'
import StudyDashboard from './study/StudyDashboard'
import StudySummarize from './study/StudySummarize'
import StudyFlashcards from './study/StudyFlashcards'
import StudyQuiz from './study/StudyQuiz'
import StudyPlanning from './study/StudyPlanning'
import '../StudyModule.css'

const NAV_ITEMS = [
  { id: 'dashboard',  label: 'Dashboard',          icon: '🏠' },
  { id: 'summarize',  label: 'Résumer un cours',   icon: '📝' },
  { id: 'flashcards', label: 'Fiches de révision', icon: '🗃️' },
  { id: 'quiz',       label: 'Quiz intelligent',   icon: '❓' },
  { id: 'planning',   label: 'Planning',           icon: '📅' },
]

function AIStudy({ onBack }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState({ summarized: 0, flashcards: 0, quizzes: 0, hours: 0 })

  const incrementStat = (key, amount = 1) =>
    setStats((prev) => ({ ...prev, [key]: prev[key] + amount }))

  const BackIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  )

  return (
    <div className="sm-layout">
      {/* ── Sidebar (desktop) ── */}
      <aside className="sm-sidebar">
        <button className="sm-back-btn" onClick={onBack}>
          <BackIcon /> Retour
        </button>
        <div className="sm-brand">
          <span className="sm-brand-icon">📚</span>
          <div>
            <div className="sm-brand-name">AI Study</div>
            <div className="sm-brand-sub">Module actif</div>
          </div>
        </div>
        <nav className="sm-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`sm-nav-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="sm-nav-icon">{item.icon}</span>
              <span className="sm-nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* ── Content ── */}
      <main className="sm-content">
        {/* Mobile top bar */}
        <div className="sm-mobile-nav">
          <button className="sm-back-btn" onClick={onBack}>
            <BackIcon /> Retour
          </button>
          <div className="sm-mobile-tabs" role="tablist">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={`sm-mobile-tab ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
                role="tab"
                aria-selected={activeTab === item.id}
                title={item.label}
              >
                {item.icon}
              </button>
            ))}
          </div>
        </div>

        <div className="sm-content-inner">
          {activeTab === 'dashboard'  && <StudyDashboard stats={stats} onNavigate={setActiveTab} />}
          {activeTab === 'summarize'  && <StudySummarize  onComplete={() => incrementStat('summarized')} />}
          {activeTab === 'flashcards' && <StudyFlashcards onComplete={(n) => incrementStat('flashcards', n)} />}
          {activeTab === 'quiz'       && <StudyQuiz        onComplete={() => incrementStat('quizzes')} />}
          {activeTab === 'planning'   && <StudyPlanning    onComplete={(h) => incrementStat('hours', h)} />}
        </div>
      </main>
    </div>
  )
}

export default AIStudy
