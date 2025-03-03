import { ReactNode } from "react"
import { notFound } from "next/navigation"
import { isAdmin } from "@/actions/is-admin"
import { MainDashboardLayout } from "@/components/MainDashboardLayout"
import { SiloSelect } from "@/components/SiloSelect"
import { getTeamDealsByKey } from "@/actions/team-deals/get-team-deals-by-key"
import { getTeamSilosByKey } from "@/actions/team-silos/get-team-silos-by-key"

const Layout = async ({
  children,
  params: { id, teamKey },
}: {
  children: ReactNode
  params: { id: string; teamKey: string }
}) => {
  const [isAdminUser, silos, deals] = await Promise.all([
    isAdmin(),
    getTeamSilosByKey(teamKey),
    getTeamDealsByKey(teamKey),
  ])

  const silo = silos.find((siloPredicate) => siloPredicate.id === Number(id))

  // Protect against unauthorized access to another team's silo
  if (!silo) {
    notFound()
  }

  return (
    <MainDashboardLayout
      teamKey={teamKey}
      silo={silo}
      deals={deals}
      showAdminMenu={isAdminUser}
      sidebarAction={
        silos.length > 1 ? (
          <SiloSelect defaultValue={Number(id)} silos={silos} />
        ) : undefined
      }
    >
      {children}
    </MainDashboardLayout>
  )
}

export default Layout
