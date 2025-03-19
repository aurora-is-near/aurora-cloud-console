import { ReactNode } from "react"
import { notFound } from "next/navigation"
import { MainDashboardLayout } from "@/components/MainDashboardLayout"
import { SiloSelect } from "@/components/SiloSelect"
import { getTeamDealsByKey } from "@/actions/team-deals/get-team-deals-by-key"
import { getTeamSilosByKey } from "@/actions/team-silos/get-team-silos-by-key"
import { getAuthUser } from "@/actions/auth-user/get-auth-user"

const Layout = async ({
  children,
  params: { id, teamKey },
}: {
  children: ReactNode
  params: { id: string; teamKey: string }
}) => {
  const [authUser, silos, deals] = await Promise.all([
    getAuthUser(),
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
      authUser={authUser}
      sidebarAction={<SiloSelect teamKey={teamKey} defaultValue={Number(id)} />}
    >
      {children}
    </MainDashboardLayout>
  )
}

export default Layout
