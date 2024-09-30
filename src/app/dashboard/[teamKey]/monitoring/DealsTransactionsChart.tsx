"use client"

import { useDealsTransactions } from "@/hooks/useDealsTransactions"
import { useChartInterval } from "@/hooks/useChartInterval"
import TransactionsCharts from "@/components/TransactionsCharts"

interface ChartProps {
  title?: string
}

export const DealsTransactionsCharts = ({ title }: ChartProps) => {
  const [interval, setInterval] = useChartInterval()
  const { data: transactions } = useDealsTransactions({ interval })

  return (
    <TransactionsCharts
      title={title ?? "Monitoring"}
      interval={interval}
      setInterval={setInterval}
      charts={transactions?.items.map((item) => item.data)}
    />
  )
}
