import { Crown } from 'lucide-react'
import type { CustomerRank } from '../../../../types/reports'

export type PodiumEntry = CustomerRank & { rank: 1 | 2 | 3 }

type LeaderboardPodiumProps = {
  /** Top 3 rankings (expects rank 1, 2 and 3) */
  rankings: PodiumEntry[]
  /** Format the value shown below the name */
  format?: (value: number) => string
}

const PODIUM_CONFIG = {
  1: { color: 'text-amber-500', bg: 'bg-amber-100', block: 'bg-amber-200', height: 'h-28' },
  2: { color: 'text-gray-400', bg: 'bg-gray-100', block: 'bg-gray-200', height: 'h-20' },
  3: { color: 'text-orange-500', bg: 'bg-orange-100', block: 'bg-orange-200', height: 'h-16' },
} as const

export default function LeaderboardPodium({
  rankings,
  format = (v) => v.toLocaleString(),
}: LeaderboardPodiumProps) {
  // Reorder for podium display: 2nd, 1st, 3rd
  const order = [
    rankings.find((r) => r.rank === 2),
    rankings.find((r) => r.rank === 1),
    rankings.find((r) => r.rank === 3),
  ].filter(Boolean) as PodiumEntry[]

  if (order.length === 0) return null

  return (
    <div className="flex items-end justify-center gap-4" role="list" aria-label="Top 3 customers">
      {order.map((r) => {
        const config = PODIUM_CONFIG[r.rank]
        const avatar = r.avatarUrl ?? `https://i.pravatar.cc/96?u=${encodeURIComponent(r.id)}`

        return (
          <div key={r.id} role="listitem" className="flex flex-col items-center">
            {/* Avatar with crown badge */}
            <div className="relative mb-2">
              <img
                src={avatar}
                alt={`${r.name} avatar`}
                className={`rounded-full object-cover ring-2 ring-white ${
                  r.rank === 1 ? 'h-16 w-16' : 'h-12 w-12'
                }`}
              />
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm">
                <Crown className={`h-3.5 w-3.5 ${config.color}`} />
              </div>
            </div>

            {/* Name + value */}
            <span className="max-w-24 truncate text-center text-sm font-medium text-gray-800" title={r.name}>
              {r.name}
            </span>
            <span className="text-xs tabular-nums text-gray-400">{format(r.value)}</span>

            {/* Podium block */}
            <div className={`mt-2 w-20 rounded-t-lg ${config.height} ${config.block}`}>
              <div className={`flex h-8 items-center justify-center text-lg font-bold ${config.color}`}>
                {r.rank}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
