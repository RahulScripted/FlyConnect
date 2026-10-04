import NotchedStatCard from '../../dashboard/stats/NotchedStatCard'
import { customerStats } from '../../../mock/customer'

export default function CustomerStats() {
  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {customerStats.map((card) => (
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
        />
      ))}
    </section>
  )
}
