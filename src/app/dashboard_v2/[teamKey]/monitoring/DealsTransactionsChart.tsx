"use client"

import { useDealsTransactions } from "@/hooks/useDealsTransactions"
import { useChartInterval } from "@/hooks/useChartInterval"
import TransactionsCharts from "@/components/TransactionsCharts"

export const DealsTransactionsCharts = () => {
  const [interval, setInterval] = useChartInterval()
  const { data: transactions } = useDealsTransactions({ interval })

  return (
    <TransactionsCharts
      title="Monitoring"
      interval={interval}
      setInterval={setInterval}
      charts={transactions?.items.map((item) => item.data)}
    />
  )
}
