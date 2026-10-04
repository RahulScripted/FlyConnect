import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'antd'
import { Plus, Eye, Ban, CheckCircle2, Trash2 } from 'lucide-react'
import AddMemberModal from '../add'
import { formatINR } from '../../../utils/format'
import type { Member } from '../../../types/member'

type MemberListProps = {
  members: Member[]
  onAdd: (member: Member) => void
  onDelete: (id: string) => void
  onToggleBlock: (id: string) => void
}

export default function MemberList({ members, onAdd, onDelete, onToggleBlock }: MemberListProps) {
  const navigate = useNavigate()
  const [adding, setAdding] = useState(false)

  // Admin row itself isn't a "managed member"
  const team = members.filter((m) => m.role === 'member')

  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-3xl font-extrabold tracking-tight text-gray-900">
             Admin
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Review member performance and manage your team.
          </p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-[10px] bg-blue-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 cursor-pointer"
        >
          <Plus size={16} /> Add Member
        </button>
      </header>

      <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        {/* Desktop table */}
        <div className="hidden overflow-x-auto sm:block">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="text-left text-xs font-medium uppercase tracking-wide text-gray-400">
                <th className="px-2 pb-3">Member</th>
                <th className="px-2 pb-3">Bookings</th>
                <th className="px-2 pb-3">Revenue</th>
                <th className="px-2 pb-3">Customers</th>
                <th className="px-2 pb-3">Status</th>
                <th className="px-2 pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {team.map((m) => (
                <tr
                  key={m.id}
                  onClick={() => navigate(`/admin/${m.id}`)}
                  className="cursor-pointer text-gray-700 transition-colors hover:bg-gray-50/60"
                >
                  <td className="px-2 py-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white"
                        style={{ backgroundColor: m.color }}
                      >
                        {m.initials}
                      </span>
                      <div>
                        <p className="font-medium text-gray-800">{m.name}</p>
                        <p className="text-xs text-gray-400">{m.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-3">{m.totalBookings}</td>
                  <td className="px-2 py-3">{formatINR(m.totalRevenue)}</td>
                  <td className="px-2 py-3">{m.totalCustomers}</td>
                  <td className="px-2 py-3">
                    <StatusBadge blocked={m.status === 'blocked'} />
                  </td>
                  <td className="px-2 py-3">
                    <RowActions
                      member={m}
                      onView={() => navigate(`/admin/${m.id}`)}
                      onToggleBlock={() => onToggleBlock(m.id)}
                      onDelete={() => onDelete(m.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="flex flex-col gap-3 sm:hidden">
          {team.map((m) => (
            <div
              key={m.id}
              onClick={() => navigate(`/admin/${m.id}`)}
              className="cursor-pointer rounded-2xl border border-gray-100 p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: m.color }}
                  >
                    {m.initials}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-800">{m.name}</p>
                    <p className="text-xs text-gray-400">{m.email}</p>
                  </div>
                </div>
                <StatusBadge blocked={m.status === 'blocked'} />
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 border-t border-gray-100 pt-3 text-center text-xs">
                <div>
                  <p className="font-semibold text-gray-800">{m.totalBookings}</p>
                  <p className="text-gray-400">Bookings</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{formatINR(m.totalRevenue)}</p>
                  <p className="text-gray-400">Revenue</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{m.totalCustomers}</p>
                  <p className="text-gray-400">Customers</p>
                </div>
              </div>
              <div
                className="mt-3 flex justify-end gap-1 border-t border-gray-100 pt-3"
                onClick={(e) => e.stopPropagation()}
              >
                <RowActions
                  member={m}
                  onView={() => navigate(`/admin/${m.id}`)}
                  onToggleBlock={() => onToggleBlock(m.id)}
                  onDelete={() => onDelete(m.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {adding && (
          <AddMemberModal
            onClose={() => setAdding(false)}
            onAdd={(m) => {
              onAdd(m)
              setAdding(false)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function StatusBadge({ blocked }: { blocked: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
        blocked ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${blocked ? 'bg-rose-500' : 'bg-emerald-500'}`} />
      {blocked ? 'Blocked' : 'Active'}
    </span>
  )
}

function RowActions({
  member,
  onView,
  onToggleBlock,
  onDelete,
}: {
  member: Member
  onView: () => void
  onToggleBlock: () => void
  onDelete: () => void
}) {
  const blocked = member.status === 'blocked'
  return (
    <div className="flex items-center justify-end gap-0.5" onClick={(e) => e.stopPropagation()}>
      <Tooltip title="View report">
        <button
          onClick={onView}
          className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-blue-50 hover:text-blue-600 cursor-pointer"
          aria-label="View report"
        >
          <Eye size={15} />
        </button>
      </Tooltip>
      <Tooltip title={blocked ? 'Unblock' : 'Block'}>
        <button
          onClick={onToggleBlock}
          className={`flex h-8 w-8 items-center justify-center rounded-md transition-colors cursor-pointer ${
            blocked
              ? 'text-gray-400 hover:bg-emerald-50 hover:text-emerald-600'
              : 'text-gray-400 hover:bg-amber-50 hover:text-amber-600'
          }`}
          aria-label={blocked ? 'Unblock member' : 'Block member'}
        >
          {blocked ? <CheckCircle2 size={15} /> : <Ban size={15} />}
        </button>
      </Tooltip>
      <Tooltip title="Delete">
        <button
          onClick={onDelete}
          className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-rose-50 hover:text-rose-600 cursor-pointer"
          aria-label="Delete member"
        >
          <Trash2 size={15} />
        </button>
      </Tooltip>
    </div>
  )
}
