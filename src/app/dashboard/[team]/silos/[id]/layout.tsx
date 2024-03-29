import { ReactNode } from "react"
import { notFound } from "next/navigation"
import { getCurrentTeamSilo } from "@/actions/current-team/get-current-team-silo"

export default async function Layout({
  children,
  params: { id },
}: {
  children: ReactNode
  params: { id: string }
}) {
  const silo = await getCurrentTeamSilo(Number(id))

  // Protect against unauthorised access to another team's silo
  if (!silo) {
    notFound()
  }

  return <>{children}</>
}
