import { ReactNode } from "react"

import { isAdmin } from "@/actions/is-admin"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { MainDashboardLayout } from "@/components/MainDashboardLayout"

const Layout = async ({
  children,
  params: { teamKey },
}: {
  children: ReactNode
  params: { teamKey: string }
}) => {
  const isAdminUser = await isAdmin()
  const team = await getTeamByKey(teamKey)

  return (
    <MainDashboardLayout team={team} showAdminMenu={isAdminUser}>
      {children}
    </MainDashboardLayout>
  )
}

export default Layout
