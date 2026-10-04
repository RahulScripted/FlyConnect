type AvatarProps = {
  initials: string
  /** Tailwind size classes, e.g. 'h-9 w-9 text-sm' */
  size?: string
}

export default function Avatar({ initials, size = 'h-9 w-9 text-sm' }: AvatarProps) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-600 ${size}`}
    >
      {initials}
    </span>
  )
}
