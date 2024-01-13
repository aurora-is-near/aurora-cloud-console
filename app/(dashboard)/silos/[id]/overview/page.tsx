"use client"

import Chart from "../../Chart"
import Contact from "@/components/Contact"
import TransactionsCharts from "../../TransactionsCharts"
import { useChartInterval } from "../../../../../hooks/useChartInterval"
import { useNotFoundError } from "../../../../../hooks/useNotFoundError"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { useQuery } from "@tanstack/react-query"

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const [interval, setInterval] = useChartInterval()
  const { data: silo, error } = useQuery(
    getQueryFnAndKey("getSilo", {
      id: Number(id),
    }),
  )

  const { data: transactions } = useQuery(
    getQueryFnAndKey("getSiloTransactions", {
      id: Number(id),
      interval,
    }),
  )

  useNotFoundError(error)

  return (
    <div className="space-y-4 sm:space-y-5">
      <section>
        <TransactionsCharts
          title={silo?.name ?? ""}
          charts={transactions?.items.map((item) => item.chart)}
          interval={interval}
          setInterval={setInterval}
        />
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
