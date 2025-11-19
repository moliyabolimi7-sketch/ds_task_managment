import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { Tasks } from './pages/Tasks'
import { TaskDetail } from './pages/TaskDetail'
import { Reports } from './pages/Reports'
import { Settings } from './pages/Settings'
import { Users } from './pages/Users'
import { Sidebar } from './components/Sidebar'
import { Navbar } from './components/Navbar'
import { useAuth } from './store/useAuth'

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const token = useAuth((state) => state.token)
  const fetchProfile = useAuth((state) => state.fetchProfile)
  const location = useLocation()

  useEffect(() => {
    if (token) fetchProfile()
  }, [token, fetchProfile])

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/*"
        element={
          <ProtectedLayout>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="tasks/:id" element={<TaskDetail />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
              <Route path="users" element={<Users />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </ProtectedLayout>
        }
      />
    </Routes>
  )
}
