import {
  Plane, Wallet, TrendingUp, PiggyBank, Users2, MessageSquare,
} from 'lucide-react'
import type {
  ReportStat, PieSlice, TrendPoint, MiniStat, RecentBooking, CustomerRank,
} from '../types/reports'
import type { TrendRange } from '../types/reports'
import type { Member } from '../types/member'
import {
  reportStats, bookingTrend, bookingBySource, topRoutes, allRoutes,
  revenueByRange, revenueMonthlyBreakdown, bookingStatusStats, recentBookings,
  customerGrowth, topCustomers, communicationStats, messageDelivery,
  expenseTrend, expenseBreakdown, topExpenses, airlinesByBooking, airlineRevenue,
} from './reports'
import { formatINR } from '../utils/format'
import { customers } from './customer'

/** The complete set of datasets every reports tab consumes. */
export type ReportData = {
  stats: ReportStat[]
  bookingTrend: TrendPoint[]
  bookingBySource: PieSlice[]
  topRoutes: PieSlice[]
  allRoutes: PieSlice[]
  revenueByRange: Record<TrendRange, TrendPoint[]>
  revenueMonthlyBreakdown: PieSlice[]
  bookingStatusStats: MiniStat[]
  recentBookings: RecentBooking[]
  customerGrowth: TrendPoint[]
  topCustomers: CustomerRank[]
  communicationStats: MiniStat[]
  messageDelivery: PieSlice[]
  expenseTrend: TrendPoint[]
  expenseBreakdown: PieSlice[]
  topExpenses: PieSlice[]
  airlinesByBooking: PieSlice[]
  airlineRevenue: PieSlice[]
}

/** Admin dataset: the full team-wide mock, as-is. */
export const adminReportData: ReportData = {
  stats: reportStats,
  bookingTrend,
  bookingBySource,
  topRoutes,
  allRoutes,
  revenueByRange,
  revenueMonthlyBreakdown,
  bookingStatusStats,
  recentBookings,
  customerGrowth,
  topCustomers,
  communicationStats,
  messageDelivery,
  expenseTrend,
  expenseBreakdown,
  topExpenses,
  airlinesByBooking,
  airlineRevenue,
}

const scalePie = (data: PieSlice[], f: number): PieSlice[] =>
  data.map((d) => ({ ...d, value: Math.max(0, Math.round(d.value * f)) }))

const scaleTrend = (data: TrendPoint[], f: number): TrendPoint[] =>
  data.map((d) => ({ ...d, value: Math.max(0, Math.round(d.value * f)) }))

const scaleRanges = (
  data: Record<TrendRange, TrendPoint[]>,
  f: number,
): Record<TrendRange, TrendPoint[]> => ({
  '1m': scaleTrend(data['1m'], f),
  '3m': scaleTrend(data['3m'], f),
  '6m': scaleTrend(data['6m'], f),
  '1y': scaleTrend(data['1y'], f),
})

/**
 * Builds a member-scoped report dataset derived from the member's own figures.
 * Everything is proportionally scaled from the admin (team) dataset using the
 * member's share of total bookings, so a member only ever sees their own numbers.
 */
export function buildMemberReportData(member: Member, teamBookings: number): ReportData {
  const share = teamBookings > 0 ? member.totalBookings / teamBookings : 0.25
  const owned = customers.filter((c) => c.ownerId === member.id)

  const stats: ReportStat[] = [
    { id: 'total-bookings', label: 'Total Bookings', value: `${member.totalBookings}`, icon: Plane, tint: 'from-blue-50 to-blue-100/50', iconBg: 'bg-blue-100', iconColor: 'text-blue-600', trend: 12.5 },
    { id: 'total-revenue', label: 'Total Revenue', value: formatINR(member.totalRevenue), icon: Wallet, tint: 'from-emerald-50 to-emerald-100/50', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', trend: 9.3 },
    { id: 'gross-profit', label: 'Gross Profit', value: formatINR(Math.round(member.totalRevenue * 0.34)), icon: TrendingUp, tint: 'from-violet-50 to-violet-100/50', iconBg: 'bg-violet-100', iconColor: 'text-violet-600', trend: 5.1 },
    { id: 'net-profit', label: 'Net Profit', value: formatINR(Math.round(member.totalRevenue * 0.22)), icon: PiggyBank, tint: 'from-amber-50 to-amber-100/50', iconBg: 'bg-amber-100', iconColor: 'text-amber-600', trend: -2.4 },
    { id: 'total-customers', label: 'Total Customers', value: `${member.totalCustomers}`, icon: Users2, tint: 'from-sky-50 to-sky-100/50', iconBg: 'bg-sky-100', iconColor: 'text-sky-600', trend: 7.8 },
    { id: 'messages-sent', label: 'Messages Sent', value: `${member.messagesSent}`, icon: MessageSquare, tint: 'from-rose-50 to-rose-100/50', iconBg: 'bg-rose-100', iconColor: 'text-rose-600', trend: 0, allClear: member.messagesSent === 0 },
  ]

  // Top customers = this member's own customers, ranked by spend
  const parseSpent = (s: string) => Number(s.replace(/[^\d]/g, '')) || 0
  const memberTopCustomers: CustomerRank[] = owned
    .map((c) => ({ id: c.id, name: c.name, value: parseSpent(c.totalSpent), bookings: c.totalBookings }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  const memberRecentBookings: RecentBooking[] = owned.slice(0, 6).map((c) => ({
    id: c.id,
    customer: c.name,
    route: c.lastJourney.route,
    source: 'Website',
    amount: c.totalSpent,
    status: c.status === 'Active' ? 'Confirmed' : 'Pending',
  }))

  return {
    stats,
    bookingTrend: scaleTrend(bookingTrend, share),
    bookingBySource: scalePie(bookingBySource, share),
    topRoutes: scalePie(topRoutes, share),
    allRoutes: scalePie(allRoutes, share),
    revenueByRange: scaleRanges(revenueByRange, share),
    revenueMonthlyBreakdown: scalePie(revenueMonthlyBreakdown, share),
    bookingStatusStats: [
      { id: 'confirmed', label: 'Confirmed', value: `${Math.round(member.totalBookings * 0.85)}`, color: 'text-emerald-600' },
      { id: 'pending', label: 'Pending', value: `${Math.round(member.totalBookings * 0.1)}`, color: 'text-amber-600' },
      { id: 'cancelled', label: 'Cancelled', value: `${Math.round(member.totalBookings * 0.05)}`, color: 'text-rose-600' },
      { id: 'avg-value', label: 'Avg. Value', value: formatINR(member.totalBookings ? Math.round(member.totalRevenue / member.totalBookings) : 0), color: 'text-blue-600' },
    ],
    recentBookings: memberRecentBookings,
    customerGrowth: scaleTrend(customerGrowth, member.totalCustomers / 163),
    topCustomers: memberTopCustomers,
    communicationStats: [
      { id: 'delivered', label: 'Delivered', value: `${Math.round(member.messagesSent * 0.9)}`, color: 'text-emerald-600' },
      { id: 'read', label: 'Read', value: `${Math.round(member.messagesSent * 0.7)}`, color: 'text-blue-600' },
      { id: 'sent', label: 'Sent', value: `${member.messagesSent}`, color: 'text-gray-800' },
      { id: 'pending', label: 'Pending', value: `${Math.round(member.messagesSent * 0.03)}`, color: 'text-amber-600' },
      { id: 'failed', label: 'Failed', value: `${Math.round(member.messagesSent * 0.01)}`, color: 'text-rose-600' },
      { id: 'cancelled', label: 'Cancelled', value: '0', color: 'text-gray-800' },
      { id: 'delivery-rate', label: 'Delivery Rate', value: '90%', color: 'text-emerald-600' },
      { id: 'read-rate', label: 'Read Rate', value: '70%', color: 'text-blue-600' },
    ],
    messageDelivery: scalePie(messageDelivery, share),
    expenseTrend: scaleTrend(expenseTrend, share),
    expenseBreakdown: scalePie(expenseBreakdown, share),
    topExpenses: scalePie(topExpenses, share),
    airlinesByBooking: scalePie(airlinesByBooking, share),
    airlineRevenue: scalePie(airlineRevenue, share),
  }
}
