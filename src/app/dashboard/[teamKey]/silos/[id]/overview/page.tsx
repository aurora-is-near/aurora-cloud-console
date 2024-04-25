import Chart from "../../Chart"
import Contact from "@/components/Contact"
import { SiloTransactionsCharts } from "./SiloTransactionsCharts"
import { DashboardPage } from "@/components/DashboardPage"

const Page = ({
  params: { id, teamKey },
}: {
  params: { id: string; teamKey: string }
}) => {
  return (
    <DashboardPage>
      <section>
        <SiloTransactionsCharts siloId={Number(id)} />
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
