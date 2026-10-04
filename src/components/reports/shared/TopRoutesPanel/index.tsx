import { useMemo, useState } from 'react'
import { Crown, Plane } from 'lucide-react'
import Pagination from '../../../dashboard/journeys/Pagination'
import type { PieSlice } from '../../../../types/reports'

type TopRoutesPanelProps = {
  title: string
  subtitle: string
  /** Already ranked, highest first */
  data: PieSlice[]
  unit?: string
  /** Rows per page for the list below the podium (ranks 4+) */
  pageSize?: number
}

const PODIUM_CONFIG = {
  1: { color: 'text-amber-500', block: 'bg-amber-200', disc: 'bg-amber-100', height: 'h-28' },
  2: { color: 'text-gray-400', block: 'bg-gray-200', disc: 'bg-gray-100', height: 'h-20' },
  3: { color: 'text-orange-500', block: 'bg-orange-200', disc: 'bg-orange-100', height: 'h-16' },
} as const

export default function TopRoutesPanel({
  title,
  subtitle,
  data,
  unit = 'bookings',
  pageSize = 4,
}: TopRoutesPanelProps) {
  const [page, setPage] = useState(1)

  const { top3, rest } = useMemo(() => {
    const ranked = data.map((d, i) => ({ ...d, rank: i + 1 }))
    return { top3: ranked.slice(0, 3), rest: ranked.slice(3) }
  }, [data])

  const totalPages = Math.ceil(rest.length / pageSize)
  const rows = rest.slice((page - 1) * pageSize, page * pageSize)

  // Reorder podium for display: 2nd, 1st, 3rd
  const podiumOrder = [
    top3.find((r) => r.rank === 2),
    top3.find((r) => r.rank === 1),
    top3.find((r) => r.rank === 3),
  ].filter(Boolean) as (PieSlice & { rank: number })[]

  return (
    <section className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>

      {/* Podium — top 3 (unchanged) */}
      <div className="mb-6 mt-2 flex items-end justify-center gap-4" role="list">
        {podiumOrder.map((r) => {
          const config = PODIUM_CONFIG[r.rank as 1 | 2 | 3]
          return (
            <div key={r.name} role="listitem" className="flex flex-col items-center">
              {/* Route disc with crown badge */}
              <div className="relative mb-2">
                <span
                  className={`flex items-center justify-center rounded-full ring-2 ring-white ${config.disc} ${
                    r.rank === 1 ? 'h-16 w-16' : 'h-12 w-12'
                  }`}
                  style={{ color: r.color }}
                >
                  <Plane className={r.rank === 1 ? 'h-6 w-6' : 'h-5 w-5'} />
                </span>
                <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm">
                  <Crown className={`h-3.5 w-3.5 ${config.color}`} />
                </div>
              </div>

              {/* Name + value */}
              <span className="max-w-24 truncate text-center text-sm font-medium text-gray-800" title={r.name}>
                {r.name}
              </span>
              <span className="text-xs tabular-nums text-gray-400">
                {r.value} {unit}
              </span>

              {/* Podium block */}
              <div className={`mt-2 w-20 rounded-t-lg ${config.height} ${config.block}`}>
                <div className={`flex h-8 items-center justify-center text-lg font-bold ${config.color}`}>
                  {r.rank}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Remaining ranks (4+) with pagination */}
      <div className="flex flex-col gap-2.5">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2.5">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600">
              {r.rank}
            </span>
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100"
              style={{ color: r.color }}
            >
              <Plane className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-800">{r.name}</span>
            <span className="shrink-0 text-sm font-semibold text-gray-900">
              {r.value} {unit}
            </span>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      )}
    </section>
  )
}
