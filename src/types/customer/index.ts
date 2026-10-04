import type { LucideIcon } from 'lucide-react'

export type CustomerStatus = 'Active' | 'Inactive'

/** A booking belonging to a customer. */
export type CustomerBooking = {
  id: string
  route: string
  flight: string
  date: string
  status: 'Confirmed' | 'Upcoming' | 'Completed' | 'Cancelled'
  amount: string
}

/** A WhatsApp/message log entry for a customer. */
export type CustomerMessage = {
  id: string
  text: string
  at: string
  direction: 'sent' | 'received'
  state: 'Delivered' | 'Read' | 'Sent' | 'Pending' | 'Failed'
}

/** A free-form note attached to a customer. */
export type CustomerNote = {
  id: string
  text: string
  author: string
  at: string
}

/** A customer record. */
export type Customer = {
  id: string
  /** Id of the member who owns this customer (used for role-based scoping) */
  ownerId: string
  name: string
  /** 2-letter initials used for the avatar disc */
  initials: string
  phone: string
  email: string
  memberSince: string
  status: CustomerStatus
  totalBookings: number
  totalSpent: string
  upcomingTrips: number
  whatsappMessages: number
  lastJourney: {
    route: string
    date: string
    flight: string
  }
  bookings: CustomerBooking[]
  messages: CustomerMessage[]
  notes: CustomerNote[]
}

/** A summary stat card shown above the list. */
export type CustomerStat = {
  id: string
  label: string
  value: string
  sub: string
  icon: LucideIcon
  tint: string
  iconBg: string
  iconColor: string
  /** Positive = up, negative = down, 0 = neutral (no pill) */
  trend: number
  /** Shows an "All clear" pill instead of a trend % */
  allClear?: boolean
}
