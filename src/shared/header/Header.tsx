import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, Bell, ChevronDown, User, Settings, LogOut } from 'lucide-react'
import MenuToggle from './MenuToggle'
import CurvedMenu from './CurvedMenu'

type HeaderProps = {
  searchPlaceholder?: string
  onSearch?: (value: string) => void
  notificationCount?: number
  companyName?: string
  initials?: string
}

export default function Header({
  searchPlaceholder = 'Search by PNR, customer name or mobile number...',
  onSearch,
  notificationCount = 0,
  companyName = 'Blue Aura Tourism',
  initials = 'GK',
}: HeaderProps) {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close the user dropdown when clicking outside of it
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Prevent body scroll when the mobile nav is open
  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [navOpen])

  return (
    <header className="sticky top-0 z-40 flex items-center gap-3 bg-white border-b border-gray-200 px-3 sm:px-4 h-16">
      {/* Mobile hamburger — animated toggle that opens the curved menu */}
      <div
        aria-expanded={navOpen}
        className={`z-[60] flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-600 md:hidden ${
          navOpen ? 'fixed left-3 top-3 bg-white shadow-md sm:left-4' : 'relative hover:bg-gray-100 hover:text-gray-700 transition-colors'
        }`}
      >
        <MenuToggle open={navOpen} onOpenChange={setNavOpen} className="size-6" />
      </div>

      {/* Search */}
      <div className="relative flex-1 max-w-xl">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
        />
        <input
          type="text"
          placeholder={searchPlaceholder}
          onChange={(e) => onSearch?.(e.target.value)}
          className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
        />
      </div>

      {/* Right actions */}
      <div className="ml-auto flex items-center gap-3">
        {/* Notifications */}
        <button
          className="relative flex h-10 w-10 items-center justify-center rounded-full text-gray-500 cursor-pointer hover:bg-gray-100 hover:text-gray-700 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={20} />
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex min-w-[18px] h-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
              {notificationCount > 99 ? '99+' : notificationCount}
            </span>
          )}
        </button>

        {/* User menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
              {initials}
            </span>
            <span className="hidden text-sm font-semibold text-gray-800 sm:block">
              {companyName}
            </span>
            <ChevronDown
              size={16}
              className={`text-gray-400 transition-transform ${menuOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
              <button
                onClick={() => {
                  setMenuOpen(false)
                  navigate('/settings')
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 cursor-pointer hover:bg-gray-50"
              >
                <User size={16} className="text-gray-400" /> Profile
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false)
                  navigate('/settings')
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-700 cursor-pointer hover:bg-gray-50"
              >
                <Settings size={16} className="text-gray-400" /> Settings
              </button>
              <div className="my-1 border-t border-gray-100" />
              <button
                onClick={() => {
                  setMenuOpen(false)
                  navigate('/login')
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 cursor-pointer hover:bg-red-50"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Animated mobile navigation */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            key="nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => setNavOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          />
        )}
        {navOpen && <CurvedMenu key="curved-menu" onClose={() => setNavOpen(false)} />}
      </AnimatePresence>
    </header>
  )
}
