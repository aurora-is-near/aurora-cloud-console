import Contact from "@/components/Contact"
import Chart from "./Chart"
import { SilosTransactionsCharts } from "@/app/(dashboard)/silos/SilosTransactionsCharts"

const Page = () => {
  return (
    <div className="space-y-4 sm:space-y-5">
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
    </div>
  )
}

export default Page
