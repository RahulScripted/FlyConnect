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
import type { TrendPoint } from '../../../../types/reports'

type RangeOption = { id: string; label: string; data: TrendPoint[] }

type LinePanelProps = {
  title: string
  subtitle: string
  /** Static data — used when no range options are supplied */
  data?: TrendPoint[]
  color: string
  /** Unique id for the gradient fill (avoids clashes when two charts share a page) */
  gradientId: string
  /** Format a value for the tooltip */
  format?: (value: number) => string
  /** When provided, shows a range dropdown and drives the chart from the selected range */
  ranges?: RangeOption[]
  /** Id of the range selected by default */
  defaultRange?: string
}

export default function LinePanel({
  title,
  subtitle,
  data,
  color,
  gradientId,
  format = (v) => `${v}`,
  ranges,
  defaultRange,
}: LinePanelProps) {
  const [rangeId, setRangeId] = useState(defaultRange ?? ranges?.[0]?.id ?? '')
  const [open, setOpen] = useState(false)

  const activeRange = ranges?.find((r) => r.id === rangeId) ?? ranges?.[0]
  const chartData = ranges ? activeRange?.data ?? [] : data ?? []

  const maxVal = Math.max(...chartData.map((d) => d.value), 1)
  const step = Math.ceil(maxVal / 4 / 10) * 10 || 1
  const yMax = Math.ceil(maxVal / step) * step
  const ticks = Array.from({ length: yMax / step + 1 }, (_, i) => i * step)

  return (
    <section className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-gray-800">{title}</h2>
          <p className="text-xs text-gray-400">{subtitle}</p>
        </div>

        {ranges && (
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              onBlur={() => setTimeout(() => setOpen(false), 120)}
              className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 cursor-pointer"
            >
              {activeRange?.label} <ChevronDown size={14} />
            </button>
            {open && (
              <div className="absolute right-0 z-20 mt-1 w-32 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
                {ranges.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRangeId(r.id)}
                    className="block w-full px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 8, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.12} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid horizontal vertical={false} strokeDasharray="4 4" stroke="#e5e7eb" />

            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
              minTickGap={24}
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
              cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '4 4' }}
              contentStyle={{
                borderRadius: 10,
                border: '1px solid #f3f4f6',
                fontSize: 12,
                boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
              }}
              labelStyle={{ color: '#6b7280', fontWeight: 600 }}
              formatter={(v) => [format(Number(v)), '']}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2.5}
              fill={`url(#${gradientId})`}
              dot={false}
              activeDot={{ r: 4, fill: color }}
              isAnimationActive
              animationDuration={900}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
