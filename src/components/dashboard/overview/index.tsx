import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  bookingsByRange,
  myBookingsByRange,
  bookingRangeLabels,
  memberBookingsByRange,
  user,
  type BookingRange,
} from '../../../mock/dashboard'

const RANGES: BookingRange[] = ['7d', '30d', 'year']

export default function BookingsOverview() {
  const isAdmin = user.role === 'admin'
  const [range, setRange] = useState<BookingRange>('7d')
  const [open, setOpen] = useState(false)

  // Admins see team-wide totals; members only see their own bookings
  const data = isAdmin ? bookingsByRange[range] : myBookingsByRange[range]
  const members = memberBookingsByRange[range]
  const maxCount = Math.max(...data.map((d) => d.count), 1)
  const yMax = Math.ceil(maxCount / 7) * 7
  const ticks = Array.from({ length: yMax / 7 + 1 }, (_, i) => i * 7)
  const memberTotal = members.reduce((s, m) => s + m.count, 0)

  return (
    <section className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-800">Bookings Overview</h2>
          <p className="text-xs text-gray-400">
            {isAdmin ? 'Total bookings' : 'Your bookings'} in{' '}
            {bookingRangeLabels[range].toLowerCase()}
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            onBlur={() => setTimeout(() => setOpen(false), 120)}
            className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            {bookingRangeLabels[range]} <ChevronDown size={14} />
          </button>
          {open && (
            <div className="absolute right-0 z-20 mt-1 w-36 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
              {RANGES.map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className="block w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  {bookingRangeLabels[r]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Smooth area/line chart */}
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="bookingsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#b91c1c" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#b91c1c" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid horizontal vertical={false} strokeDasharray="4 4" stroke="#e5e7eb" />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              minTickGap={32}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
            />
            <YAxis
              ticks={ticks}
              domain={[0, yMax]}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
            />

            <Tooltip
              cursor={{ stroke: '#b91c1c', strokeWidth: 1, strokeDasharray: '4 4' }}
              contentStyle={{
                borderRadius: 10,
                border: '1px solid #f3f4f6',
                fontSize: 12,
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              }}
              labelStyle={{ color: '#6b7280' }}
              formatter={(v) => [`${v} bookings`, '']}
            />

            <Area
              type="monotone"
              dataKey="count"
              stroke="#b91c1c"
              strokeWidth={2.5}
              fill="url(#bookingsFill)"
              dot={false}
              activeDot={{ r: 4, fill: '#b91c1c' }}
              isAnimationActive
              animationDuration={900}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Admin-only: who booked how much */}
      {isAdmin && (
        <div className="mt-5 border-t border-gray-100 pt-4">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Bookings by member
          </h3>
          <div className="flex flex-col gap-3">
            {members.map((m) => (
              <div key={m.name} className="flex items-center gap-3">
                <span className="w-28 shrink-0 truncate text-sm font-medium text-gray-700">
                  {m.name}
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(m.count / memberTotal) * 100}%`,
                      backgroundColor: m.color,
                    }}
                  />
                </div>
                <span className="w-8 shrink-0 text-right text-sm font-semibold text-gray-800">
                  {m.count}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
