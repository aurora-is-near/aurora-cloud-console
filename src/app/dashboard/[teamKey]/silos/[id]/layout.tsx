import { ReactNode } from "react"
import { notFound } from "next/navigation"
import { getTeam } from "@/actions/teams/get-team"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"

export default async function Layout({
  children,
  params: { id, teamKey },
}: {
  children: ReactNode
  params: { id: string; teamKey: string }
}) {
  const team = await getTeam(teamKey)
  const silo = await getTeamSilo(team.id, Number(id))

  // Protect against unauthorised access to another team's silo
  if (!silo) {
    notFound()
  }

  return <>{children}</>
}
