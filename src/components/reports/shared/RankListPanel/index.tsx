import { useMemo, useState } from 'react'
import Pagination from '../../../dashboard/journeys/Pagination'
import type { PieSlice } from '../../../../types/reports'

type RankListPanelProps = {
  title: string
  subtitle: string
  /** Items are rendered in the order given (already ranked) */
  data: PieSlice[]
  /** Format the value shown on the right */
  format?: (value: number) => string
  /** Suffix appended after the formatted value (e.g. "bookings") */
  unit?: string
  /** Rows per page; when set, the list paginates through all items */
  pageSize?: number
}

export default function RankListPanel({
  title,
  subtitle,
  data,
  format = (v) => v.toLocaleString(),
  unit,
  pageSize,
}: RankListPanelProps) {
  const [page, setPage] = useState(1)

  const max = Math.max(...data.map((d) => d.value), 1)
  const size = pageSize ?? data.length
  const totalPages = Math.ceil(data.length / size)

  const rows = useMemo(
    () => data.slice((page - 1) * size, page * size),
    [data, page, size],
  )

  return (
    <section className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-800">{title}</h2>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>

      <div className="flex flex-col gap-3">
        {rows.map((item, i) => {
          // Continue the rank number across pages
          const rank = (page - 1) * size + i + 1
          return (
            <div key={item.name} className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600">
                {rank}
              </span>

              <div className="min-w-0 flex-1">
                <div className="mb-1 flex items-center justify-between">
                  <span className="truncate text-sm font-medium text-gray-800">{item.name}</span>
                  <span className="shrink-0 text-sm font-semibold text-gray-900">
                    {format(item.value)}
                    {unit ? ` ${unit}` : ''}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${(item.value / max) * 100}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      )}
    </section>
  )
}
