import type { ReactNode } from 'react'

type FormFieldProps = {
  label: string
  required?: boolean
  /** Error message; when set, shown absolutely below the input */
  error?: string
  children: ReactNode
}

export default function FormField({ label, required, error, children }: FormFieldProps) {
  return (
    <div className="relative pb-5">
      <label className="mb-1.5 flex items-center gap-0.5 text-xs font-medium text-gray-500">
        {label}
        {required && <span className="text-rose-500">*</span>}
      </label>
      {children}
      {error && (
        <p className="absolute left-0 top-full -mt-4 text-[11px] font-medium text-rose-500">
          {error}
        </p>
      )}
    </div>
  )
}
