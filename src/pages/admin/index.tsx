import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import MemberList from '../../components/admin/list'
import MemberDetail from '../../components/admin/detail'
import { members as seedMembers } from '../../mock/members'
import type { Member } from '../../types/member'

export default function Admin() {
  const [list, setList] = useState<Member[]>(seedMembers)

  const addMember = (member: Member) => setList((prev) => [member, ...prev])
  const deleteMember = (id: string) => setList((prev) => prev.filter((m) => m.id !== id))
  const toggleBlock = (id: string) =>
    setList((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: m.status === 'blocked' ? 'active' : 'blocked' } : m,
      ),
    )

  return (
    <Routes>
      <Route
        index
        element={
          <MemberList
            members={list}
            onAdd={addMember}
            onDelete={deleteMember}
            onToggleBlock={toggleBlock}
          />
        }
      />
      <Route path=":memberId" element={<MemberDetail members={list} />} />
    </Routes>
  )
}
