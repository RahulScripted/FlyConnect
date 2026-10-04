import { reportTabs } from '../../../mock/reports'

type ReportTabsProps = {
  active: string
  onChange: (id: string) => void
}

export default function ReportTabs({ active, onChange }: ReportTabsProps) {
  return (
    <nav className="no-scrollbar -mb-px flex gap-1 overflow-x-auto border-b border-gray-100">
      {reportTabs.map((tab) => {
        const Icon = tab.icon
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
              isActive
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Icon size={16} />
            {tab.label}
          </button>
        )
      })}
    </nav>
  )
}
