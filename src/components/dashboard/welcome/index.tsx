import { Sunrise, Sun, Sunset, Moon } from 'lucide-react'
import { welcomeMessages, getGreeting, type TimeOfDay } from '../../../mock/dashboard'
import { useAuth } from '../../../shared/AuthContext'
import banner from '../../../assets/banner.png'

const GREETING_ICON: Record<TimeOfDay, typeof Sun> = {
  morning: Sunrise,
  afternoon: Sun,
  evening: Sunset,
  night: Moon,
}

export default function WelcomeBanner() {
  const { user } = useAuth()
  const { text: greeting, period } = getGreeting()
  const GreetingIcon = GREETING_ICON[period]
  const message = welcomeMessages[user.role]

  return (
    <section className="relative min-h-[220px] w-full overflow-hidden rounded-2xl bg-[#1f6fe5] shadow-sm sm:min-h-0 sm:h-44">
      {/* Full-width banner, showing the top portion of the artwork */}
      <img
        src={banner}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-[50%_37%]"
      />

      {/* Blend overlay matched to the banner blue so the left melts into the art */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1f6fe5] from-30% via-[#1f6fe5]/70 via-55% to-transparent to-80%" />

      <div className="relative flex h-full min-h-[220px] flex-col justify-center px-6 py-6 text-white sm:min-h-0 sm:py-0 sm:px-9">
        <h1 className="flex items-center gap-2 text-2xl font-bold drop-shadow sm:text-3xl">
          <GreetingIcon size={26} className="shrink-0 text-amber-200" />
          {greeting}, {user.name}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-blue-50/95 drop-shadow-sm">
          {message}
        </p>
      </div>
    </section>
  )
}
