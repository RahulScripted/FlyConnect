import { createContext, useContext, useMemo, useState } from 'react'
import { members, ADMIN_ID } from '../mock/members'
import type { Role, SessionUser } from '../types/member'

type AuthState = {
  user: SessionUser
  isAdmin: boolean
  /** Switch the active session (demo helper for admin/member views). */
  switchUser: (id: string) => void
}

const defaultUser: SessionUser = {
  id: ADMIN_ID,
  name: members.find((m) => m.id === ADMIN_ID)?.name ?? 'Admin',
  role: 'admin',
}

const AuthContext = createContext<AuthState>({
  user: defaultUser,
  isAdmin: true,
  switchUser: () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState(defaultUser.id)

  const value = useMemo<AuthState>(() => {
    const found = members.find((m) => m.id === userId)
    const user: SessionUser = found
      ? { id: found.id, name: found.name, role: found.role as Role }
      : defaultUser
    return {
      user,
      isAdmin: user.role === 'admin',
      switchUser: setUserId,
    }
  }, [userId])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
