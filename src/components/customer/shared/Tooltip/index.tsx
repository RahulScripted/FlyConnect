import type { ReactNode } from 'react'

type TooltipProps = {
  label: string
  children: ReactNode
}

/** Lightweight CSS hover tooltip (appears above the trigger). */
export default function Tooltip({ label, children }: TooltipProps) {
  return (
    <span className="group/tt relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-[11px] font-medium text-white opacity-0 shadow-sm transition-opacity duration-150 group-hover/tt:opacity-100"
      >
        {label}
      </span>
    </span>
  )
}
