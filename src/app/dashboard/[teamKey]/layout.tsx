import { ReactNode } from "react"
import { mainExtraNavigation, getMainNavigation } from "@/navigation"
import { DashboardLayout } from "@/components/DashboardLayout"
import { getTeam } from "@/actions/teams/get-team"

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode
  params: { teamKey: string }
}) {
  const team = await getTeam(params.teamKey)

  return (
    <DashboardLayout
      mainMenuItems={await getMainNavigation(team)}
      extraMenuItems={mainExtraNavigation}
    >
      {children}
    </DashboardLayout>
  )
}
