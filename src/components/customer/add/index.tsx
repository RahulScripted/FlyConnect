import { useState } from 'react'
import { ConfigProvider, DatePicker } from 'antd'
import dayjs, { type Dayjs } from 'dayjs'
import Sheet from '../shared/Sheet'
import Stepper from '../shared/Stepper'
import FormField from '../shared/FormField'
import TextInput from '../shared/TextInput'
import type { Customer, CustomerStatus } from '../../../types/customer'
import { validateEmail, validatePhone, validateRequired, sanitizePhone } from '../../../utils/validation'

type AddCustomerModalProps = {
  onClose: () => void
  onAdd: (customer: Omit<Customer, 'ownerId'>) => void
}

const STEPS = ['Details', 'Status', 'Review']

type FormState = {
  name: string
  phone: string
  email: string
  status: CustomerStatus
  memberSince: Dayjs | null
}

const EMPTY: FormState = {
  name: '',
  phone: '',
  email: '',
  status: 'Active',
  memberSince: null,
}

const STEP_FIELDS: Record<number, (keyof FormState)[]> = {
  1: ['name', 'phone', 'email'],
  2: ['status', 'memberSince'],
  3: [],
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || (parts[0]?.[0] ?? '').toUpperCase()
}

export default function AddCustomerModal({ onClose, onAdd }: AddCustomerModalProps) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
  }

  /** Updates a text field and validates it live so errors appear as the user types. */
  const setText = (key: 'name' | 'phone' | 'email', value: string) => {
    set(key, value)
    let error: string | undefined
    if (key === 'phone' && value) error = validatePhone(value)
    else if (key === 'email' && value) error = validateEmail(value)
    else error = undefined
    setErrors((e) => ({ ...e, [key]: error }))
  }

  const validateStep = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (step === 1) {
      next.name = validateRequired(form.name, 'Name')
      next.phone = validatePhone(form.phone)
      next.email = validateEmail(form.email)
    }
    const cleaned = Object.fromEntries(
      Object.entries(next).filter(([, v]) => v),
    ) as Partial<Record<keyof FormState, string>>
    setErrors(cleaned)
    return Object.keys(cleaned).length === 0
  }

  const goNext = () => {
    if (!validateStep()) return
    setStep((s) => Math.min(STEPS.length, s + 1))
  }

  const goPrev = () => setStep((s) => Math.max(1, s - 1))

  const resetStep = () => {
    const fields = STEP_FIELDS[step]
    setForm((f) => {
      const copy = { ...f }
      for (const key of fields) copy[key] = EMPTY[key] as never
      return copy
    })
    setErrors((e) => {
      const copy = { ...e }
      for (const key of fields) copy[key] = undefined
      return copy
    })
  }

  const handleSave = () => {
    if (!validateStep()) {
      setStep(1)
      return
    }
    const customer: Omit<Customer, 'ownerId'> = {
      id: `c-${Date.now()}`,
      name: form.name.trim(),
      initials: initialsOf(form.name),
      phone: form.phone.trim(),
      email: form.email.trim(),
      memberSince: form.memberSince
        ? form.memberSince.format('DD MMM YYYY')
        : new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: form.status,
      totalBookings: 0,
      totalSpent: '₹0',
      upcomingTrips: 0,
      whatsappMessages: 0,
      lastJourney: { route: '—', date: '—', flight: '—' },
      bookings: [],
      messages: [],
      notes: [],
    }
    onAdd(customer)
  }

  return (
    <Sheet onClose={onClose}>
      {/* Header + stepper */}
      <div className="px-6 pb-4 pt-4">
        <h2 className="text-xl font-bold text-gray-900">Add Customer</h2>
        <p className="mb-4 text-xs text-gray-400">Create a new customer in a few quick steps.</p>
        <Stepper steps={STEPS} active={step} />
      </div>

      {/* Body (scrolls only if content overflows) */}
      <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-4">
        {step === 1 && (
          <div className="flex flex-col gap-1">
            <FormField label="Name" required error={errors.name}>
              <TextInput
                value={form.name}
                invalid={!!errors.name}
                onChange={(e) => setText('name', e.target.value)}
              />
            </FormField>
            <FormField label="Phone" required error={errors.phone}>
              <TextInput
                value={form.phone}
                invalid={!!errors.phone}
                inputMode="numeric"
                maxLength={13}
                onChange={(e) => setText('phone', sanitizePhone(e.target.value))}
              />
            </FormField>
            <FormField label="Email" required error={errors.email}>
              <TextInput
                value={form.email}
                invalid={!!errors.email}
                type="email"
                onChange={(e) => setText('email', e.target.value)}
              />
            </FormField>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-1">
            <FormField label="Status">
              <select
                value={form.status}
                onChange={(e) => set('status', e.target.value as CustomerStatus)}
                className="h-10 w-full rounded-[10px] border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:border-blue-400 cursor-pointer"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </FormField>
            <FormField label="Member Since">
              <ConfigProvider
                theme={{ token: { colorPrimary: '#2563eb', borderRadius: 10, controlHeight: 40, fontFamily: 'inherit' } }}
              >
                <DatePicker
                  value={form.memberSince}
                  onChange={(d) => set('memberSince', d)}
                  format="DD MMM YYYY"
                  disabledDate={(current) => current && current > dayjs().endOf('day')}
                  className="w-full"
                  placeholder="Select a date"
                />
              </ConfigProvider>
            </FormField>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-2.5">
            <Review label="Name" value={form.name} />
            <Review label="Phone" value={form.phone} />
            <Review label="Email" value={form.email} />
            <Review label="Status" value={form.status} />
            <Review label="Member Since" value={form.memberSince ? form.memberSince.format('DD MMM YYYY') : '—'} />
          </div>
        )}
      </div>

      {/* Pinned footer */}
      <div className="flex items-center justify-between gap-2 border-t border-gray-100 px-6 py-4">
        <button
          onClick={resetStep}
          className="rounded-[10px] px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
        >
          Reset
        </button>

        <div className="flex gap-2">
          <button
            onClick={goPrev}
            disabled={step === 1}
            className="rounded-[10px] border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {step < STEPS.length ? (
            <button
              onClick={goNext}
              className="rounded-[10px] bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 cursor-pointer"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="rounded-[10px] bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 cursor-pointer"
            >
              Add Customer
            </button>
          )}
        </div>
      </div>
    </Sheet>
  )
}

function Review({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-2.5">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-800">{value}</span>
    </div>
  )
}
