type StepperProps = {
  steps: string[]
  /** 1-based active step */
  active: number
}

/** Horizontal bar stepper with a title under each bar (matches the demo look). */
export default function Stepper({ steps, active }: StepperProps) {
  return (
    <nav className="flex w-full gap-3.5" aria-label="Progress">
      {steps.map((title, i) => {
        const step = i + 1
        const state = step < active ? 'completed' : step === active ? 'active' : 'inactive'
        return (
          <div key={title} className="flex flex-1 flex-col items-start gap-2">
            <span
              className={`h-1 w-full rounded-full transition-colors ${
                state === 'inactive' ? 'bg-gray-200' : 'bg-blue-600'
              }`}
            />
            <span
              className={`text-xs font-semibold ${
                state === 'inactive' ? 'text-gray-400' : 'text-gray-800'
              }`}
            >
              {title}
            </span>
          </div>
        )
      })}
    </nav>
  )
}
