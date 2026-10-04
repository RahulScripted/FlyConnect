import AirlinePiePanel from '../../shared/AirlinePiePanel'
import { useReportData } from '../../ReportDataContext'
import { formatINR } from '../../../../utils/format'

export default function AirlinesTab() {
  const { airlinesByBooking, airlineRevenue } = useReportData()
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      <AirlinePiePanel
        title="Airlines by Booking"
        subtitle="Bookings share by airline"
        data={airlinesByBooking}
        totalLabel="Total Bookings"
      />
      <AirlinePiePanel
        title="Airline Revenue"
        subtitle="Revenue contribution by airline"
        data={airlineRevenue}
        totalLabel="Total Revenue"
        format={formatINR}
      />
    </div>
  )
}
