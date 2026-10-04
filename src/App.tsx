import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './shared/header/Header'
import { SidebarProvider, useSidebar } from './shared/SidebarContext'
import Dashboard from './pages/dashboard'
import Bookings from './pages/bookings'
import Customer from './pages/customer'
import Journeys from './pages/journeys'
import Automations from './pages/automations'
import Templates from './pages/templates'
import Reports from './pages/reports'
import Invoice from './pages/invoice'
import Expense from './pages/expense'
import Income from './pages/income'
import Settings from './pages/settings'
import Login from './pages/auth/login'
import Signup from './pages/auth/signup'
import ForgotPassword from './pages/auth/forgot'

/** Scrolls the window to the top on every route change (and on reload). */
function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    // Let the browser handle scroll ourselves, not restore the previous spot
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname])

  return null
}

function Layout() {
  const { expanded } = useSidebar()
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div
        className={`flex min-w-0 flex-1 flex-col transition-all duration-300 ${
          expanded ? 'md:ml-56' : 'md:ml-16'
        }`}
      >
        <Header notificationCount={24} />
        <main className="flex-1 p-4 sm:p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/journeys" element={<Journeys />} />
            <Route path="/automations" element={<Automations />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/expense" element={<Expense />} />
            <Route path="/income" element={<Income />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/*" element={<Layout />} />
        </Routes>
      </SidebarProvider>
    </BrowserRouter>
  )
}
