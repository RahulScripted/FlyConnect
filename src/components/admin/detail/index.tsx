import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Plane, Wallet, Users2, MessageSquare } from 'lucide-react'
import LinePanel from '../../reports/shared/LinePanel'
import PiePanel from '../../reports/shared/PiePanel'
import { formatINR } from '../../../utils/format'
import { customers } from '../../../mock/customer'
import { bookingBySource } from '../../../mock/reports'
import type { Member } from '../../../types/member'

type MemberDetailProps = {
  members: Member[]
}

export default function MemberDetail({ members }: MemberDetailProps) {
  const { memberId } = useParams()
  const navigate = useNavigate()

  const member = members.find((m) => m.id === memberId)

  if (!member) {
    return (
      <div className="flex flex-col gap-4">
        <button
          onClick={() => navigate('/admin')}
          className="flex items-center gap-1.5 text-sm font-medium text-blue-600 cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to members
        </button>
        <p className="text-sm text-gray-500">Member not found.</p>
      </div>
    )
  }

  const ownedCustomers = customers.filter((c) => c.ownerId === member.id)

  // Derive simple monthly trends scaled from the member's totals (mock)
  const base = Math.max(1, Math.round(member.totalBookings / 7))
  const bookingTrend = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((label, i) => ({
    label,
    value: Math.round(base * (0.7 + i * 0.1)),
  }))
  const revBase = Math.max(1, Math.round(member.totalRevenue / 1000 / 7))
  const revenueTrend = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((label, i) => ({
    label,
    value: Math.round(revBase * (0.7 + i * 0.1)),
  }))

  return (
    <div className="flex flex-col gap-5">
      <button
        onClick={() => navigate('/admin')}
        className="flex w-fit items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
      >
        <ArrowLeft size={16} /> Back to members
      </button>

      {/* Member header */}
      <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-semibold text-white"
          style={{ backgroundColor: member.color }}
        >
          {member.initials}
        </span>
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold text-gray-900">{member.name}</h1>
          <p className="text-sm text-gray-400">
            {member.email} · Joined {member.joinedAt}
          </p>
        </div>
        <span
          className={`ml-auto inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
            member.status === 'blocked' ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${member.status === 'blocked' ? 'bg-rose-500' : 'bg-emerald-500'}`} />
          {member.status === 'blocked' ? 'Blocked' : 'Active'}
        </span>
      </div>

      {/* KPI tiles */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi icon={Plane} tint="bg-blue-100" color="text-blue-600" label="Total Bookings" value={`${member.totalBookings}`} />
        <Kpi icon={Wallet} tint="bg-emerald-100" color="text-emerald-600" label="Total Revenue" value={formatINR(member.totalRevenue)} />
        <Kpi icon={Users2} tint="bg-violet-100" color="text-violet-600" label="Customers" value={`${member.totalCustomers}`} />
        <Kpi icon={MessageSquare} tint="bg-sky-100" color="text-sky-600" label="Messages Sent" value={`${member.messagesSent}`} />
      </div>

      {/* Trends */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <LinePanel
          title="Booking Trend"
          subtitle={`${member.name.split(' ')[0]}'s monthly bookings`}
          data={bookingTrend}
          color="#2563eb"
          gradientId={`mBooking-${member.id}`}
          format={(v) => `${v} bookings`}
        />
        <LinePanel
          title="Revenue Trend"
          subtitle={`${member.name.split(' ')[0]}'s monthly revenue`}
          data={revenueTrend}
          color="#10b981"
          gradientId={`mRevenue-${member.id}`}
          format={(v) => formatINR(v * 1000)}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <PiePanel
          title="Booking by Source"
          subtitle="Where this member's bookings come from"
          data={bookingBySource}
          totalLabel="Total Bookings"
        />

        {/* Owned customers */}
        <section className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-gray-800">Customers</h2>
            <p className="text-xs text-gray-400">Customers managed by {member.name.split(' ')[0]}</p>
          </div>
          {ownedCustomers.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-400">No customers assigned.</p>
          ) : (
            <div className="flex flex-col gap-2.5">
              {ownedCustomers.map((c) => (
                <div key={c.id} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-600">
                      {c.initials}
                    </span>
                    <span className="text-sm font-medium text-gray-800">{c.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{c.totalSpent}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

function Kpi({
  icon: Icon,
  tint,
  color,
  label,
  value,
}: {
  icon: typeof Plane
  tint: string
  color: string
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${tint}`}>
        <Icon size={18} className={color} />
      </span>
      <div>
        <p className="text-xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  )
}
