import { Plus } from 'lucide-react'

type CustomerHeaderProps = {
  onAdd: () => void
}

export default function CustomerHeader({ onAdd }: CustomerHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Customers</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your customer database, view travel history and engage with your travelers.
        </p>
      </div>

      <button
        onClick={onAdd}
        className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-[10px] bg-blue-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 cursor-pointer"
      >
        <Plus size={16} />
        Add Customer
      </button>
    </header>
  )
}
