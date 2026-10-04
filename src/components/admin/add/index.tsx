import { useState } from 'react'
import Sheet from '../../customer/shared/Sheet'
import FormField from '../../customer/shared/FormField'
import TextInput from '../../customer/shared/TextInput'
import { validateEmail, validatePhone, validateRequired, sanitizePhone } from '../../../utils/validation'
import type { Member } from '../../../types/member'

type AddMemberModalProps = {
  onClose: () => void
  onAdd: (member: Member) => void
}

const COLORS = ['#2563eb', '#7c3aed', '#06b6d4', '#f59e0b', '#ef4444', '#10b981']

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || (parts[0]?.[0] ?? '').toUpperCase()
}

export default function AddMemberModal({ onClose, onAdd }: AddMemberModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({})

  const handleSave = () => {
    const next = {
      name: validateRequired(name, 'Name'),
      email: validateEmail(email),
      phone: validatePhone(phone),
    }
    const cleaned = Object.fromEntries(Object.entries(next).filter(([, v]) => v))
    setErrors(cleaned)
    if (Object.keys(cleaned).length > 0) return

    const member: Member = {
      id: `m-${Date.now()}`,
      name: name.trim(),
      initials: initialsOf(name),
      email: email.trim(),
      phone: phone.trim(),
      role: 'member',
      status: 'active',
      joinedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      totalBookings: 0,
      totalRevenue: 0,
      totalCustomers: 0,
      messagesSent: 0,
    }
    onAdd(member)
  }

  return (
    <Sheet onClose={onClose}>
      <div className="px-6 pb-2 pt-4">
        <h2 className="text-xl font-bold text-gray-900">Add Member</h2>
        <p className="text-xs text-gray-400">Invite a new member to your team.</p>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto px-6 py-4">
        <div className="flex flex-col gap-1">
          <FormField label="Name" required error={errors.name}>
            <TextInput
              value={name}
              invalid={!!errors.name}
              onChange={(e) => {
                setName(e.target.value)
                setErrors((er) => ({ ...er, name: undefined }))
              }}
            />
          </FormField>
          <FormField label="Email" required error={errors.email}>
            <TextInput
              value={email}
              invalid={!!errors.email}
              type="email"
              onChange={(e) => {
                const v = e.target.value
                setEmail(v)
                setErrors((er) => ({ ...er, email: v ? validateEmail(v) : undefined }))
              }}
            />
          </FormField>
          <FormField label="Phone" required error={errors.phone}>
            <TextInput
              value={phone}
              invalid={!!errors.phone}
              inputMode="numeric"
              maxLength={13}
              onChange={(e) => {
                const v = sanitizePhone(e.target.value)
                setPhone(v)
                setErrors((er) => ({ ...er, phone: v ? validatePhone(v) : undefined }))
              }}
            />
          </FormField>
        </div>
      </div>

      <div className="flex justify-end gap-2 border-t border-gray-100 px-6 py-4">
        <button
          onClick={onClose}
          className="rounded-[10px] px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="rounded-[10px] bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 cursor-pointer"
        >
          Add Member
        </button>
      </div>
    </Sheet>
  )
}
