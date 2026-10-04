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

export type ChannelPoint = { day: string; sent: number; delivered: number; failed: number }

export type RouteSlice = { name: string; value: number; count: number; color: string }

export type Journey = {
  id: string
  customer: string
  pnr: string
  flight: string
  route: string
  departure: string
  status: 'Today' | 'Upcoming' | 'Completed'
  whatsapp: 'Scheduled' | 'Sent' | 'Pending'
  depCode: string
  depCity: string
  depTime: string
  arrCode: string
  arrCity: string
  arrTime: string
  duration: string
}

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

export type Role = 'admin' | 'member'

export type BookingPoint = { day: string; count: number }

export type BookingRange = '7d' | '30d' | 'year'

/** Per-member booking counts (admin-only breakdown), keyed by range */
export type MemberBookings = { name: string; count: number; color: string }

export type DeliverySlice = { name: string; value: number; color: string }

export type Activity = { id: string; user: string; action: string; at: string }
