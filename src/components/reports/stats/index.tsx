import NotchedStatCard from '../../dashboard/stats/NotchedStatCard'
import { useReportData } from '../ReportDataContext'

export default function ReportStats() {
  const { stats } = useReportData()
  return (
    <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {stats.map((card) => (
        <NotchedStatCard
          key={card.id}
          label={card.label}
          value={card.value}
          icon={card.icon}
          iconBg={card.iconBg}
          iconColor={card.iconColor}
          tint={card.tint}
          trend={card.trend}
          allClear={card.allClear}
        />
      ))}
    </section>
  )
}
