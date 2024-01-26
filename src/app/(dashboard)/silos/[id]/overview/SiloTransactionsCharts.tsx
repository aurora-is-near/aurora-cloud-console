"use client"

import TransactionsCharts from "../../../../../components/TransactionsCharts"
import { useChartInterval } from "../../../../../hooks/useChartInterval"
import { useNotFoundError } from "../../../../../hooks/useNotFoundError"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"

export const SiloTransactionsCharts = () => {
  const { id } = useParams<{ id: string }>()
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
    <TransactionsCharts
      title={silo?.name ?? ""}
      charts={transactions?.items.map((item) => item.chart)}
      interval={interval}
      setInterval={setInterval}
    />
  )
}
