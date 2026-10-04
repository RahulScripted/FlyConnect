import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

type SheetProps = {
  onClose: () => void
  children: ReactNode
}

// Dip geometry (mobile top edge)
const DIP_W = 96
const DIP_H = 16
const RADIUS = 24

/** Builds the top-edge path with a concave dip in the center, matching the RN sheet. */
function dipPath(width: number): string {
  const mid = width / 2
  const left = mid - DIP_W / 2
  const right = mid + DIP_W / 2
  return [
    `M 0 ${RADIUS}`,
    `Q 0 0 ${RADIUS} 0`,
    `L ${left} 0`,
    `C ${left + 24} 0 ${left + 16} ${DIP_H} ${mid} ${DIP_H}`,
    `C ${right - 16} ${DIP_H} ${right - 24} 0 ${right} 0`,
    `L ${width - RADIUS} 0`,
    `Q ${width} 0 ${width} ${RADIUS}`,
    `L ${width} ${DIP_H + RADIUS}`,
    `L 0 ${DIP_H + RADIUS}`,
    'Z',
  ].join(' ')
}

/**
 * Responsive modal shell.
 * - Mobile (< sm): slides up from the bottom with a concave dip; close icon sits in the dip
 *   and slides up with a delay.
 * - Desktop (>= sm): a normal centered modal.
 */
export default function Sheet({ onClose, children }: SheetProps) {
  // Lock background scroll while open; restore on close
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  // A generous fixed width for the dip path (sheet is capped at max-w-lg = 512px)
  const PATH_W = 512

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        aria-label="Close"
      />

      {/* ---- Mobile sheet (with dip) ---- */}
      <motion.div
        className="relative w-full max-w-lg sm:hidden"
        initial={{ y: '100%' }}
        animate={{ y: 0, transition: { type: 'spring', damping: 24, stiffness: 240 } }}
        exit={{ y: '100%', transition: { duration: 0.2 } }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close icon nested in the dip — larger, pushed above the sheet, slides up with delay */}
        <motion.button
          onClick={onClose}
          className="absolute left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-rose-500 shadow-lg cursor-pointer"
          style={{ top: -26 }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.4, type: 'spring', damping: 12, stiffness: 100 } }}
          exit={{ opacity: 0, y: 60, transition: { duration: 0.15 } }}
          aria-label="Close"
        >
          <X size={22} />
        </motion.button>

        {/* Carved top edge */}
        <svg
          width="100%"
          height={DIP_H + RADIUS}
          viewBox={`0 0 ${PATH_W} ${DIP_H + RADIUS}`}
          preserveAspectRatio="none"
          className="block"
          style={{ marginBottom: -1 }}
          aria-hidden
        >
          <path d={dipPath(PATH_W)} fill="#ffffff" />
        </svg>

        {/* Body */}
        <div className="flex max-h-[75vh] flex-col overflow-hidden bg-white">{children}</div>
      </motion.div>

      {/* ---- Desktop centered modal ---- */}
      <motion.div
        className="relative hidden max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:mx-4 sm:flex"
        initial={{ opacity: 0, scale: 0.96, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.18 } }}
        exit={{ opacity: 0, scale: 0.96, y: 8, transition: { duration: 0.15 } }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 cursor-pointer"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        {children}
      </motion.div>
    </div>,
    document.body,
  )
}
