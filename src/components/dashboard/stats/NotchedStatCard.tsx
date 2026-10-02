import type { CSSProperties } from 'react'
import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown, Check } from 'lucide-react'

export type NotchedStatCardProps = {
  label: string
  sub?: string
  value: string
  icon: LucideIcon
  iconBg: string
  iconColor: string
  tint: string
  trend: number
  allClear?: boolean
  onOpen?: () => void
  /** colour painted into the notch — should match the page background */
  surface?: string
}

const DISC = 48 // icon disc diameter, px
const BLOCK = 62 // notch block, px
const FILLET = 22 // curve where the cut meets the card edges, px

export default function NotchedStatCard({
  label,
  sub,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  tint,
  trend,
  allClear,
  onOpen,
  surface = '#ffffff',
}: NotchedStatCardProps) {
  const up = trend > 0
  const down = trend < 0

  return (
    <div
      className={`group relative flex min-h-[150px] flex-col overflow-hidden rounded-2xl bg-gradient-to-br ${tint} p-4 transition-transform duration-300 hover:-translate-y-0.5 cursor-pointer`}
    >
      {/* Top: label + sub + trend */}
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-gray-800">{label}</p>
          {sub && <p className="truncate text-xs text-gray-500">{sub}</p>}
        </div>

        {allClear ? (
          <span className="flex shrink-0 items-center gap-0.5 rounded-full bg-emerald-100/70 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600">
            <Check size={11} /> All clear
          </span>
        ) : trend !== 0 ? (
          <span
            className={`flex shrink-0 items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
              up ? 'bg-emerald-100/70 text-emerald-600' : 'bg-rose-100/70 text-rose-600'
            }`}
          >
            {up && <TrendingUp size={11} />}
            {down && <TrendingDown size={11} />}
            {Math.abs(trend)}%
          </span>
        ) : null}
      </div>

      {/* Value */}
      <p className="mt-auto pt-6 text-4xl font-extrabold leading-none tracking-tight text-gray-900">
        {value}
      </p>

      {/* Notch block with concave corner */}
      <div
        aria-hidden
        className="absolute bottom-0 right-0"
        style={{ width: BLOCK, height: BLOCK, borderTopLeftRadius: BLOCK - DISC / 2, background: surface }}
      />
      {/* Fillets where the cut meets the card's right & bottom edges */}
      {[
        { bottom: BLOCK, right: 0 },
        { bottom: 0, right: BLOCK },
      ].map((pos, i) => (
        <div
          key={i}
          aria-hidden
          className="absolute"
          style={{
            ...pos,
            width: FILLET,
            height: FILLET,
            background: `radial-gradient(circle at top left, transparent ${FILLET - 0.5}px, ${surface} ${FILLET}px)`,
          }}
        />
      ))}

      {/* Icon disc nested in the notch (replaces the arrow) */}
      <button
        onClick={onOpen}
        aria-label={`View ${label}`}
        className={`absolute bottom-0 right-0 flex items-center justify-center rounded-full ${iconBg} transition-transform duration-300 group-hover:scale-105 cursor-pointer`}
        style={{ width: DISC, height: DISC } as CSSProperties}
      >
        <Icon size={18} className={iconColor} />
      </button>
    </div>
  )
}
