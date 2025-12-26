import { useState } from 'react'
import { Layout } from './components/Layout'
import { Dashboard } from './components/Dashboard'
import { Schedule } from './components/Schedule'
import { Tasks } from './components/Tasks'
import { MoodTracker } from './components/MoodTracker'

export type View = 'dashboard' | 'schedule' | 'tasks' | 'mood';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {currentView === 'dashboard' && <Dashboard />}
      {currentView === 'schedule' && <Schedule />}
      {currentView === 'tasks' && <Tasks />}
      {currentView === 'mood' && <MoodTracker />}
    </Layout>
  )
}

export default App
