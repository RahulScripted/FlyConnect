import WelcomeBanner from '../../components/dashboard/welcome'
import StatsGrid from '../../components/dashboard/stats'
import RouteSplit from '../../components/dashboard/charts'
import TodaysJourneys from '../../components/dashboard/journeys'
import UpcomingReminders from '../../components/dashboard/reminders'

export default function Dashboard() {
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
    </div>
  )
}
