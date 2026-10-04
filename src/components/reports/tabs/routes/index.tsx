import TopRoutesPanel from '../../shared/TopRoutesPanel'
import RankListPanel from '../../shared/RankListPanel'
import { useReportData } from '../../ReportDataContext'

export default function RoutesTab() {
  const { allRoutes } = useReportData()
  return (
    <>
      {/* Mobile: podium layout with paginated list below */}
      <div className="sm:hidden">
        <TopRoutesPanel
          title="Top Routes"
          subtitle="Most booked routes in range"
          data={allRoutes}
          unit="bookings"
          pageSize={4}
        />
      </div>

      {/* Desktop/tablet: full-width ranked bar list, paginated */}
      <div className="hidden sm:block">
        <RankListPanel
          title="Top Routes"
          subtitle="Most booked routes in range"
          data={allRoutes}
          unit="bookings"
          pageSize={6}
        />
      </div>
    </>
  )
}
