import { useMemo, useState } from 'react'
import { Search, Pencil, Trash2 } from 'lucide-react'
import Avatar from '../shared/Avatar'
import StatusPill from '../shared/StatusPill'
import Tooltip from '../shared/Tooltip'
import Pagination from '../../dashboard/journeys/Pagination'
import type { Customer, CustomerStatus } from '../../../types/customer'

const PAGE_SIZE = 6

type CustomerListProps = {
  customers: Customer[]
  selectedId: string
  onSelect: (id: string) => void
  onEdit: (customer: Customer) => void
  onDelete: (id: string) => void
}

type StatusFilter = 'all' | CustomerStatus

export default function CustomerList({
  customers,
  selectedId,
  onSelect,
  onEdit,
  onDelete,
}: CustomerListProps) {
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return customers.filter((c) => {
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q)
      const matchesStatus = status === 'all' || c.status === status
      return matchesQuery && matchesStatus
    })
  }, [customers, query, status])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  // Clamp during render so a shrinking result set never leaves us on an empty page
  const currentPage = Math.min(page, totalPages)

  const rows = useMemo(
    () => filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [filtered, currentPage],
  )

  const reset = () => {
    setQuery('')
    setStatus('all')
    setPage(1)
  }

  return (
    <section className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search customers..."
            className="h-10 w-full rounded-[10px] border border-gray-200 pl-9 pr-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-400"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusFilter)}
          className="h-10 rounded-[10px] border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:border-blue-400 cursor-pointer"
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          onClick={reset}
          className="h-10 rounded-[10px] border border-gray-200 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 cursor-pointer"
        >
          Reset
        </button>
      </div>

      {/* Fixed-height content area keeps the card height stable across pages */}
      <div className="min-h-[408px]">
      {/* Desktop/tablet table */}
      <div className="hidden sm:block">
        <table className="w-full table-fixed border-collapse text-sm">
          <thead>
            <tr className="text-left text-xs font-medium uppercase tracking-wide text-gray-400">
              <th className="truncate px-2 pb-3 w-[28%]">Customer</th>
              <th className="truncate px-2 pb-3 w-[26%]">Contact</th>
              <th className="truncate px-2 pb-3 w-[9%] text-center">Trips</th>
              <th className="truncate px-2 pb-3 w-[15%]">Journey</th>
              <th className="truncate px-2 pb-3 w-[13%]">Status</th>
              <th className="truncate px-2 pb-3 w-[9%] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((c) => (
              <tr
                key={c.id}
                onClick={() => onSelect(c.id)}
                className={`cursor-pointer text-gray-700 transition-colors hover:bg-gray-50/60 ${
                  selectedId === c.id ? 'bg-blue-50/50' : ''
                }`}
              >
                <td className="px-2 py-3">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <Avatar initials={c.initials} />
                    <span className="truncate font-medium text-gray-800">{c.name}</span>
                  </div>
                </td>
                <td className="px-2 py-3">
                  <p className="truncate text-gray-700">{c.phone}</p>
                  <p className="truncate text-xs text-gray-400">{c.email}</p>
                </td>
                <td className="px-2 py-3 text-center">{c.totalBookings}</td>
                <td className="px-2 py-3">
                  <p className="truncate text-gray-700">{c.lastJourney.date}</p>
                  <p className="truncate text-xs text-gray-400">{c.lastJourney.route}</p>
                </td>
                <td className="px-2 py-3">
                  <StatusPill status={c.status} />
                </td>
                <td className="px-2 py-3">
                  <div className="flex items-center justify-end gap-0.5">
                    <Tooltip label="Edit">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onEdit(c)
                        }}
                        aria-label={`Edit ${c.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
                      >
                        <Pencil size={14} />
                      </button>
                    </Tooltip>
                    <Tooltip label="Delete">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onDelete(c.id)
                        }}
                        aria-label={`Delete ${c.name}`}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={6} className="px-2 py-10 text-center text-sm text-gray-400">
                  No customers match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile card view */}
      <div className="flex flex-col gap-3 sm:hidden">
        {rows.map((c) => (
          <div
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`cursor-pointer rounded-2xl border p-4 transition-colors ${
              selectedId === c.id ? 'border-blue-200 bg-blue-50/50' : 'border-gray-100 bg-white'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar initials={c.initials} />
                <div className="min-w-0">
                  <p className="truncate font-semibold text-gray-800">{c.name}</p>
                  <p className="truncate text-xs text-gray-400">{c.email}</p>
                </div>
              </div>
              <StatusPill status={c.status} />
            </div>

            <div className="mt-3 flex flex-col divide-y divide-gray-100 border-y border-gray-100 text-sm">
              <Row label="Phone" value={c.phone} />
              <Row label="Total Bookings" value={`${c.totalBookings}`} />
              <Row label="Last Journey" value={`${c.lastJourney.date} | ${c.lastJourney.route}`} />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit(c)
                }}
                aria-label={`Edit ${c.name}`}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-blue-50 py-2 text-sm font-medium text-blue-600 cursor-pointer"
              >
                <Pencil size={15} /> Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onDelete(c.id)
                }}
                aria-label={`Delete ${c.name}`}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-rose-50 py-2 text-sm font-medium text-rose-600 cursor-pointer"
              >
                <Trash2 size={15} /> Delete
              </button>
            </div>
          </div>
        ))}

        {rows.length === 0 && (
          <p className="py-10 text-center text-sm text-gray-400">No customers match your filters.</p>
        )}
      </div>
      </div>

      {/* Pagination */}
      <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
    </section>
  )
}

/** Label–value row used in the mobile card (label muted/medium, value right-aligned). */
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <span className="font-medium text-gray-500">{label}</span>
      <span className="text-right text-gray-800">{value}</span>
    </div>
  )
}
