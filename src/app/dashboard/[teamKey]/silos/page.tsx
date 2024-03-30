import Contact from "@/components/Contact"
import Chart from "./Chart"
import { SilosTransactionsCharts } from "@/app/dashboard/[teamKey]/silos/SilosTransactionsCharts"
import { DashboardPage } from "@/components/DashboardPage"
import { redirect } from "next/navigation"
import { getTeamByKey } from "@/actions/teams/get-team-by-key"
import { getTeamSilos } from "@/actions/team-silos/get-team-silos"

const Page = async ({
  params: { teamKey },
}: {
  params: { teamKey: string }
}) => {
  const team = await getTeamByKey(teamKey)
  const silos = await getTeamSilos(team.id)

  // If the team has a single silo, redirect to its overview page
  if (silos.length === 1) {
    return redirect(`/dashboard/${teamKey}/silos/${silos[0].id}/overview`)
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

      <Contact teamKey={teamKey} text="Need help setting up a silo?" />
    </DashboardPage>
  )
}

export default Page
