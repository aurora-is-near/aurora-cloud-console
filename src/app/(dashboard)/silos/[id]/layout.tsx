import { ReactNode } from "react"
import { getCurrentTeam } from "@/utils/current-team"
import { headers } from "next/headers"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { notFound } from "next/navigation"

export default async function Layout({
  children,
  params: { id },
}: {
  children: ReactNode
  params: { id: string }
}) {
  const team = await getCurrentTeam(headers())
  const silo = await getTeamSilo(team.id, Number(id))

  // Protect against unauthorised access to another team's silo
  if (!silo) {
    notFound()
  }

  return <>{children}</>
}
