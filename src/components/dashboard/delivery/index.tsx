import { useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import { messageDelivery } from '../../../mock/dashboard'

export default function MessageDeliveryStatus() {
  const [active, setActive] = useState<number | undefined>(undefined)

  const total = messageDelivery.reduce((s, d) => s + d.value, 0)
  const current = active != null ? messageDelivery[active] : null

  // recharts needs at least one non-zero slice to render the ring
  const hasData = total > 0
  const chartData = hasData ? messageDelivery : [{ name: 'None', value: 1, color: '#e5e7eb' }]

  return (
    <section className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-800">Message Delivery Status</h2>
          <p className="text-xs text-gray-400">Breakdown of messages by delivery state</p>
        </div>
      </div>

      {/* Animated donut */}
      <div className="relative mx-auto mt-4 h-48 w-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
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
              onMouseEnter={(_, i) => hasData && setActive(i)}
              onMouseLeave={() => setActive(undefined)}
              isAnimationActive
              animationBegin={100}
              animationDuration={900}
            >
              {chartData.map((slice, i) => (
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

        {/* Center label — show count, swap to hovered slice */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">
            {current ? current.value : total}
          </span>
          <span className="text-xs font-medium text-gray-400">
            {current ? current.name : 'Total Messages'}
          </span>
        </div>
      </div>

      {/* Breakdown — name + count */}
      <div className="mt-5 flex flex-col gap-3">
        {messageDelivery.map((slice, i) => (
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
            <span className="text-sm text-gray-800">{slice.value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
