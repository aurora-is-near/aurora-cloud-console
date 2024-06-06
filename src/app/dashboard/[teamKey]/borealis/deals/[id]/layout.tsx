import { ReactNode } from "react"
import { notFound } from "next/navigation"
import { getTeamDeal } from "@/actions/team-deals/get-team-deal"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"

export default async function Layout({
  children,
  params: { id, teamKey },
}: {
  children: ReactNode
  params: { id: string; teamKey: string }
}) {
  const team = await getTeamByKey(teamKey)
  const deal = await getTeamDeal(team.id, Number(id))

  // Protect against unauthorised access to another team's deal
  if (!deal) {
    notFound()
  }

  return <>{children}</>
}
