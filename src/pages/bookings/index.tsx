import { useNavigate } from 'react-router-dom'
import { PlusCircle } from 'lucide-react'

export default function Bookings() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Bookings</h1>
          <p className="text-sm text-gray-400">Manage all your travel bookings in one place.</p>
        </div>
        <button
          onClick={() => navigate('/bookings/add')}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 cursor-pointer"
        >
          <PlusCircle size={18} />
          Add Booking
        </button>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm text-sm text-gray-500">
        No bookings yet.
      </div>
    </div>
  )
}
