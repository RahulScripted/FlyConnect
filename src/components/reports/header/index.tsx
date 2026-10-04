import ReportDownload from '../download'
import { useAuth } from '../../../shared/AuthContext'

export default function ReportsHeader() {
  const { isAdmin, user } = useAuth()

  return (
    <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Reports</h1>
        <p className="mt-1 text-sm text-gray-500">
          {isAdmin
            ? 'Get insights into your team’s bookings, revenue, customers and communication performance.'
            : `Insights into ${user.name.split(' ')[0]}’s bookings, revenue, customers and communication performance.`}
        </p>
      </div>

      <ReportDownload />
    </header>
  )
}
