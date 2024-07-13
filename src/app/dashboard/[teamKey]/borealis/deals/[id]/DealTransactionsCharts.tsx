"use client"

import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { getQueryFnAndKey } from "@/utils/api/queries"
import ToggleDeal from "@/components/ToggleDeal"
import { useChartInterval } from "../../../../../../hooks/useChartInterval"
import TransactionsCharts from "../../../../../../components/TransactionsCharts"

export const DealTransactionCharts = () => {
  const { id } = useParams<{ id: string }>()
  const [interval, setInterval] = useChartInterval()
  const { data: deal } = useQuery(
    getQueryFnAndKey("getDeal", { id: Number(id) }),
  )

  const { data: transactions, isError: isTransactionsError } = useQuery(
    getQueryFnAndKey("getDealTransactions", {
      id: Number(id),
      interval: interval ?? undefined,
    }),
  )

  return (
    <TransactionsCharts
      title={
        <div className="flex flex-row items-center gap-x-4">
          <ToggleDeal dealId={Number(id)} />
          {deal?.name ?? ""}
        </div>
      }
      interval={interval}
      setInterval={setInterval}
      charts={transactions?.items.map((item) => item.data)}
      hasError={isTransactionsError}
    />
  )
}
