import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MoreHorizontal, ChevronRight, Eye, MessageCircle, Trash2, Plane } from 'lucide-react'
import { journeys } from '../../../mock/dashboard'
import type { Journey } from '../../../mock/dashboard'
import Pagination from './Pagination'

const PAGE_SIZE = 5

const statusStyles: Record<Journey['status'], string> = {
  Today: 'bg-blue-50 text-blue-600',
  Upcoming: 'bg-violet-50 text-violet-600',
  Completed: 'bg-emerald-50 text-emerald-600',
}

const waStyles: Record<Journey['whatsapp'], string> = {
  Scheduled: 'bg-sky-50 text-sky-600',
  Sent: 'bg-emerald-50 text-emerald-600',
  Pending: 'bg-amber-50 text-amber-600',
}

function RowActions() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
        aria-label="Row actions"
      >
        <MoreHorizontal size={16} />
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-1 w-40 overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg">
          <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
            <Eye size={14} /> View
          </button>
          <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer">
            <MessageCircle size={14} /> Send message
          </button>
          <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-rose-500 hover:bg-rose-50 cursor-pointer">
            <Trash2 size={14} /> Cancel
          </button>
        </div>
      )}
    </div>
  )
}

export default function TodaysJourneys() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(journeys.length / PAGE_SIZE)
  const rows = useMemo(
    () => journeys.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [page],
  )

  return (
    <section className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">Today's Journeys</h2>
        <button
          onClick={() => navigate('/bookings')}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
        >
          View All <ChevronRight size={16} />
        </button>
      </div>

      {/* min-height on the rows area keeps pagination position stable even when
          a page has fewer rows than PAGE_SIZE */}
      <div className="flex flex-1 flex-col">
        <div className="min-h-[300px]">
        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[680px] border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs font-medium uppercase tracking-wide text-gray-400">
                <th className="px-2 pb-3">Customer</th>
                <th className="px-2 pb-3">PNR</th>
                <th className="px-2 pb-3">Flight</th>
                <th className="px-2 pb-3">Route</th>
                <th className="px-2 pb-3">Departure</th>
                <th className="px-2 pb-3">Status</th>
                <th className="px-2 pb-3">WhatsApp</th>
                <th className="px-2 pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((j) => (
                <tr key={j.id} className="text-gray-700 transition-colors hover:bg-gray-50/60">
                  <td className="px-2 py-3 font-medium text-gray-800">{j.customer}</td>
                  <td className="px-2 py-3 text-gray-500">{j.pnr}</td>
                  <td className="px-2 py-3">{j.flight}</td>
                  <td className="px-2 py-3 text-gray-500">{j.route}</td>
                  <td className="px-2 py-3">{j.departure}</td>
                  <td className="px-2 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[j.status]}`}>
                      {j.status}
                    </span>
                  </td>
                  <td className="px-2 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${waStyles[j.whatsapp]}`}>
                      {j.whatsapp}
                    </span>
                  </td>
                  <td className="px-2 py-3 text-right">
                    <RowActions />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards — same design as Upcoming Reminders */}
        <div className="flex flex-col gap-4 md:hidden">
          {rows.map((j) => (
            <div
              key={j.id}
              className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
            >
              {/* Header strip */}
              <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2.5 text-white">
                <span className="text-xs font-medium">{j.departure}</span>
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold">
                  PNR {j.pnr}
                </span>
              </div>

              <div className="p-4">
                {/* Route */}
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-xs text-gray-400">{j.depTime}</p>
                    <p className="text-2xl font-bold text-gray-900">{j.depCode}</p>
                    <p className="text-[11px] text-gray-400">{j.depCity}</p>
                  </div>

                  <div className="flex flex-col items-center px-2">
                    <p className="text-xs font-medium text-gray-500">{j.flight}</p>
                    <div className="my-1 flex items-center gap-1">
                      <span className="h-px w-6 bg-gray-200" />
                      <Plane size={14} className="text-blue-500" />
                      <span className="h-px w-6 bg-gray-200" />
                    </div>
                    <p className="text-[11px] text-gray-400">{j.duration}</p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-400">{j.arrTime}</p>
                    <p className="text-2xl font-bold text-gray-900">{j.arrCode}</p>
                    <p className="text-[11px] text-gray-400">{j.arrCity}</p>
                  </div>
                </div>

                <div className="my-4 border-t border-dashed border-gray-200" />

                {/* Passenger + status */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-gray-400">Passenger</span>
                    <span className="text-sm font-semibold text-gray-800">{j.customer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[j.status]}`}>
                      {j.status}
                    </span>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${waStyles[j.whatsapp]}`}>
                      {j.whatsapp}
                    </span>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-gray-100 pt-3">
                  <button className="flex items-center justify-center gap-1.5 rounded-lg bg-gray-50 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 cursor-pointer">
                    <Eye size={14} /> View
                  </button>
                  <button className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-50 py-2 text-xs font-medium text-emerald-600 hover:bg-emerald-100 cursor-pointer">
                    <MessageCircle size={14} /> Send
                  </button>
                  <button className="flex items-center justify-center gap-1.5 rounded-lg bg-rose-50 py-2 text-xs font-medium text-rose-500 hover:bg-rose-100 cursor-pointer">
                    <Trash2 size={14} /> Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        </div>

        {/* Pagination pinned to the bottom */}
        <div className="mt-auto pt-4">
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>
    </section>
  )
}
