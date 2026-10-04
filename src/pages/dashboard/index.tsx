import WelcomeBanner from '../../components/dashboard/welcome'
import StatsGrid from '../../components/dashboard/stats'
import RouteSplit from '../../components/dashboard/charts'
import TodaysJourneys from '../../components/dashboard/journeys'
import UpcomingReminders from '../../components/dashboard/reminders'
import BookingsOverview from '../../components/dashboard/overview'
import MessageDeliveryStatus from '../../components/dashboard/delivery'
import RecentActivity from '../../components/dashboard/activity'
import { useAuth } from '../../shared/AuthContext'

export default function Dashboard() {
  const { isAdmin } = useAuth()

  return (
    <div className="flex flex-col gap-5">
      <WelcomeBanner />
      <StatsGrid />

      {/* Journeys table + Route Split donut */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.6fr_1fr]">
        <TodaysJourneys />
        <RouteSplit />
      </div>

      {/* Reminders */}
      <UpcomingReminders />

      <div
        className={`grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 ${
          isAdmin ? 'xl:grid-cols-3' : 'xl:grid-cols-2'
        }`}
      >
        <BookingsOverview />
        <MessageDeliveryStatus />
        {isAdmin && <RecentActivity />}
      </div>
    </div>
  )
}
