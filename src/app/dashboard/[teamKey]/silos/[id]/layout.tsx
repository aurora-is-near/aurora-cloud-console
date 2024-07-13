import { ReactNode } from "react"
import { notFound } from "next/navigation"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"

export const Layout = async ({
  children,
  params: { id, teamKey },
}: {
  children: ReactNode
  params: { id: string; teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)
  const silo = await getTeamSilo(team.id, Number(id))

  // Protect against unauthorised access to another team's silo
  if (!silo) {
    notFound()
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}

export default Layout
