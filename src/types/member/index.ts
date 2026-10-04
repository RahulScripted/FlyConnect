export type MemberStatus = 'active' | 'blocked'

export type Role = 'admin' | 'member'

/** A team member (agent) managed by the admin. */
export type Member = {
  id: string
  name: string
  initials: string
  email: string
  phone: string
  role: Role
  status: MemberStatus
  joinedAt: string
  color: string
  /** Aggregated performance figures */
  totalBookings: number
  totalRevenue: number
  totalCustomers: number
  messagesSent: number
}

/** The signed-in user. */
export type SessionUser = {
  id: string
  name: string
  role: Role
}
