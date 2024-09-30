"use client"

import { useQuery } from "@tanstack/react-query"
import { getQueryFnAndKey } from "@/utils/api/queries"
import TransactionsCharts from "../../../../../../components/TransactionsCharts"
import { useChartInterval } from "../../../../../../hooks/useChartInterval"

type SiloTransactionsChartsProps = {
  siloId: number
}

export const SiloTransactionsCharts = ({
  siloId,
}: SiloTransactionsChartsProps) => {
  const [interval, setInterval] = useChartInterval()
  const { data: silo } = useQuery(
    getQueryFnAndKey("getSilo", {
      id: siloId,
    }),
  )

  const { data: transactions, isError: isGetSiloTransactionsError } = useQuery(
    getQueryFnAndKey("getSiloTransactions", {
      id: siloId,
      interval: interval ?? undefined,
    }),
  )

  return (
    <TransactionsCharts
      title={silo?.name ?? ""}
      charts={transactions?.items.map((item) => item.data)}
      interval={interval}
      setInterval={setInterval}
      hasError={isGetSiloTransactionsError}
    />
  )
}
