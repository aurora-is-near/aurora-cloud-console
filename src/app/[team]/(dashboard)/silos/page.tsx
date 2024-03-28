import Contact from "@/components/Contact"
import Chart from "./Chart"
import { SilosTransactionsCharts } from "@/app/[team]/(dashboard)/silos/SilosTransactionsCharts"
import { DashboardPage } from "@/components/DashboardPage"
import { redirect } from "next/navigation"
import { getCurrentTeamSilos } from "@/actions/current-team/get-current-team-silos"

const Page = async () => {
  const silos = await getCurrentTeamSilos()

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
