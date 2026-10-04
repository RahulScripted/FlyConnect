import PiePanel from '../../shared/PiePanel'
import LinePanel from '../../shared/LinePanel'
import { revenueRangeLabels } from '../../../../mock/reports'
import { useReportData } from '../../ReportDataContext'
import { formatINR } from '../../../../utils/format'
import type { TrendRange } from '../../../../types/reports'

const REVENUE_RANGES: TrendRange[] = ['1m', '3m', '6m', '1y']

export default function OverviewTab() {
  const { bookingTrend, bookingBySource, revenueByRange, expenseBreakdown, topRoutes } = useReportData()
  return (
    <div className="flex flex-col gap-5">
      {/* Group 1: Booking Trend + Booking by Source */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <LinePanel
          title="Booking Trend"
          subtitle="Monthly bookings over time"
          data={bookingTrend}
          color="#2563eb"
          gradientId="ovBookingFill"
          format={(v) => `${v} bookings`}
        />
        <PiePanel
          title="Booking by Source"
          subtitle="Where your bookings come from"
          data={bookingBySource}
          totalLabel="Total Bookings"
        />
      </div>

      {/* Group 2: Revenue Trend + Expense Breakdown + Top Routes */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        <LinePanel
          title="Revenue Trend"
          subtitle="Monthly revenue over time"
          color="#10b981"
          gradientId="ovRevenueFill"
          format={(v) => formatINR(v * 1000)}
          ranges={REVENUE_RANGES.map((id) => ({
            id,
            label: revenueRangeLabels[id],
            data: revenueByRange[id],
          }))}
          defaultRange="6m"
        />
        <PiePanel
          title="Expense Breakdown"
          subtitle="Spend distribution by category"
          data={expenseBreakdown}
          totalLabel="Total Spend"
          format={formatINR}
        />
        <PiePanel
          title="Top Routes"
          subtitle="Most booked routes in range"
          data={topRoutes}
          totalLabel="Total Bookings"
        />
      </div>
    </div>
  )
}
