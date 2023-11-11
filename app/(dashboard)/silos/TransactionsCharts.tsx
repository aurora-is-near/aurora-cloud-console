"use client"

import "chartjs-adapter-date-fns"
import {
  Chart as ChartJS,
  CategoryScale,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js"
import Heading from "@/components/Heading"
import TabCharts from "@/components/TabCharts"
import { Line } from "react-chartjs-2"
import { CHART_DATE_OPTIONS } from "../../../constants/charts"
import { getLineChartData } from "../../../utils/charts"
import { Transactions } from "../../../types/types"
import { useEffect, useState } from "react"
import { apiClient } from "../../../utils/api/client"
import { useQuery } from "@tanstack/react-query"
import { notFound } from "next/navigation"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
)

type TransactionsChartsTypeWithoutId = "deals" | "silos"
type TransactionsChartsTypeWithId = "deal" | "silo"
type TransactionsChartsType =
  | TransactionsChartsTypeWithId
  | TransactionsChartsTypeWithoutId

type TransactionsChartsProps =
  | { type: TransactionsChartsTypeWithId; id: string }
  | { type: TransactionsChartsTypeWithoutId; id?: never }

const getTotalCount = (
  key: "transactionsCount" | "walletsCount",
  data?: Transactions,
): number | undefined => data?.items.reduce((acc, item) => acc + item[key], 0)

const getTransactions = async (
  type: TransactionsChartsType,
  id?: string,
  interval?: string,
): Promise<Transactions> => {
  if (type === "deals") {
    return apiClient.getDealsTransactions({ interval })
  }

  if (type === "silos") {
    return apiClient.getSilosTransactions({ interval })
  }

  if (typeof id !== "string") {
    throw new Error(`Invalid id "${id}" for type "${type}"`)
  }

  if (type === "deal") {
    return apiClient.getDealTransactions({ id, interval })
  }

  if (type === "silo") {
    return apiClient.getSiloTransactions({ id, interval })
  }

  throw new Error(`Invalid type: ${type}`)
}

const getTitle = async (
  type: TransactionsChartsType,
  id?: string,
): Promise<string> => {
  if (["deals", "silos"].includes(type)) {
    return "Summary"
  }

  if (typeof id !== "string") {
    throw new Error(`Invalid id "${id}" for type "${type}"`)
  }

  if (type === "deal") {
    return (await apiClient.getDeal({ id })).name
  }

  if (type === "silo") {
    return (await apiClient.getSilo({ id })).name
  }

  throw new Error(`Invalid type: ${type}`)
}

const TransactionsCharts = ({ id, type }: TransactionsChartsProps) => {
  const [selectedDateOption, setSelectedDateOption] = useState(
    CHART_DATE_OPTIONS[0].value,
  )

  const interval = selectedDateOption ?? undefined
  const { data: transactions, isLoading: isTransactionsLoading } = useQuery({
    queryKey: ["transactions", type, interval, id],
    queryFn: () => getTransactions(type, id, interval),
  })

  const { data: title } = useQuery({
    queryKey: ["title", type, id],
    queryFn: () => getTitle(type, id),
  })

  const legend = transactions?.items.map(({ label }) => label) ?? []
  const transactionsCount = getTotalCount("transactionsCount", transactions)
  const walletsCount = getTotalCount("walletsCount", transactions)

  return (
    <TabCharts
      dateOptions={CHART_DATE_OPTIONS}
      selectedDateOption={selectedDateOption}
      onDateOptionChange={setSelectedDateOption}
      tabs={[
        {
          title: "Total transactions",
          value: transactionsCount?.toLocaleString() ?? "...",
          chart: isTransactionsLoading ? null : (
            <Line
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    type: "time",
                    time: {
                      unit: "month",
                    },
                  },
                },
              }}
              data={getLineChartData("transactionsPerDay", transactions)}
            />
          ),
          legend,
        },
        {
          title: "Total wallets",
          value: walletsCount?.toLocaleString() ?? "...",
          chart: isTransactionsLoading ? null : (
            <Line
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    type: "time",
                    time: {
                      unit: "month",
                    },
                  },
                },
              }}
              data={getLineChartData("walletsPerDay", transactions)}
            />
          ),
          legend,
        },
        {
          title: "Avg transactions per wallet",
          value:
            transactionsCount && walletsCount
              ? (transactionsCount / walletsCount).toFixed(2).toLocaleString()
              : "...",
          chart: <></>,
          legend,
        },
      ]}
    >
      <Heading tag="h2">{title}</Heading>
    </TabCharts>
  )
}

export default TransactionsCharts
