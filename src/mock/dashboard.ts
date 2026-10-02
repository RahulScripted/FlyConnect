import {
  Plane, CalendarCheck, Users2, MessageSquare, Clock, AlertTriangle,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type StatCard = {
  id: string
  label: string
  value: string
  sub: string
  icon: LucideIcon
  tint: string
  iconBg: string
  iconColor: string
  /** Positive = up, negative = down, 0 = neutral/all clear */
  trend: number
  /** Shown instead of a % when there is nothing to report */
  allClear?: boolean
  /** Route to navigate to when the card button is clicked */
  to: string
}

export const statCards: StatCard[] = [
  {
    id: 'total-bookings',
    label: 'Total Bookings',
    value: '11',
    sub: '',
    icon: Plane,
    tint: 'from-blue-50 to-blue-100/50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    trend: 12.5,
    to: '/bookings',
  },
  {
    id: 'todays-journeys',
    label: "Today's Journeys",
    value: '2',
    sub: '',
    icon: CalendarCheck,
    tint: 'from-emerald-50 to-emerald-100/50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    trend: 0,
    to: '/journeys',
  },
  {
    id: 'upcoming-journeys',
    label: 'Upcoming Journeys',
    value: '7',
    sub: '',
    icon: Users2,
    tint: 'from-violet-50 to-violet-100/50',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    trend: 8.2,
    to: '/journeys',
  },
  {
    id: 'messages-sent',
    label: 'Messages Sent',
    value: '29',
    sub: '',
    icon: MessageSquare,
    tint: 'from-sky-50 to-sky-100/50',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    trend: 21.4,
    to: '/automations',
  },
  {
    id: 'pending-messages',
    label: 'Pending Messages',
    value: '0',
    sub: '',
    icon: Clock,
    tint: 'from-amber-50 to-amber-100/50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    trend: -3.1,
    to: '/automations',
  },
  {
    id: 'failed-messages',
    label: 'Failed Messages',
    value: '0',
    sub: '',
    icon: AlertTriangle,
    tint: 'from-rose-50 to-rose-100/50',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    trend: 0,
    allClear: true,
    to: '/automations',
  },
]

export type ChannelPoint = { day: string; sent: number; delivered: number; failed: number }

export const messageActivity: ChannelPoint[] = [
  { day: 'Mon', sent: 12, delivered: 11, failed: 1 },
  { day: 'Tue', sent: 18, delivered: 17, failed: 1 },
  { day: 'Wed', sent: 9, delivered: 9, failed: 0 },
  { day: 'Thu', sent: 22, delivered: 20, failed: 2 },
  { day: 'Fri', sent: 15, delivered: 15, failed: 0 },
  { day: 'Sat', sent: 27, delivered: 26, failed: 1 },
  { day: 'Sun', sent: 20, delivered: 19, failed: 1 },
]

export type RouteSlice = { name: string; value: number; count: number; color: string }

export const routeSplit: RouteSlice[] = [
  { name: 'Domestic', value: 58, count: 64, color: '#2563eb' },
  { name: 'International', value: 27, count: 30, color: '#7c3aed' },
  { name: 'Connecting', value: 15, count: 16, color: '#06b6d4' },
]

export type Journey = {
  id: string
  customer: string
  pnr: string
  flight: string
  route: string
  departure: string
  status: 'Today' | 'Upcoming' | 'Completed'
  whatsapp: 'Scheduled' | 'Sent' | 'Pending'
}

export const journeys: Journey[] = [
  { id: 'j1', customer: 'Amit Patel', pnr: 'LMN456', flight: 'EK-501', route: 'BOM → DXB', departure: '02:15 PM', status: 'Today', whatsapp: 'Scheduled' },
  { id: 'j2', customer: 'Sneha Iyer', pnr: 'QWE321', flight: 'UK-955', route: 'DEL → BOM', departure: '04:40 PM', status: 'Today', whatsapp: 'Scheduled' },
  { id: 'j3', customer: 'Rahul Sharma', pnr: 'ABC123', flight: 'AI-202', route: 'BOM → DEL', departure: '10:30 AM', status: 'Upcoming', whatsapp: 'Sent' },
  { id: 'j4', customer: 'Priya Mehta', pnr: 'XYZ789', flight: '6E-501', route: 'BOM → BLR', departure: '12:45 PM', status: 'Upcoming', whatsapp: 'Sent' },
  { id: 'j5', customer: 'Neha Soni', pnr: 'GHI321', flight: '6E-454', route: 'BOM → PNQ', departure: '09:15 AM', status: 'Completed', whatsapp: 'Sent' },
  { id: 'j6', customer: 'Rohit Verma', pnr: 'DEF987', flight: 'AI-212', route: 'DEL → BOM', departure: '06:00 PM', status: 'Completed', whatsapp: 'Sent' },
  { id: 'j7', customer: 'Neha Panjwani', pnr: 'UIO987', flight: 'SG-816', route: 'BOM → GOI', departure: '08:10 PM', status: 'Upcoming', whatsapp: 'Scheduled' },
  { id: 'j8', customer: 'Karan Malhotra', pnr: 'RTY654', flight: '6E-210', route: 'BOM → HYD', departure: '06:20 PM', status: 'Upcoming', whatsapp: 'Scheduled' },
  { id: 'j9', customer: 'Divya Nair', pnr: 'PLM852', flight: 'AI-440', route: 'BLR → DEL', departure: '07:05 AM', status: 'Upcoming', whatsapp: 'Pending' },
  { id: 'j10', customer: 'Vikram Rao', pnr: 'OKN963', flight: 'UK-833', route: 'HYD → BOM', departure: '11:50 AM', status: 'Upcoming', whatsapp: 'Scheduled' },
  { id: 'j11', customer: 'Anjali Desai', pnr: 'WSX147', flight: '6E-677', route: 'PNQ → DEL', departure: '03:30 PM', status: 'Upcoming', whatsapp: 'Sent' },
  { id: 'j12', customer: 'Suresh Kumar', pnr: 'EDC258', flight: 'AI-101', route: 'DEL → GOI', departure: '05:15 PM', status: 'Upcoming', whatsapp: 'Scheduled' },
]

export type Reminder = {
  id: string
  date: string
  time: string
  name: string
  note: string
  pnr: string
  flightCode: string
  depCode: string
  depCity: string
  depTime: string
  arrCode: string
  arrCity: string
  arrTime: string
  duration: string
  /** E.164 phone number used to open WhatsApp */
  phone: string
  /** Pre-filled WhatsApp message */
  message: string
}

export const reminders: Reminder[] = [
  { id: 'r1', date: 'Today', time: '06:00 am', name: 'Amit Patel', note: 'Journey Day Reminder', pnr: 'LMN456', flightCode: 'EK-501', depCode: 'BOM', depCity: 'Mumbai', depTime: '02:15 PM', arrCode: 'DXB', arrCity: 'Dubai', arrTime: '04:05 PM', duration: '3h 20m', phone: '919123456789', message: 'Hi Amit, your flight EK-501 (BOM → DXB) departs today at 02:15 PM. Safe travels!' },
  { id: 'r2', date: 'Today', time: '06:00 am', name: 'Sneha Iyer', note: 'Journey Day Reminder', pnr: 'QWE321', flightCode: 'UK-955', depCode: 'DEL', depCity: 'Delhi', depTime: '04:40 PM', arrCode: 'BOM', arrCity: 'Mumbai', arrTime: '06:50 PM', duration: '2h 10m', phone: '918877665544', message: 'Hi Sneha, your flight UK-955 (DEL → BOM) departs today at 04:40 PM. Safe travels!' },
  { id: 'r3', date: 'Today', time: '09:00 am', name: 'Karan Malhotra', note: '24h Reminder', pnr: 'RTY654', flightCode: '6E-210', depCode: 'BOM', depCity: 'Mumbai', depTime: '06:20 PM', arrCode: 'HYD', arrCity: 'Hyderabad', arrTime: '07:45 PM', duration: '1h 25m', phone: '919765432109', message: 'Hi Karan, a reminder for your flight 6E-210 (BOM → HYD) tomorrow. See you soon!' },
  { id: 'r4', date: 'Tomorrow', time: '10:30 am', name: 'Neha Panjwani', note: '24h Reminder', pnr: 'UIO987', flightCode: 'SG-816', depCode: 'BOM', depCity: 'Mumbai', depTime: '08:10 PM', arrCode: 'GOI', arrCity: 'Goa', arrTime: '09:20 PM', duration: '1h 10m', phone: '919988776543', message: 'Hi Neha, a reminder for your flight SG-816 (BOM → GOI). Check-in opens soon.' },
  { id: 'r5', date: 'Tomorrow', time: '07:15 am', name: 'Divya Nair', note: 'Journey Day Reminder', pnr: 'PLM852', flightCode: 'AI-440', depCode: 'BLR', depCity: 'Bengaluru', depTime: '07:05 AM', arrCode: 'DEL', arrCity: 'Delhi', arrTime: '09:50 AM', duration: '2h 45m', phone: '919090909090', message: 'Hi Divya, your flight AI-440 (BLR → DEL) is coming up. Have a great trip!' },
  { id: 'r6', date: '25 Sept', time: '08:00 am', name: 'Vikram Rao', note: '24h Reminder', pnr: 'OKN963', flightCode: 'UK-833', depCode: 'HYD', depCity: 'Hyderabad', depTime: '11:50 AM', arrCode: 'BOM', arrCity: 'Mumbai', arrTime: '01:15 PM', duration: '1h 25m', phone: '918080808080', message: 'Hi Vikram, a reminder for your flight UK-833 (HYD → BOM). Safe travels!' },
]

export type Role = 'admin' | 'member'

export const user = {
  name: 'Garv',
  role: 'admin' as Role,
}

/** Role-specific dashboard subtitle */
export const welcomeMessages: Record<Role, string> = {
  admin:
    "Here's what's happening with your team's travel automation today. 248 tasks ran overnight and 7 need attention. 3 trip requests are waiting for your approval, and October spend is at 72% of budget.",
  member:
    "Here's what's happening with your travel automation today. Your BOM → BLR trip is on Monday and auto check-in is on. 2 things need you: upload your receipts and follow up on your hotel request.",
}

/** Greeting based on the current UTC hour */
export function getGreeting(date = new Date()): string {
  const h = date.getUTCHours()
  if (h >= 5 && h < 12) return 'Good morning'
  if (h >= 12 && h < 17) return 'Good afternoon'
  if (h >= 17 && h < 22) return 'Good evening'
  return 'Late night'
}
