import { useNavigate } from 'react-router-dom'
import { statCards } from '../../../mock/dashboard'
import NotchedStatCard from './NotchedStatCard'

export default function StatsGrid() {
  const navigate = useNavigate()

  return (
    <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {statCards.map((card) => (
        <NotchedStatCard
          key={card.id}
          label={card.label}
          sub={card.sub}
          value={card.value}
          icon={card.icon}
          iconBg={card.iconBg}
          iconColor={card.iconColor}
          tint={card.tint}
          trend={card.trend}
          allClear={card.allClear}
          onOpen={() => navigate(card.to)}
        />
      ))}
    </section>
  )
}
