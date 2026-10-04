import { useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { recentActivity } from '../../../mock/dashboard'

export default function RecentActivity() {
  const navigate = useNavigate()

  return (
    <section className="flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">Recent Activity</h2>
        <button
          onClick={() => navigate('/settings')}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
        >
          View All →
        </button>
      </div>

      <div className="flex flex-col gap-1">
        {recentActivity.map((a) => (
          <div key={a.id} className="flex items-center gap-3 rounded-lg px-1 py-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-500">
              <CheckCircle2 size={16} />
            </span>
            <p className="flex-1 text-sm text-gray-700">
              <span className="font-semibold text-gray-800">{a.user}</span> {a.action}
            </p>
            <span className="text-xs text-gray-400">{a.at}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
