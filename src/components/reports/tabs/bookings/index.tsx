import MiniStatsGrid from '../../shared/MiniStatsGrid'
import PiePanel from '../../shared/PiePanel'
import RecentBookings from '../../shared/RecentBookings'
import { useReportData } from '../../ReportDataContext'

export default function BookingsTab() {
  const { bookingStatusStats, bookingBySource, recentBookings } = useReportData()
  return (
    <div className="flex flex-col gap-5">
      <MiniStatsGrid stats={bookingStatusStats} />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_1.4fr]">
        <PiePanel
          title="Booking by Source"
          subtitle="Where your bookings come from"
          data={bookingBySource}
          totalLabel="Total Bookings"
        />
        <RecentBookings bookings={recentBookings} />
      </div>
    </div>
  )
}
