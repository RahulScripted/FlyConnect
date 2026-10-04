import {
  Plane, Wallet, TrendingUp, PiggyBank, Users2, MessageSquare,
  LayoutGrid, Ticket, IndianRupee, UserRound, MessageCircle, Receipt, Route, Building2,
} from 'lucide-react'
import type {
  ReportStat, PieSlice, TrendPoint, TrendRange, ReportType, MiniStat,
  RecentBooking, CustomerRank, ReportTab,
} from '../types/reports'

/** Tabs across the top of the reports page (Invoice intentionally omitted). */
export const reportTabs: ReportTab[] = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'bookings', label: 'Bookings', icon: Ticket },
  { id: 'revenue', label: 'Revenue', icon: IndianRupee },
  { id: 'customers', label: 'Customers', icon: UserRound },
  { id: 'communications', label: 'Communications', icon: MessageCircle },
  { id: 'expenses', label: 'Expenses', icon: Receipt },
  { id: 'routes', label: 'Routes', icon: Route },
  { id: 'airlines', label: 'Airlines', icon: Building2 },
]

/** Top-row KPIs for the overview tab. */
export const reportStats: ReportStat[] = [
  {
    id: 'total-bookings',
    label: 'Total Bookings',
    value: '248',
    icon: Plane,
    tint: 'from-blue-50 to-blue-100/50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    trend: 12.5,
  },
  {
    id: 'total-revenue',
    label: 'Total Revenue',
    value: '₹18.4L',
    icon: Wallet,
    tint: 'from-emerald-50 to-emerald-100/50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    trend: 9.3,
  },
  {
    id: 'gross-profit',
    label: 'Gross Profit',
    value: '₹6.2L',
    icon: TrendingUp,
    tint: 'from-violet-50 to-violet-100/50',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    trend: 5.1,
  },
  {
    id: 'net-profit',
    label: 'Net Profit',
    value: '₹4.1L',
    icon: PiggyBank,
    tint: 'from-amber-50 to-amber-100/50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    trend: -2.4,
  },
  {
    id: 'total-customers',
    label: 'Total Customers',
    value: '163',
    icon: Users2,
    tint: 'from-sky-50 to-sky-100/50',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-600',
    trend: 7.8,
  },
  {
    id: 'messages-sent',
    label: 'Messages Sent',
    value: '1,204',
    icon: MessageSquare,
    tint: 'from-rose-50 to-rose-100/50',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
    trend: 0,
    allClear: true,
  },
]

/* ---------------- Overview / shared pies & lines ---------------- */

export const expenseBreakdown: PieSlice[] = [
  { name: 'Flights', value: 820000, color: '#2563eb' },
  { name: 'Hotels', value: 410000, color: '#7c3aed' },
  { name: 'Salaries', value: 260000, color: '#06b6d4' },
  { name: 'Marketing', value: 140000, color: '#f59e0b' },
  { name: 'Misc', value: 90000, color: '#ef4444' },
]

export const bookingBySource: PieSlice[] = [
  { name: 'Website', value: 96, color: '#2563eb' },
  { name: 'WhatsApp', value: 72, color: '#22c55e' },
  { name: 'Walk-in', value: 44, color: '#f59e0b' },
  { name: 'Referral', value: 36, color: '#7c3aed' },
]

export const topRoutes: PieSlice[] = [
  { name: 'BOM → DEL', value: 58, color: '#2563eb' },
  { name: 'BOM → DXB', value: 41, color: '#7c3aed' },
  { name: 'DEL → BLR', value: 33, color: '#06b6d4' },
  { name: 'BOM → GOI', value: 27, color: '#f59e0b' },
  { name: 'HYD → BOM', value: 19, color: '#ef4444' },
]

/** Full route list for the Routes tab (podium uses first 3, list paginates the rest). */
export const allRoutes: PieSlice[] = [
  { name: 'BOM → DEL', value: 58, color: '#2563eb' },
  { name: 'BOM → DXB', value: 41, color: '#7c3aed' },
  { name: 'DEL → BLR', value: 33, color: '#06b6d4' },
  { name: 'BOM → GOI', value: 27, color: '#f59e0b' },
  { name: 'HYD → BOM', value: 19, color: '#ef4444' },
  { name: 'DEL → BOM', value: 17, color: '#2563eb' },
  { name: 'BLR → DEL', value: 15, color: '#7c3aed' },
  { name: 'BOM → PNQ', value: 12, color: '#06b6d4' },
  { name: 'PNQ → DEL', value: 10, color: '#f59e0b' },
  { name: 'DEL → GOI', value: 9, color: '#ef4444' },
  { name: 'BOM → HYD', value: 8, color: '#2563eb' },
  { name: 'GOI → BOM', value: 6, color: '#7c3aed' },
]

export const revenueTrend: TrendPoint[] = [
  { label: 'Apr', value: 142 },
  { label: 'May', value: 168 },
  { label: 'Jun', value: 155 },
  { label: 'Jul', value: 191 },
  { label: 'Aug', value: 176 },
  { label: 'Sep', value: 214 },
  { label: 'Oct', value: 238 },
]

/** Revenue trend by selectable range. Default view shows the last 6 months. */
export const revenueRangeLabels: Record<TrendRange, string> = {
  '1m': '1 Month',
  '3m': '3 Months',
  '6m': '6 Months',
  '1y': '1 Year',
}

export const revenueByRange: Record<TrendRange, TrendPoint[]> = {
  // Weekly points within the last month
  '1m': [
    { label: 'Wk 1', value: 54 },
    { label: 'Wk 2', value: 61 },
    { label: 'Wk 3', value: 58 },
    { label: 'Wk 4', value: 65 },
  ],
  '3m': [
    { label: 'Aug', value: 176 },
    { label: 'Sep', value: 214 },
    { label: 'Oct', value: 238 },
  ],
  // Default — last 6 months
  '6m': [
    { label: 'May', value: 168 },
    { label: 'Jun', value: 155 },
    { label: 'Jul', value: 191 },
    { label: 'Aug', value: 176 },
    { label: 'Sep', value: 214 },
    { label: 'Oct', value: 238 },
  ],
  '1y': [
    { label: 'Nov', value: 121 },
    { label: 'Dec', value: 134 },
    { label: 'Jan', value: 118 },
    { label: 'Feb', value: 129 },
    { label: 'Mar', value: 147 },
    { label: 'Apr', value: 142 },
    { label: 'May', value: 168 },
    { label: 'Jun', value: 155 },
    { label: 'Jul', value: 191 },
    { label: 'Aug', value: 176 },
    { label: 'Sep', value: 214 },
    { label: 'Oct', value: 238 },
  ],
}

export const bookingTrend: TrendPoint[] = [
  { label: 'Apr', value: 28 },
  { label: 'May', value: 34 },
  { label: 'Jun', value: 31 },
  { label: 'Jul', value: 42 },
  { label: 'Aug', value: 38 },
  { label: 'Sep', value: 47 },
  { label: 'Oct', value: 52 },
]

/* ---------------- Bookings tab ---------------- */

export const bookingStatusStats: MiniStat[] = [
  { id: 'confirmed', label: 'Confirmed', value: '211', color: 'text-emerald-600' },
  { id: 'pending', label: 'Pending', value: '24', color: 'text-amber-600' },
  { id: 'cancelled', label: 'Cancelled', value: '13', color: 'text-rose-600' },
  { id: 'avg-value', label: 'Avg. Value', value: '₹7.4K', color: 'text-blue-600' },
]

export const recentBookings: RecentBooking[] = [
  { id: 'b1', customer: 'Amit Patel', route: 'BOM → DXB', source: 'Website', amount: '₹24,500', status: 'Confirmed' },
  { id: 'b2', customer: 'Sneha Iyer', route: 'DEL → BOM', source: 'WhatsApp', amount: '₹8,200', status: 'Confirmed' },
  { id: 'b3', customer: 'Rahul Sharma', route: 'BOM → DEL', source: 'Referral', amount: '₹9,800', status: 'Pending' },
  { id: 'b4', customer: 'Priya Mehta', route: 'BOM → BLR', source: 'Walk-in', amount: '₹6,400', status: 'Confirmed' },
  { id: 'b5', customer: 'Karan Malhotra', route: 'BOM → HYD', source: 'Website', amount: '₹5,900', status: 'Cancelled' },
  { id: 'b6', customer: 'Divya Nair', route: 'BLR → DEL', source: 'WhatsApp', amount: '₹11,200', status: 'Confirmed' },
]

/* ---------------- Revenue tab ---------------- */

export const revenueMonthlyBreakdown: PieSlice[] = [
  { name: 'Q1 (Apr–Jun)', value: 465000, color: '#2563eb' },
  { name: 'Q2 (Jul–Sep)', value: 581000, color: '#7c3aed' },
  { name: 'Q3 (Oct)', value: 238000, color: '#06b6d4' },
]

/* ---------------- Customers tab ---------------- */

export const customerGrowth: TrendPoint[] = [
  { label: 'Apr', value: 86 },
  { label: 'May', value: 98 },
  { label: 'Jun', value: 112 },
  { label: 'Jul', value: 124 },
  { label: 'Aug', value: 139 },
  { label: 'Sep', value: 151 },
  { label: 'Oct', value: 163 },
]

export const topCustomers: CustomerRank[] = [
  { id: 'c1', name: 'Amit Patel', value: 124500, bookings: 18, avatarUrl: 'https://i.pravatar.cc/96?u=amit' },
  { id: 'c2', name: 'Priya Mehta', value: 98200, bookings: 15, avatarUrl: 'https://i.pravatar.cc/96?u=priya' },
  { id: 'c3', name: 'Rahul Sharma', value: 87400, bookings: 14, avatarUrl: 'https://i.pravatar.cc/96?u=rahul' },
  { id: 'c4', name: 'Sneha Iyer', value: 72100, bookings: 11, avatarUrl: 'https://i.pravatar.cc/96?u=sneha' },
  { id: 'c5', name: 'Karan Malhotra', value: 64800, bookings: 9, avatarUrl: 'https://i.pravatar.cc/96?u=karan' },
]

/* ---------------- Communications tab ---------------- */

export const communicationStats: MiniStat[] = [
  { id: 'delivered', label: 'Delivered', value: '0', color: 'text-emerald-600' },
  { id: 'read', label: 'Read', value: '0', color: 'text-blue-600' },
  { id: 'sent', label: 'Sent', value: '11', color: 'text-gray-800' },
  { id: 'pending', label: 'Pending', value: '15', color: 'text-amber-600' },
  { id: 'failed', label: 'Failed', value: '0', color: 'text-rose-600' },
  { id: 'cancelled', label: 'Cancelled', value: '3', color: 'text-gray-800' },
  { id: 'delivery-rate', label: 'Delivery Rate', value: '0%', color: 'text-emerald-600' },
  { id: 'read-rate', label: 'Read Rate', value: '0%', color: 'text-blue-600' },
]

export const messageDelivery: PieSlice[] = [
  { name: 'Delivered', value: 0, color: '#22c55e' },
  { name: 'Sent', value: 11, color: '#3b82f6' },
  { name: 'Pending', value: 15, color: '#f59e0b' },
  { name: 'Failed', value: 0, color: '#ef4444' },
]

/* ---------------- Expenses tab ---------------- */

export const expenseTrend: TrendPoint[] = [
  { label: 'Apr', value: 118 },
  { label: 'May', value: 132 },
  { label: 'Jun', value: 126 },
  { label: 'Jul', value: 149 },
  { label: 'Aug', value: 141 },
  { label: 'Sep', value: 158 },
  { label: 'Oct', value: 167 },
]

export const topExpenses: PieSlice[] = [
  { name: 'Fuel Surcharge', value: 320000, color: '#2563eb' },
  { name: 'Hotel Partners', value: 210000, color: '#7c3aed' },
  { name: 'Payroll', value: 180000, color: '#06b6d4' },
  { name: 'Ad Spend', value: 95000, color: '#f59e0b' },
  { name: 'Software', value: 54000, color: '#ef4444' },
]

/* ---------------- Airlines tab ---------------- */

export const airlinesByBooking: PieSlice[] = [
  { name: 'IndiGo', value: 92, color: '#2563eb' },
  { name: 'Air India', value: 61, color: '#7c3aed' },
  { name: 'Emirates', value: 44, color: '#06b6d4' },
  { name: 'Vistara', value: 33, color: '#f59e0b' },
  { name: 'SpiceJet', value: 18, color: '#ef4444' },
]

export const airlineRevenue: PieSlice[] = [
  { name: 'Emirates', value: 640000, color: '#06b6d4' },
  { name: 'Air India', value: 420000, color: '#7c3aed' },
  { name: 'IndiGo', value: 380000, color: '#2563eb' },
  { name: 'Vistara', value: 240000, color: '#f59e0b' },
  { name: 'SpiceJet', value: 110000, color: '#ef4444' },
]

/* ---------------- Download control ---------------- */

export const reportTypes: ReportType[] = [
  { id: 'bookings', label: 'Bookings Report', description: 'All bookings in the selected range' },
  { id: 'revenue', label: 'Revenue Report', description: 'Revenue, profit and expense summary' },
  { id: 'customers', label: 'Customers Report', description: 'Customer activity and spend' },
  { id: 'messages', label: 'Messages Report', description: 'WhatsApp delivery performance' },
]
