import type { InputHTMLAttributes } from 'react'

type TextInputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean
}

export default function TextInput({ invalid, className = '', ...props }: TextInputProps) {
  return (
    <input
      {...props}
      className={`h-10 w-full rounded-[10px] border px-3 text-sm text-gray-700 outline-none transition-colors ${
        invalid ? 'border-rose-400 focus:border-rose-500' : 'border-gray-200 focus:border-blue-400'
      } ${className}`}
    />
  )
}
