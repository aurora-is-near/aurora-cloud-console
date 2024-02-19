import Contact from "@/components/Contact"
import Chart from "./Chart"
import { SilosTransactionsCharts } from "@/app/(dashboard)/silos/SilosTransactionsCharts"
import { DashboardPage } from "@/components/DashboardPage"
import { getCurrentTeam } from "@/utils/current-team"
import { headers } from "next/headers"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"
import { redirect } from "next/navigation"

const Page = async () => {
  const team = await getCurrentTeam(headers())
  const silos = await getTeamSilos(team.id)

  // If the team has a single silo, redirect to its overview page
  if (silos.length === 1) {
    return redirect(`/silos/${silos[0].id}/overview`)
  }

  return (
    <DashboardPage>
      <section>
        <SilosTransactionsCharts />
      </section>

      <section className="grid md:grid-cols-2 gap-y-5 gap-x-2.5">
        <Chart
          title="Latency"
          subtitle="Last 24 hours"
          className="md:col-span-2"
          legend={["10%", "25%", "50%", "100%"]}
        />
        <Chart title="RPC Requests" />
        <Chart title="Failure rate" />
      </section>

      <Contact text="Need help setting up a silo?" />
    </DashboardPage>
  )
}

export default Page
