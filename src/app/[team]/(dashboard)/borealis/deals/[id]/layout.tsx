import { ReactNode } from "react"
import { notFound } from "next/navigation"
import { getCurrentTeamDeal } from "@/actions/current-team/get-current-team-deal"

export default async function Layout({
  children,
  params: { id },
}: {
  children: ReactNode
  params: { id: string }
}) {
  const deal = await getCurrentTeamDeal(Number(id))

  // Protect against unauthorised access to another team's deal
  if (!deal) {
    notFound()
  }

  return <>{children}</>
}
