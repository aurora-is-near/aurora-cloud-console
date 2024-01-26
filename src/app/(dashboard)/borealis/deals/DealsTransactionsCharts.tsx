"use client"

import TransactionsCharts from "../../../../components/TransactionsCharts"
import { useChartInterval } from "../../../../hooks/useChartInterval"
import { useDealsTransactions } from "@/hooks/useDealsTransactions"

export const DealsTransactionsCharts = () => {
  const [interval, setInterval] = useChartInterval()
  const { data: transactions } = useDealsTransactions({ interval })

  return (
    <TransactionsCharts
      title="Summary"
      interval={interval}
      setInterval={setInterval}
      charts={transactions?.items.map((item) => item.chart)}
    />
  )
}
