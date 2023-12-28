"use client"

import Contact from "@/components/Contact"
import Heading from "@/components/Heading"
import DealsList from "./DealsList"
import TransactionsCharts from "../../silos/TransactionsCharts"
import { useChartInterval } from "../../../../hooks/useChartInterval"
import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/utils/api/client"
import { getQueryKey } from "@/utils/api/query-keys"

const Page = () => {
  const [interval, setInterval] = useChartInterval()
  const { data: transactions } = useQuery({
    queryFn: () => apiClient.getDealsTransactions({ interval }),
    queryKey: getQueryKey("getDealsTransactions", { interval }),
  })

  return (
    <div className="space-y-8 sm:space-y-10 md:space-y-12">
      <section>
        <TransactionsCharts
          title="Summary"
          interval={interval}
          setInterval={setInterval}
          transactions={transactions}
        />
      </section>

      <section>
        <Heading tag="h2" className="mb-4 sm:mb-5 md:mb-7">
          Deals
        </Heading>

        <DealsList />
      </section>

      <Contact />
    </div>
  )
}

export default Page
