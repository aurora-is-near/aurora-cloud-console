import { ReactNode } from "react"
import { notFound } from "next/navigation"
import { getTeamDeal } from "@/actions/team-deals/get-team-deal"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"

const Layout = async ({
  children,
  params: { planId, teamKey },
}: {
  children: ReactNode
  params: { planId: string; teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)
  const deal = await getTeamDeal(team.id, Number(planId))

  // Protect against unauthorised access to another team's deal
  if (!deal) {
    notFound()
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}

export default Layout
