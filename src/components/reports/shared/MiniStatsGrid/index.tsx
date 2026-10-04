import type { MiniStat } from '../../../../types/reports'

type MiniStatsGridProps = {
  stats: MiniStat[]
  /** Number of columns on large screens (defaults to 4) */
  cols?: 4 | 5
}

export default function MiniStatsGrid({ stats, cols = 4 }: MiniStatsGridProps) {
  return (
    <section
      className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${
        cols === 5 ? 'lg:grid-cols-5' : 'lg:grid-cols-4'
      }`}
    >
      {stats.map((s) => (
        <div key={s.id} className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
          <p className="text-xs font-medium text-gray-500">{s.label}</p>
          <p className={`mt-1 text-xl font-bold ${s.color}`}>{s.value}</p>
        </div>
      ))}
    </section>
  )
}
