import { useRef, useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, useMotionValue } from 'framer-motion'
import {
  LayoutDashboard, BookOpen, MapPin, Users, MessageCircle,
  Settings2, FileText, BarChart2, Receipt, Wallet, DollarSign,
  Settings, LogOut, type LucideIcon,
} from 'lucide-react'

type NavItemData = { label: string; to: string; icon: LucideIcon }

const navLinks: NavItemData[] = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Bookings', icon: BookOpen, to: '/bookings' },
  { label: 'Journeys', icon: MapPin, to: '/journeys' },
  { label: 'Customers', icon: Users, to: '/customer' },
  { label: 'WhatsApp', icon: MessageCircle, to: '/automations' },
  { label: 'Automation', icon: Settings2, to: '/automations/rules' },
  { label: 'Templates', icon: FileText, to: '/templates' },
  { label: 'Reports', icon: BarChart2, to: '/reports' },
  { label: 'Invoices', icon: Receipt, to: '/invoice' },
  { label: 'Expenses', icon: Wallet, to: '/expense' },
  { label: 'Income', icon: DollarSign, to: '/income' },
  { label: 'Settings', icon: Settings, to: '/settings' },
]

const ease = [0.76, 0, 0.24, 1] as const

const menuSlide = {
  initial: { x: 'calc(-100% - 100px)' },
  enter: { x: '0', transition: { duration: 0.8, ease } },
  exit: {
    x: 'calc(-100% - 100px)',
    transition: { duration: 0.8, ease },
  },
}

function NavItem({
  label,
  to,
  icon: Icon,
  onClose,
}: {
  label: string
  to: string
  icon: LucideIcon
  onClose: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      initial="initial"
      whileHover="whileHover"
      className="group relative flex items-center justify-between border-b border-gray-100 py-3"
    >
      <NavLink to={to} end onClick={onClose} className="block w-full">
        {({ isActive }) => (
          <div ref={ref} onMouseMove={handleMouseMove} className="relative flex items-center">
            <Icon size={18} className={`mr-3 shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
            <motion.span
              variants={{ initial: { x: 0 }, whileHover: { x: -8 } }}
              transition={{ type: 'spring', staggerChildren: 0.05, delayChildren: 0.15 }}
              className={`relative z-10 block text-xl font-semibold tracking-tight ${
                isActive ? 'text-blue-600' : 'text-gray-800'
              }`}
            >
              {label.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  variants={{ initial: { x: 0 }, whileHover: { x: 8 } }}
                  transition={{ type: 'spring' }}
                  className="inline-block"
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.span>
          </div>
        )}
      </NavLink>
    </motion.div>
  )
}

function Curve() {
  const [height, setHeight] = useState(
    typeof window !== 'undefined' ? window.innerHeight : 800,
  )

  useEffect(() => {
    const onResize = () => setHeight(window.innerHeight)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const initialPath = `M0 0 L0 ${height} Q200 ${height / 2} 0 0`
  const targetPath = `M0 0 L0 ${height} Q0 ${height / 2} 0 0`

  const curve = {
    initial: { d: initialPath },
    enter: { d: targetPath, transition: { duration: 1, ease } },
    exit: { d: initialPath, transition: { duration: 0.8, ease } },
  }

  return (
    <svg
      className="absolute top-0 -right-[99px] h-full w-[100px] stroke-none"
      style={{ fill: '#ffffff' }}
    >
      <motion.path variants={curve} />
    </svg>
  )
}

export default function CurvedMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className="fixed left-0 top-0 z-50 h-[100dvh] w-screen max-w-xs bg-white text-gray-800 shadow-2xl md:hidden"
    >
      <div className="flex h-full flex-col justify-between pt-20">
        <div className="flex flex-col overflow-y-auto px-7">
          <nav>
            {navLinks.map((l) => (
              <NavItem
                key={l.to}
                label={l.label}
                to={l.to}
                icon={l.icon}
                onClose={onClose}
              />
            ))}
          </nav>
        </div>

        <div className="px-7 pb-8">
          <NavLink
            to="/login"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-blue-600 bg-blue-600 px-6 py-3 text-[13px] font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-transparent hover:text-blue-600"
          >
            <LogOut size={16} /> Logout
          </NavLink>
        </div>
      </div>
      <Curve />
    </motion.div>
  )
}
