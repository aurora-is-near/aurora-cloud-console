import { ReactNode } from "react"
import { getMainExtraNavigation, getMainNavigation } from "@/navigation"
import { DashboardLayout } from "@/components/DashboardLayout"
import { getTeam } from "@/actions/teams/get-team"

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode
  params: { teamKey: string }
}) {
  const { teamKey } = params
  const team = await getTeam(teamKey)

  return (
    <DashboardLayout
      mainMenuItems={await getMainNavigation(team)}
      extraMenuItems={getMainExtraNavigation(teamKey)}
    >
      {children}
    </DashboardLayout>
  )
}
