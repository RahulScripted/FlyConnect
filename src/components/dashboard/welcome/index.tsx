import { user, welcomeMessages, getGreeting } from '../../../mock/dashboard'
import banner from '../../../assets/banner.png'

export default function WelcomeBanner() {
  const greeting = getGreeting()
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
          {greeting}, {user.name} 
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-blue-50/95 drop-shadow-sm">
          {message}
        </p>
      </div>
    </section>
  )
}
