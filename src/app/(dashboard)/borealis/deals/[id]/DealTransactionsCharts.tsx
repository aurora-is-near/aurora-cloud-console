"use client"

import TransactionsCharts from "../../../../../components/TransactionsCharts"
import { useChartInterval } from "../../../../../hooks/useChartInterval"
import { useNotFoundError } from "../../../../../hooks/useNotFoundError"
import { useQuery } from "@tanstack/react-query"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { useParams } from "next/navigation"
import ToggleDeal from "@/components/ToggleDeal"

export const DealTransactionCharts = () => {
  const { id } = useParams<{ id: string }>()
  const [interval, setInterval] = useChartInterval()
  const { data: silo, error } = useQuery(
    getQueryFnAndKey("getDeal", { id: Number(id) }),
  )

  const { data: transactions } = useQuery(
    getQueryFnAndKey("getDealTransactions", { id: Number(id), interval }),
  )

  useNotFoundError(error)

  return (
    <TransactionsCharts
      title={
        <div className="flex flex-row items-center gap-x-4">
          <ToggleDeal dealId={Number(id)} />
          {silo?.name ?? ""}
        </div>
      }
      interval={interval}
      setInterval={setInterval}
      charts={transactions?.items.map((item) => item.chart)}
    />
  )
}
