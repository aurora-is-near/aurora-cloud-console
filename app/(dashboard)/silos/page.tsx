"use client"

import Heading from "@/components/Heading"
import Contact from "@/components/Contact"
import TabCharts from "@/components/TabCharts"
import Chart from "./Chart"
import { useTransactions } from "../../../utils/api/queries"

const Page = () => {
  const { data } = useTransactions()

  return (
    <div className="space-y-4 sm:space-y-5">
      <section>
        <TabCharts
          tabs={[
            {
              title: "Total transactions",
              value: data?.totalTransactions.toLocaleString(),
              chart: <></>,
              legend: ["Silo 1", "Silo 2"],
            },
            {
              title: "Total wallets",
              value: data?.totalWallets.toLocaleString(),
              chart: <></>,
              legend: ["Silo 1", "Silo 2"],
            },
            {
              title: "Total balances",
              value: "$2,320,021",
              chart: <></>,
              legend: ["Silo 1", "Silo 2"],
            },
          ]}
        >
          <Heading tag="h2">Summary</Heading>
        </TabCharts>
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
