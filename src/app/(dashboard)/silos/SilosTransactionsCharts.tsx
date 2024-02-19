"use client"

import TransactionsCharts from "../../../components/TransactionsCharts"
import { useChartInterval } from "../../../hooks/useChartInterval"
import { useSilosTransactions } from "@/hooks/useSilosTransactions"

export const SilosTransactionsCharts = () => {
  const [interval, setInterval] = useChartInterval()
  const { data: transactions } = useSilosTransactions({ interval })

  return (
    <TransactionsCharts
      title="Summary"
      interval={interval}
      setInterval={setInterval}
      charts={transactions?.items.map((item) => item.data)}
    />
  )
}
