import { ReactNode } from "react"
import { getMainExtraNavigation, getMainNavigation } from "@/navigation"
import { DashboardLayout } from "@/components/DashboardLayout"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode
  params: { teamKey: string }
}) {
  const { teamKey } = params
  const team = await getTeamByKey(teamKey)

  return (
    <DashboardLayout
      mainMenuItems={await getMainNavigation(team)}
      extraMenuItems={getMainExtraNavigation(teamKey)}
    >
      {children}
    </DashboardLayout>
  )
}
