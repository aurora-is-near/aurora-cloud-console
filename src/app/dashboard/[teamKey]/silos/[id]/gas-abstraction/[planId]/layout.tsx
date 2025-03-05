import { ReactNode } from "react"
import { notFound } from "next/navigation"
import { getTeamDealByKey } from "@/actions/team-deals/get-team-deal-by-key"

const Layout = async ({
  children,
  params: { planId, teamKey },
}: {
  children: ReactNode
  params: { planId: string; teamKey: string }
}) => {
  const deal = await getTeamDealByKey(teamKey, Number(planId))

  // Protect against unauthorised access to another team's deal
  if (!deal) {
    notFound()
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}

export default Layout
