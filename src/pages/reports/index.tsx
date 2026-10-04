import { useState } from 'react'
import ReportsHeader from '../../components/reports/header'
import ReportStats from '../../components/reports/stats'
import ReportTabs from '../../components/reports/tabs'
import OverviewTab from '../../components/reports/tabs/overview'
import BookingsTab from '../../components/reports/tabs/bookings'
import RevenueTab from '../../components/reports/tabs/revenue'
import CustomersTab from '../../components/reports/tabs/customers'
import CommunicationsTab from '../../components/reports/tabs/communications'
import ExpensesTab from '../../components/reports/tabs/expenses'
import RoutesTab from '../../components/reports/tabs/routes'
import AirlinesTab from '../../components/reports/tabs/airlines'
import { ReportDataProvider } from '../../components/reports/ReportDataContext'

const TAB_CONTENT: Record<string, React.ComponentType> = {
  overview: OverviewTab,
  bookings: BookingsTab,
  revenue: RevenueTab,
  customers: CustomersTab,
  communications: CommunicationsTab,
  expenses: ExpensesTab,
  routes: RoutesTab,
  airlines: AirlinesTab,
}

export default function Reports() {
  const [tab, setTab] = useState('overview')
  const ActiveTab = TAB_CONTENT[tab] ?? OverviewTab

  return (
    <ReportDataProvider>
      <div className="flex flex-col gap-5">
        <ReportsHeader />

        {/* Top-row KPIs */}
        <ReportStats />

        {/* Tabbed detail views */}
        <ReportTabs active={tab} onChange={setTab} />
        <ActiveTab />
      </div>
    </ReportDataProvider>
  )
}
