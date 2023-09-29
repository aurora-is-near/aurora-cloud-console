import Heading from "@/components/Heading"
import Contact from "@/components/Contact"
import Charts from "@/components/Charts"
import Chart from "./Chart"

const Page = () => {
  return (
    <div className="space-y-5">
      <section>
        <Charts
          tabs={[
            {
              title: "Total transactions",
              value: "354,643",
              chart: "",
              legend: ["Silo 1", "Silo 2"],
            },
            {
              title: "Total wallets",
              value: "13,838",
              chart: "",
              legend: ["Silo 1", "Silo 2"],
            },
            {
              title: "Total balances",
              value: "$2,320,021",
              chart: "",
              legend: ["Silo 1", "Silo 2"],
            },
          ]}
        >
          <Heading tag="h2">Summary</Heading>
        </Charts>
      </section>

      <section className="grid grid-cols-2 gap-y-5 gap-x-2.5">
        <Chart
          title="Latency"
          subtitle="Last 24 hours"
          className="col-span-2"
        />
        <Chart title="RPC Requests" />
        <Chart title="Failure rate" />
      </section>

      <Contact text="Need help setting up a silo?" />
    </div>
  )
}

export default Page
