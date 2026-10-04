import { createContext, useContext, useMemo } from 'react'
import { useAuth } from '../../shared/AuthContext'
import { members } from '../../mock/members'
import { adminReportData, buildMemberReportData, type ReportData } from '../../mock/reportData'

const ReportDataContext = createContext<ReportData>(adminReportData)

export function ReportDataProvider({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = useAuth()

  const value = useMemo<ReportData>(() => {
    if (isAdmin) return adminReportData
    const member = members.find((m) => m.id === user.id)
    if (!member) return adminReportData
    const teamBookings = members
      .filter((m) => m.role === 'member')
      .reduce((s, m) => s + m.totalBookings, 0)
    return buildMemberReportData(member, teamBookings)
  }, [user.id, isAdmin])

  return <ReportDataContext.Provider value={value}>{children}</ReportDataContext.Provider>
}

export const useReportData = () => useContext(ReportDataContext)
