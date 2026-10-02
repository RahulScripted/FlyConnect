import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plane, ChevronRight, MessageCircle } from 'lucide-react'
import { reminders } from '../../../mock/dashboard'
import type { Reminder } from '../../../mock/dashboard'

function openWhatsApp(r: Reminder) {
  const url = `https://wa.me/${r.phone}?text=${encodeURIComponent(r.message)}`
  window.open(url, '_blank', 'noopener,noreferrer')
}

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const card = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[11px] text-gray-400">{label}</span>
      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  )
}

export default function UpcomingReminders() {
  const navigate = useNavigate()

  return (
    <section className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">Upcoming Reminders</h2>
        <button
          onClick={() => navigate('/journeys')}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
        >
          View All <ChevronRight size={16} />
        </button>
      </div>

      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {reminders.map((r) => (
          <motion.div
            key={r.id}
            variants={card}
            whileHover={{ scale: 1.03, transition: { duration: 0.25 } }}
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
          >
            {/* Header strip */}
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2.5 text-white">
              <span className="text-xs font-medium">{r.date} · {r.time}</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold">
                PNR {r.pnr}
              </span>
            </div>

            <div className="p-4">
              {/* Route */}
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-xs text-gray-400">{r.depTime}</p>
                  <p className="text-2xl font-bold text-gray-900">{r.depCode}</p>
                  <p className="text-[11px] text-gray-400">{r.depCity}</p>
                </div>

                <div className="flex flex-col items-center px-2">
                  <p className="text-xs font-medium text-gray-500">{r.flightCode}</p>
                  <div className="my-1 flex items-center gap-1">
                    <span className="h-px w-6 bg-gray-200" />
                    <Plane size={14} className="text-blue-500" />
                    <span className="h-px w-6 bg-gray-200" />
                  </div>
                  <p className="text-[11px] text-gray-400">{r.duration}</p>
                </div>

                <div className="text-right">
                  <p className="text-xs text-gray-400">{r.arrTime}</p>
                  <p className="text-2xl font-bold text-gray-900">{r.arrCode}</p>
                  <p className="text-[11px] text-gray-400">{r.arrCity}</p>
                </div>
              </div>

              <div className="my-4 border-t border-dashed border-gray-200" />

              {/* Footer: passenger + send */}
              <div className="flex items-center justify-between">
                <InfoItem label="Passenger" value={r.name} />
                <button
                  onClick={() => openWhatsApp(r)}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-600 transition-colors hover:bg-emerald-100 cursor-pointer"
                >
                  <MessageCircle size={14} /> Send
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
