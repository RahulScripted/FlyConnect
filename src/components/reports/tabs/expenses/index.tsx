import LinePanel from '../../shared/LinePanel'
import PiePanel from '../../shared/PiePanel'
import { useReportData } from '../../ReportDataContext'
import { formatINR } from '../../../../utils/format'

export default function ExpensesTab() {
  const { expenseTrend, expenseBreakdown, topExpenses } = useReportData()
  return (
    <div className="flex flex-col gap-5">
      <LinePanel
        title="Expense Trend"
        subtitle="Monthly expenses over time"
        data={expenseTrend}
        color="#ef4444"
        gradientId="expTrendFill"
        format={(v) => formatINR(v * 1000)}
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <PiePanel
          title="Expense by Category"
          subtitle="Spend distribution by category"
          data={expenseBreakdown}
          totalLabel="Total Spend"
          format={formatINR}
        />
        <PiePanel
          title="Top 5 Expenses"
          subtitle="Highest individual expense lines"
          data={topExpenses}
          totalLabel="Total Spend"
          format={formatINR}
        />
      </div>
    </div>
  )
}
