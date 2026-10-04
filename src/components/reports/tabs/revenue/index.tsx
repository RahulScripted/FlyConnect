import LinePanel from '../../shared/LinePanel'
import PiePanel from '../../shared/PiePanel'
import { revenueRangeLabels } from '../../../../mock/reports'
import { useReportData } from '../../ReportDataContext'
import { formatINR } from '../../../../utils/format'
import type { TrendRange } from '../../../../types/reports'

const REVENUE_RANGES: TrendRange[] = ['1m', '3m', '6m', '1y']

export default function RevenueTab() {
  const { revenueByRange, revenueMonthlyBreakdown } = useReportData()
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      <LinePanel
        title="Revenue Trend"
        subtitle="Monthly revenue over time"
        color="#10b981"
        gradientId="revRevenueFill"
        format={(v) => formatINR(v * 1000)}
        ranges={REVENUE_RANGES.map((id) => ({
          id,
          label: revenueRangeLabels[id],
          data: revenueByRange[id],
        }))}
        defaultRange="6m"
      />
      <PiePanel
        title="Monthly Breakdown"
        subtitle="Revenue distribution by period"
        data={revenueMonthlyBreakdown}
        totalLabel="Total Revenue"
        format={formatINR}
      />
    </div>
  )
}
