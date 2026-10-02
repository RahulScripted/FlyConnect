import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { ChevronRight } from 'lucide-react'
import { routeSplit } from '../../../mock/dashboard'

export default function RouteSplit() {
  const navigate = useNavigate()
  const [active, setActive] = useState<number | undefined>(undefined)

  const current = active != null ? routeSplit[active] : null

  return (
    <section className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-800">Route Split</h2>
          <p className="text-xs text-gray-400">Share of bookings by route type</p>
        </div>
        <button
          onClick={() => navigate('/bookings')}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
        >
          View All <ChevronRight size={16} />
        </button>
      </div>

      {/* Animated donut */}
      <div className="relative mx-auto mt-4 h-48 w-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={routeSplit}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={82}
              paddingAngle={3}
              cornerRadius={6}
              stroke="none"
              startAngle={90}
              endAngle={-270}
              onMouseEnter={(_, i) => setActive(i)}
              onMouseLeave={() => setActive(undefined)}
              isAnimationActive
              animationBegin={100}
              animationDuration={900}
            >
              {routeSplit.map((slice, i) => (
                <Cell
                  key={slice.name}
                  fill={slice.color}
                  opacity={active == null || active === i ? 1 : 0.4}
                  style={{ transition: 'opacity 200ms' }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center label — show count, not percentage */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">
            {current ? current.count : routeSplit.reduce((s, r) => s + r.count, 0)}
          </span>
          <span className="text-xs font-medium text-gray-400">{current ? current.name : 'Total'}</span>
        </div>
      </div>

      {/* Breakdown — name + count only */}
      <div className="mt-5 flex flex-col gap-3">
        {routeSplit.map((slice, i) => (
          <div
            key={slice.name}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(undefined)}
            className={`flex items-center justify-between rounded-lg px-2 py-2 transition-colors ${
              active === i ? 'bg-gray-50' : ''
            }`}
          >
            <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <span className="h-6.5 w-1.5" style={{ backgroundColor: slice.color }} />
              {slice.name}
            </span>
            <span className="text-sm text-gray-800">{slice.count} bookings</span>
          </div>
        ))}
      </div>
    </section>
  )
}
