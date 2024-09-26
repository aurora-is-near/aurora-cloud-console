"use client"

import { redirect } from "next/navigation"
import Contact from "@/components/Contact"
import { SilosTransactionsCharts } from "@/app/dashboard/[teamKey]/silos/SilosTransactionsCharts"
import { useRequiredContext } from "@/hooks/useRequiredContext"
import { TeamContext } from "@/providers/TeamProvider"

const Page = () => {
  const { team, silos } = useRequiredContext(TeamContext)

  // If the team has a single silo, redirect to it
  if (silos.length === 1) {
    return redirect(
      `/dashboard_v2/${team.team_key}/configuration/${silos[0].id}`,
    )
  }

  return (
    <>
      <section className="mb-3">
        <SilosTransactionsCharts />
      </section>

      <Contact teamKey={team.team_key} text="Need help setting up a silo?" />
    </>
  )
}

export default Page
