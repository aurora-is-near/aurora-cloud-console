import { ReactNode } from "react"
import { redirect } from "next/navigation"
import { MainDashboardLayout } from "@/components/MainDashboardLayout"
import { getAuthUser } from "@/actions/auth-user/get-auth-user"
import { getFirstTeamSiloId } from "@/actions/team-silos/get-first-team-silo-id"

const Layout = async ({
  children,
  params: { teamKey },
}: {
  children: ReactNode
  params: { teamKey: string }
}) => {
  const [authUser, siloId] = await Promise.all([
    getAuthUser(),
    getFirstTeamSiloId(teamKey),
  ])

  if (siloId) {
    redirect(`/dashboard/${teamKey}/silos/${siloId}`)
  }

  return (
    <MainDashboardLayout teamKey={teamKey} authUser={authUser}>
      {children}
    </MainDashboardLayout>
  )
}

export default Layout
