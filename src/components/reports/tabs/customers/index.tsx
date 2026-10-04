import LinePanel from '../../shared/LinePanel'
import LeaderboardPodium, { type PodiumEntry } from '../../shared/LeaderboardPodium'
import RankRow from '../../shared/RankRow'
import { useReportData } from '../../ReportDataContext'
import { formatINR } from '../../../../utils/format'

export default function CustomersTab() {
  const { customerGrowth, topCustomers } = useReportData()
  const podium: PodiumEntry[] = topCustomers
    .slice(0, 3)
    .map((c, i) => ({ ...c, rank: (i + 1) as 1 | 2 | 3 }))

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      <LinePanel
        title="Customer Growth"
        subtitle="Total customers over time"
        data={customerGrowth}
        color="#7c3aed"
        gradientId="custGrowthFill"
        format={(v) => `${v} customers`}
      />

      <section className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-gray-800">Top Customers</h2>
          <p className="text-xs text-gray-400">Ranked by total spend</p>
        </div>

        {/* Podium — top 3 */}
        <div className="mb-6 mt-2">
          <LeaderboardPodium rankings={podium} format={formatINR} />
        </div>

        {/* Remaining ranks (4–5) — top 3 are already on the podium */}
        <div className="flex flex-col gap-2.5">
          {topCustomers.slice(3).map((c, i) => (
            <RankRow key={c.id} rank={i + 4} entry={c} format={formatINR} />
          ))}
        </div>
      </section>
    </div>
  )
}
