import type { CustomerStatus } from '../../../../types/customer'

const styles: Record<CustomerStatus, string> = {
  Active: 'bg-emerald-50 text-emerald-600',
  Inactive: 'bg-gray-100 text-gray-500',
}

const dotStyles: Record<CustomerStatus, string> = {
  Active: 'bg-emerald-500',
  Inactive: 'bg-gray-400',
}

export default function StatusPill({ status }: { status: CustomerStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${styles[status]}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dotStyles[status]}`} />
      {status}
    </span>
  )
}
