"use client"

import Chart from "../../Chart"
import Contact from "@/components/Contact"
import TransactionsCharts from "../../TransactionsCharts"
import { useChartInterval } from "../../../../../hooks/useChartInterval"
import { useNotFoundError } from "../../../../../hooks/useNotFoundError"
import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { getQueryKey } from "@/utils/api/query-keys"

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const [interval, setInterval] = useChartInterval()
  const { data: silo, error } = useQuery({
    queryFn: () => apiClient.getSilo({ id: Number(id) }),
    queryKey: getQueryKey("getSilo", { id }),
  })

  const { data: transactions } = useQuery({
    queryFn: () => apiClient.getSiloTransactions({ interval, id: Number(id) }),
    queryKey: getQueryKey("getSiloTransactions", { interval, id }),
  })

  useNotFoundError(error)

  return (
    <div className="space-y-4 sm:space-y-5">
      <section>
        <TransactionsCharts
          title={silo?.name ?? ""}
          transactions={transactions}
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
