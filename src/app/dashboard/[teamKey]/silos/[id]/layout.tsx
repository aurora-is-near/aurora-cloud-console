import { ReactNode } from "react"
import { notFound } from "next/navigation"
import { isAdmin } from "@/actions/is-admin"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { MainDashboardLayout } from "@/components/MainDashboardLayout"
import { SiloSelect } from "@/components/SiloSelect"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"
import { getTeamDealsByKey } from "@/actions/team-deals/get-team-deals-by-key"

const Layout = async ({
  children,
  params: { id, teamKey },
}: {
  children: ReactNode
  params: { id: string; teamKey: string }
}) => {
  const [isAdminUser, team, deals] = await Promise.all([
    isAdmin(),
    getTeamByKey(teamKey),
    getTeamDealsByKey(teamKey),
  ])

  const silos = await getTeamSilos(team.id)
  const silo = silos.find((siloPredicate) => siloPredicate.id === Number(id))

  // Protect against unauthorised access to another team's silo
  if (!silo) {
    notFound()
  }

  return (
    <MainDashboardLayout
      teamKey={teamKey}
      silo={silo}
      deals={deals}
      showAdminMenu={isAdminUser}
      sidebarAction={<SiloSelect defaultValue={Number(id)} silos={silos} />}
    >
      {children}
    </MainDashboardLayout>
  )
}

export default Layout
