import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import CustomerHeader from '../../components/customer/header'
import CustomerStats from '../../components/customer/stats'
import CustomerList from '../../components/customer/list'
import CustomerDetail from '../../components/customer/detail'
import CustomerEmptyState from '../../components/customer/detail/EmptyState'
import EditCustomerModal from '../../components/customer/edit'
import AddCustomerModal from '../../components/customer/add'
import Sheet from '../../components/customer/shared/Sheet'
import useMediaQuery from '../../hooks/useMediaQuery'
import { useAuth } from '../../shared/AuthContext'
import { customers as allCustomers } from '../../mock/customer'
import type { Customer, CustomerNote } from '../../types/customer'

export default function Customer() {
  const { user, isAdmin } = useAuth()
  // Members only see the customers they own; admins see everyone
  const seedCustomers = isAdmin
    ? allCustomers
    : allCustomers.filter((c) => c.ownerId === user.id)

  // Tailwind xl breakpoint — desktop uses the side panel, below uses a modal
  const isDesktop = useMediaQuery('(min-width: 1280px)')
  const [list, setList] = useState<Customer[]>(seedCustomers)
  // Desktop side panel defaults to the first customer
  const [selectedId, setSelectedId] = useState<string | null>(seedCustomers[0]?.id ?? null)
  // Mobile detail modal only opens on an explicit tap (null = closed)
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(null)
  const [editing, setEditing] = useState<Customer | null>(null)
  const [adding, setAdding] = useState(false)
  // Notes added at runtime, keyed by customer id (overlaid on the mock notes)
  const [addedNotes, setAddedNotes] = useState<Record<string, CustomerNote[]>>({})

  const withNotes = (c: Customer | null) =>
    c ? { ...c, notes: [...(addedNotes[c.id] ?? []), ...c.notes] } : null

  const selected = withNotes(list.find((c) => c.id === selectedId) ?? null)
  const mobileSelected = withNotes(list.find((c) => c.id === mobileOpenId) ?? null)

  const handleSelect = (id: string) => {
    setSelectedId(id) // desktop highlight + panel
    setMobileOpenId(id) // open mobile modal on tap
  }

  const handleAddNote = (customerId: string, text: string) => {
    const note: CustomerNote = {
      id: `n-${Date.now()}`,
      text,
      author: 'You',
      at: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    }
    setAddedNotes((prev) => ({
      ...prev,
      [customerId]: [note, ...(prev[customerId] ?? [])],
    }))
  }

  const handleSaveEdit = (updated: Customer) => {
    setList((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
    setEditing(null)
  }

  const handleDelete = (id: string) => {
    setList((prev) => prev.filter((c) => c.id !== id))
    if (selectedId === id) setSelectedId(null)
    if (mobileOpenId === id) setMobileOpenId(null)
  }

  const handleAdd = (customer: Omit<Customer, 'ownerId'>) => {
    // New customers belong to the current user
    const owned: Customer = { ...customer, ownerId: user.id }
    setList((prev) => [owned, ...prev])
    setSelectedId(owned.id)
    setAdding(false)
  }

  return (
    <div className="flex flex-col gap-5">
      <CustomerHeader onAdd={() => setAdding(true)} />
      <CustomerStats />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_380px]">
        <CustomerList
          customers={list}
          selectedId={selectedId ?? ''}
          onSelect={handleSelect}
          onEdit={setEditing}
          onDelete={handleDelete}
        />

        {/* Desktop (xl+): sticky side panel / empty state */}
        <div className="hidden xl:sticky xl:top-6 xl:block xl:self-start">
          {selected ? (
            <CustomerDetail
              customer={selected}
              onClose={() => setSelectedId(null)}
              onAddNote={(text) => handleAddNote(selected.id, text)}
            />
          ) : (
            <CustomerEmptyState />
          )}
        </div>
      </div>

      {/* Below xl: detail opens as a modal on tap (desktop uses the side panel instead) */}
      <AnimatePresence>
        {!isDesktop && mobileSelected && (
          <Sheet onClose={() => setMobileOpenId(null)}>
            <div className="no-scrollbar overflow-y-auto">
              <CustomerDetail
                customer={mobileSelected}
                onClose={() => setMobileOpenId(null)}
                onAddNote={(text) => handleAddNote(mobileSelected.id, text)}
                bare
              />
            </div>
          </Sheet>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editing && (
          <EditCustomerModal
            customer={editing}
            onClose={() => setEditing(null)}
            onSave={handleSaveEdit}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {adding && (
          <AddCustomerModal onClose={() => setAdding(false)} onAdd={handleAdd} />
        )}
      </AnimatePresence>
    </div>
  )
}
