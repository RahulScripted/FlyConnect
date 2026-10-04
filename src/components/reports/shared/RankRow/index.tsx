import type { CustomerRank } from '../../../../types/reports'

type RankRowProps = {
  rank: number
  entry: CustomerRank
  /** Format the primary metric */
  format?: (value: number) => string
}

export default function RankRow({ rank, entry, format = (v) => v.toLocaleString() }: RankRowProps) {
  const avatar = entry.avatarUrl ?? `https://i.pravatar.cc/96?u=${encodeURIComponent(entry.id)}`

  return (
    <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-3 py-2.5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600">
        {rank}
      </span>
      <img src={avatar} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" />
      <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-800">{entry.name}</span>
      <div className="shrink-0 text-right">
        <p className="text-sm font-semibold text-gray-900">{format(entry.value)}</p>
        <p className="text-xs text-gray-400">{entry.bookings} bookings</p>
      </div>
    </div>
  )
}
