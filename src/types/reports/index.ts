import type { LucideIcon } from 'lucide-react'

/** A top-row summary metric rendered as a notched stat card. */
export type ReportStat = {
  id: string
  label: string
  value: string
  icon: LucideIcon
  tint: string
  iconBg: string
  iconColor: string
  /** Positive = up, negative = down, 0 = neutral/all clear */
  trend: number
  /** Shown instead of a % when there is nothing to report */
  allClear?: boolean
}

/** A single slice for the pie charts. */
export type PieSlice = {
  name: string
  value: number
  color: string
}

/** A single point for the line charts. */
export type TrendPoint = {
  label: string
  value: number
}

/** Selectable time range for trend charts. */
export type TrendRange = '1m' | '3m' | '6m' | '1y'

/** A downloadable report option shown in the download control. */
export type ReportType = {
  id: string
  label: string
  description: string
}

/** A compact stat tile (label + coloured value) used in grid rows. */
export type MiniStat = {
  id: string
  label: string
  value: string
  color: string
}

/** A recent booking row. */
export type RecentBooking = {
  id: string
  customer: string
  route: string
  source: string
  amount: string
  status: 'Confirmed' | 'Pending' | 'Cancelled'
}

/** A customer ranking entry (used by the podium + list). */
export type CustomerRank = {
  id: string
  name: string
  /** Primary metric, e.g. total spend */
  value: number
  /** Secondary metric, e.g. bookings count */
  bookings: number
  avatarUrl?: string
}

/** An airline entry rendered with a logo placeholder. */
export type AirlinePie = {
  name: string
  value: number
  color: string
}

/** A reports tab definition. */
export type ReportTab = {
  id: string
  label: string
  icon: LucideIcon
}
