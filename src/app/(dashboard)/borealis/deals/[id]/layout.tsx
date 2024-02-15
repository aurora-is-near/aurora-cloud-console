import { UserRateLimitsModal } from "@/app/(dashboard)/borealis/deals/[id]/UserRateLimitsModal"
import { ReactNode } from "react"
import { getCurrentTeam } from "@/utils/current-team"
import { headers } from "next/headers"
import { notFound } from "next/navigation"
import { getTeamDeal } from "@/actions/admin/team-deals/get-team-deal"

export default async function Layout({
  children,
  params: { id },
}: {
  children: ReactNode
  params: { id: string }
}) {
  const team = await getCurrentTeam(headers())
  const deal = await getTeamDeal(team.id, Number(id))

  // Protect against unauthorised access to another team's deal
  if (!deal) {
    notFound()
  }

  return (
    <>
      {children}
      <UserRateLimitsModal />
    </>
  )
}
