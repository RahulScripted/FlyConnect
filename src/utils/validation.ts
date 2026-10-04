const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Validates a 10-digit Indian mobile number (digits only, optional spaces stripped). */
export function validatePhone(raw: string): string | undefined {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return 'Phone is required'
  if (!/^\d+$/.test(raw.replace(/\s/g, ''))) return 'Phone must contain digits only'
  if (digits.length !== 10) return 'Phone must be a 10-digit number'
  return undefined
}

export function validateEmail(raw: string): string | undefined {
  const value = raw.trim()
  if (!value) return 'Email is required'
  if (!EMAIL_RE.test(value)) return 'Enter a valid email'
  return undefined
}

export function validateRequired(raw: string, label: string): string | undefined {
  if (!raw.trim()) return `${label} is required`
  return undefined
}

/** Keeps only digits (and spaces) — used to block non-numeric phone input. */
export function sanitizePhone(raw: string): string {
  return raw.replace(/[^\d\s]/g, '')
}
