import { useState } from 'react'
import { Tooltip, Empty } from 'antd'
import { X, Phone, Mail, Calendar, MessageCircle, Plane, NotebookPen } from 'lucide-react'
import Avatar from '../shared/Avatar'
import StatusPill from '../shared/StatusPill'
import type { Customer, CustomerBooking } from '../../../types/customer'

type CustomerDetailProps = {
  customer: Customer
  onClose: () => void
  onAddNote: (text: string) => void
  /** When true, drops the outer card chrome (used inside a modal sheet) */
  bare?: boolean
}

const TABS = ['Overview', 'Bookings', 'Messages', 'Notes'] as const
type Tab = (typeof TABS)[number]

const bookingStatusStyles: Record<CustomerBooking['status'], string> = {
  Confirmed: 'bg-emerald-50 text-emerald-600',
  Upcoming: 'bg-blue-50 text-blue-600',
  Completed: 'bg-gray-100 text-gray-600',
  Cancelled: 'bg-rose-50 text-rose-600',
}

export default function CustomerDetail({ customer, onClose, onAddNote, bare }: CustomerDetailProps) {
  const [tab, setTab] = useState<Tab>('Overview')

  return (
    <aside
      className={`flex flex-col bg-white p-5 ${
        bare ? '' : 'h-[560px] rounded-2xl border border-gray-100 shadow-sm'
      }`}
    >
      {/* Desktop-only: close button pinned to the top, above the name */}
      {!bare && (
        <div className="mb-2 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
            aria-label="Close detail"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar initials={customer.initials} size="h-12 w-12 text-base" />
          <div>
            <h2 className="text-lg font-bold text-gray-900">{customer.name}</h2>
            <p className="text-xs text-gray-400">Member since {customer.memberSince}</p>
          </div>
        </div>
        <StatusPill status={customer.status} />
      </div>

      {/* Tabs */}
      <div className="mt-5 flex border-b border-gray-100">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 border-b-2 px-1 py-2 text-sm font-medium transition-colors cursor-pointer ${
              tab === t
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab content — scrolls when content overflows, scrollbar hidden */}
      <div className="no-scrollbar mt-5 flex-1 overflow-y-auto">
        {tab === 'Overview' && <OverviewTab customer={customer} />}
        {tab === 'Bookings' && <BookingsTab customer={customer} />}
        {tab === 'Messages' && <MessagesTab customer={customer} />}
        {tab === 'Notes' && <NotesTab customer={customer} onAddNote={onAddNote} />}
      </div>
    </aside>
  )
}

function NotesTab({
  customer,
  onAddNote,
}: {
  customer: Customer
  onAddNote: (text: string) => void
}) {
  const [adding, setAdding] = useState(false)
  const [text, setText] = useState('')

  const notes = customer.notes

  const save = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onAddNote(trimmed)
    setText('')
    setAdding(false)
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Header row: label + icon-based add button */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">Notes</h3>
        <Tooltip title="Add note">
          <button
            onClick={() => setAdding((v) => !v)}
            aria-label="Add note"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
          >
            <NotebookPen size={16} />
          </button>
        </Tooltip>
      </div>

      {adding && (
        <div className="flex flex-col gap-2 rounded-xl border border-gray-200 p-3">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
            rows={3}
            placeholder="Write a note..."
            className="w-full resize-none rounded-lg border border-gray-200 p-2 text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                setAdding(false)
                setText('')
              }}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={save}
              disabled={!text.trim()}
              className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
            >
              Save Note
            </button>
          </div>
        </div>
      )}

      {notes.length === 0 ? (
        <EmptyState text="No notes yet." />
      ) : (
        notes.map((n) => (
          <div key={n.id} className="rounded-xl bg-gray-50 px-4 py-3">
            <p className="text-sm text-gray-800">{n.text}</p>
            <p className="mt-1 text-xs text-gray-400">{n.author} · {n.at}</p>
          </div>
        ))
      )}
    </div>
  )
}

function OverviewTab({ customer }: { customer: Customer }) {
  return (
    <div className="flex flex-col gap-5">
      {/* Contact */}
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-center gap-3 text-gray-700">
          <Phone size={16} className="text-gray-400" /> {customer.phone}
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <Mail size={16} className="text-gray-400" /> {customer.email}
        </div>
        <div className="flex items-center gap-3 text-gray-700">
          <Calendar size={16} className="text-gray-400" /> Joined {customer.memberSince}
        </div>
      </div>

      {/* Metric tiles */}
      <div className="grid grid-cols-2 gap-3">
        <Tile label="Total Bookings" value={`${customer.totalBookings}`} accent="text-gray-900" />
        <Tile label="Total Spent" value={customer.totalSpent} accent="text-emerald-600" />
        <Tile label="Upcoming Trips" value={`${customer.upcomingTrips}`} accent="text-gray-900" />
        <Tile label="WhatsApp Messages" value={`${customer.whatsappMessages}`} accent="text-gray-900" />
      </div>

      {/* Latest journey */}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-gray-800">Latest Journey</h3>
        <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Plane size={16} />
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-800">{customer.lastJourney.route}</p>
              <p className="text-xs text-gray-400">
                {customer.lastJourney.flight} · {customer.lastJourney.date}
              </p>
            </div>
          </div>
          <StatusPill status={customer.status} />
        </div>
      </div>
    </div>
  )
}

function Tile({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="rounded-xl bg-gray-50 px-4 py-3">
      <p className={`text-xl font-bold ${accent}`}>{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  )
}

function BookingsTab({ customer }: { customer: Customer }) {
  if (customer.bookings.length === 0) {
    return <EmptyState text="No bookings yet." />
  }
  return (
    <div className="flex flex-col gap-2.5">
      {customer.bookings.map((b) => (
        <div key={b.id} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <Plane size={16} />
            </span>
            <div>
              <p className="text-sm font-semibold text-gray-800">{b.route}</p>
              <p className="text-xs text-gray-400">{b.flight} · {b.date}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="text-sm font-semibold text-gray-900">{b.amount}</span>
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${bookingStatusStyles[b.status]}`}>
              {b.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

function MessagesTab({ customer }: { customer: Customer }) {
  if (customer.messages.length === 0) {
    return <EmptyState text="No messages yet." />
  }
  return (
    <div className="flex flex-col gap-3">
      {customer.messages.map((m) => (
        <div
          key={m.id}
          className={`flex flex-col gap-1 rounded-xl px-4 py-2.5 text-sm ${
            m.direction === 'sent'
              ? 'ml-6 bg-blue-50 text-gray-800'
              : 'mr-6 bg-gray-50 text-gray-800'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <MessageCircle size={13} className="text-gray-400" />
            {m.text}
          </span>
          <span className="text-[11px] text-gray-400">
            {m.at} · {m.state}
          </span>
        </div>
      ))}
    </div>
  )
}

function EmptyState({ text }: { text: string }) {
  return (
    <Empty
      description={text}
      image={Empty.PRESENTED_IMAGE_DEFAULT}
      className="!mt-10 !flex-col !items-center !justify-center"
    />
  )
}
