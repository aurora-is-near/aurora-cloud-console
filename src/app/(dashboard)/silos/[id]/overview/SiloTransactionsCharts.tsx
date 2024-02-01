"use client"

import TransactionsCharts from "../../../../../components/TransactionsCharts"
import { useChartInterval } from "../../../../../hooks/useChartInterval"
import { useNotFoundError } from "../../../../../hooks/useNotFoundError"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { useQuery } from "@tanstack/react-query"

type SiloTransactionsChartsProps = {
  siloId: number
}

export const SiloTransactionsCharts = ({
  siloId,
}: SiloTransactionsChartsProps) => {
  const [interval, setInterval] = useChartInterval()
  const { data: silo, error } = useQuery(
    getQueryFnAndKey("getSilo", {
      id: siloId,
    }),
  )

  const { data: transactions } = useQuery(
    getQueryFnAndKey("getSiloTransactions", {
      id: siloId,
      interval,
    }),
  )

  useNotFoundError(error)

  return (
    <TransactionsCharts
      title={silo?.name ?? ""}
      charts={transactions?.items.map((item) => item.chart)}
      interval={interval}
      setInterval={setInterval}
    />
  )
}
