import type { RecentBooking } from '../../../../types/reports'

const statusStyles: Record<RecentBooking['status'], string> = {
  Confirmed: 'bg-emerald-50 text-emerald-600',
  Pending: 'bg-amber-50 text-amber-600',
  Cancelled: 'bg-rose-50 text-rose-600',
}

export default function RecentBookings({ bookings }: { bookings: RecentBooking[] }) {
  return (
    <section className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-base font-semibold text-gray-800">Recent Bookings</h2>
        <p className="text-xs text-gray-400">Latest bookings in the selected range</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse text-sm">
          <thead>
            <tr className="text-left text-xs font-medium uppercase tracking-wide text-gray-400">
              <th className="px-2 pb-3">Customer</th>
              <th className="px-2 pb-3">Route</th>
              <th className="px-2 pb-3">Source</th>
              <th className="px-2 pb-3">Amount</th>
              <th className="px-2 pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bookings.map((b) => (
              <tr key={b.id} className="text-gray-700 transition-colors hover:bg-gray-50/60">
                <td className="px-2 py-3 font-medium text-gray-800">{b.customer}</td>
                <td className="px-2 py-3 text-gray-500">{b.route}</td>
                <td className="px-2 py-3 text-gray-500">{b.source}</td>
                <td className="px-2 py-3 font-medium">{b.amount}</td>
                <td className="px-2 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[b.status]}`}>
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
