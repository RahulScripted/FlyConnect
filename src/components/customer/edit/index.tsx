import { useState } from 'react'
import Sheet from '../shared/Sheet'
import FormField from '../shared/FormField'
import TextInput from '../shared/TextInput'
import type { Customer, CustomerStatus } from '../../../types/customer'
import { validateEmail, validatePhone, validateRequired, sanitizePhone } from '../../../utils/validation'

type EditCustomerModalProps = {
  customer: Customer
  onClose: () => void
  onSave: (updated: Customer) => void
}

function initialsOf(name: string): string {
  const parts = name.trim().split(/\s+/)
  return ((parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')).toUpperCase() || (parts[0]?.[0] ?? '').toUpperCase()
}

export default function EditCustomerModal({ customer, onClose, onSave }: EditCustomerModalProps) {
  const [name, setName] = useState(customer.name)
  const [phone, setPhone] = useState(customer.phone)
  const [email, setEmail] = useState(customer.email)
  const [status, setStatus] = useState<CustomerStatus>(customer.status)
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({})

  const handleSave = () => {
    const next = {
      name: validateRequired(name, 'Name'),
      phone: validatePhone(phone),
      email: validateEmail(email),
    }
    const cleaned = Object.fromEntries(Object.entries(next).filter(([, v]) => v))
    setErrors(cleaned)
    if (Object.keys(cleaned).length > 0) return

    onSave({
      ...customer,
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      status,
      initials: initialsOf(name),
    })
  }

  return (
    <Sheet onClose={onClose}>
      <div className="px-6 pb-2 pt-4">
        <h2 className="text-xl font-bold text-gray-900">Edit Customer</h2>
        <p className="text-xs text-gray-400">Update the customer's contact details and status.</p>
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

          <FormField label="Status">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as CustomerStatus)}
              className="h-10 w-full rounded-[10px] border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:border-blue-400 cursor-pointer"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
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
          Save Changes
        </button>
      </div>
    </Sheet>
  )
}
