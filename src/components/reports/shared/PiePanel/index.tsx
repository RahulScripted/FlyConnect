import { useState } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'
import type { PieSlice } from '../../../../types/reports'

type PiePanelProps = {
  title: string
  subtitle: string
  data: PieSlice[]
  /** Center + legend label for the aggregate value */
  totalLabel?: string
  /** Format a slice value for display (defaults to the raw number) */
  format?: (value: number) => string
}

export default function PiePanel({
  title,
  subtitle,
  data,
  totalLabel = 'Total',
  format = (v) => `${v}`,
}: PiePanelProps) {
  const [active, setActive] = useState<number | undefined>(undefined)

  const total = data.reduce((s, d) => s + d.value, 0)
  const current = active != null ? data[active] : null

  return (
    <section className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>

      {/* Animated donut */}
      <div className="relative mx-auto mt-4 h-48 w-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
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
              {data.map((slice, i) => (
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

        {/* Center label */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold text-gray-800">
            {format(current ? current.value : total)}
          </span>
          <span className="text-xs font-medium text-gray-400">
            {current ? current.name : totalLabel}
          </span>
        </div>
      </div>

      {/* Breakdown */}
      <div className="mt-5 flex flex-col gap-2.5">
        {data.map((slice, i) => (
          <div
            key={slice.name}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(undefined)}
            className={`flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors ${
              active === i ? 'bg-gray-50' : ''
            }`}
          >
            <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <span className="h-6.5 w-1.5" style={{ backgroundColor: slice.color }} />
              {slice.name}
            </span>
            <span className="text-sm text-gray-800">{format(slice.value)}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
