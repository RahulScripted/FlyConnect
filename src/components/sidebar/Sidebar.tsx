import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, BookOpen, MapPin, Users,
  MessageCircle, Settings2, FileText, BarChart2, Receipt,
  Wallet, DollarSign, Settings, LogOut, ChevronRight, X, ShieldCheck,
} from 'lucide-react'
import { useSidebar } from '../../shared/SidebarContext'
import { useAuth } from '../../shared/AuthContext'

const baseNav = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Bookings', icon: BookOpen, to: '/bookings' },
  { label: 'Upcoming Journeys', icon: MapPin, to: '/journeys' },
  { label: 'Customers', icon: Users, to: '/customer' },
  { label: 'WhatsApp Messages', icon: MessageCircle, to: '/automations' },
  { label: 'Automation', icon: Settings2, to: '/automations/rules' },
  { label: 'Message Templates', icon: FileText, to: '/templates' },
  { label: 'Reports', icon: BarChart2, to: '/reports' },
  { label: 'Invoices', icon: Receipt, to: '/invoice' },
  { label: 'Expenses', icon: Wallet, to: '/expense' },
  { label: 'Income', icon: DollarSign, to: '/income' },
  { label: 'Settings', icon: Settings, to: '/settings' },
]

// Admin-only entry, inserted after Reports
const adminNavItem = { label: 'Admin', icon: ShieldCheck, to: '/admin' }

export default function Sidebar() {
  const { expanded, setExpanded, mobileOpen, setMobileOpen } = useSidebar()
  const { isAdmin, user } = useAuth()
  const navigate = useNavigate()

  const initials = user.name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  const roleLabel = isAdmin ? 'Admin' : 'Member'

  const nav = isAdmin
    ? [
        ...baseNav.slice(0, 8),
        adminNavItem,
        ...baseNav.slice(8),
      ]
    : baseNav

  // On mobile the sidebar always shows labels (acts as a drawer)
  const showLabels = expanded || mobileOpen

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 flex h-screen flex-col border-r border-gray-200 bg-[#f5f7fa] transition-all duration-300
          ${expanded ? 'md:w-56' : 'md:w-16'}
          ${mobileOpen ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Collapse toggle — centered on the full sidebar height (desktop only) */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="absolute -right-3 top-1/2 z-[60] hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-md transition-colors hover:border-blue-400 hover:text-blue-600 md:flex cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <ChevronRight
            size={13}
            className={`transition-transform duration-300 ${expanded ? 'rotate-180' : 'rotate-0'}`}
          />
        </button>

        {/* Logo — same height as the top Header (h-16) */}
        <div className="relative flex h-16 shrink-0 items-center justify-center border-b border-gray-200 px-3">
          <img
            src="/logo.png"
            alt="FlyConnect"
            className={`h-9 object-contain transition-all duration-300 ${
              showLabels ? 'w-36' : 'w-9'
            }`}
          />

          {/* Close button (mobile only) */}
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-gray-500 hover:bg-gray-200 md:hidden cursor-pointer"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav — overflow-visible so collapsed tooltips can escape the aside.
            Scrolling is enabled via scroll-container only when labels are shown. */}
        <nav
          className={`no-scrollbar flex-1 space-y-1.5 px-2 py-4 ${
            showLabels ? 'overflow-y-auto' : 'overflow-visible'
          }`}
        >
          {nav.map(({ label, icon: Icon, to }) => (
            <div key={to} className="group relative">
              <NavLink
                to={to}
                end
                onClick={() => setMobileOpen(false)}
                title={!showLabels ? label : undefined}
                className={({ isActive }) =>
                  `flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors cursor-pointer ${
                    isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                  } ${!showLabels ? 'justify-center' : ''}`
                }
              >
                <Icon size={18} className="shrink-0" />
                {showLabels && <span className="truncate">{label}</span>}
              </NavLink>

              {/* Styled tooltip — only when fully collapsed on desktop */}
              {!showLabels && (
                <span
                  role="tooltip"
                  className="pointer-events-none absolute left-full top-1/2 z-[60] ml-4 -translate-y-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100"
                >
                  {label}
                  <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* User */}
        <div className="border-t border-gray-200 px-2 py-3">
          <div className={`flex h-12 items-center gap-3 rounded-lg px-2 ${!showLabels ? 'justify-center' : ''}`}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              {initials}
            </div>
            {showLabels && (
              <>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-gray-800">{user.name}</p>
                  {isAdmin && <p className="truncate text-xs text-gray-400">{roleLabel}</p>}
                </div>
                <button
                  onClick={() => navigate('/login')}
                  className="text-gray-400 transition-colors hover:text-red-500 cursor-pointer"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}
