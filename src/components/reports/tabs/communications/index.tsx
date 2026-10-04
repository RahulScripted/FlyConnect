import MiniStatsGrid from '../../shared/MiniStatsGrid'
import PiePanel from '../../shared/PiePanel'
import { useReportData } from '../../ReportDataContext'

export default function CommunicationsTab() {
  const { communicationStats, messageDelivery } = useReportData()
  return (
    <div className="flex flex-col gap-5">
      <MiniStatsGrid stats={communicationStats} cols={4} />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <PiePanel
          title="Message Delivery Status"
          subtitle="Breakdown of messages by delivery state"
          data={messageDelivery}
          totalLabel="Total Messages"
        />
      </div>
    </div>
  )
}
