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
import { useState } from "react"
import { apiClient } from "../../../utils/api/client"
import { useQuery } from "@tanstack/react-query"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
)

type TransactionsChartsProps = {
  title: string
  transactions?: Transactions
  interval?: string | null
  setInterval?: (value: string | null) => void
}

const getTotalCount = (
  key: "transactionsCount" | "walletsCount",
  data?: Transactions,
): number | undefined => data?.items.reduce((acc, item) => acc + item[key], 0)

const TransactionsCharts = ({
  title,
  transactions,
  interval,
  setInterval,
}: TransactionsChartsProps) => {
  const legend = transactions?.items.map(({ label }) => label) ?? []
  const transactionsCount = getTotalCount("transactionsCount", transactions)
  const walletsCount = getTotalCount("walletsCount", transactions)
  const isLoading = !transactions

  const walletsPerDayData = getLineChartData("walletsPerDay", transactions)
  const transactionsPerDayData = getLineChartData(
    "transactionsPerDay",
    transactions,
  )

  return (
    <TabCharts
      dateOptions={CHART_DATE_OPTIONS}
      selectedDateOption={interval}
      onDateOptionChange={setInterval}
      tabs={[
        {
          title: "Total transactions",
          value: transactionsCount?.toLocaleString() ?? "...",
          chart: isLoading ? null : (
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
              data={transactionsPerDayData}
            />
          ),
          legend,
        },
        {
          title: "Total wallets",
          value: walletsCount?.toLocaleString() ?? "...",
          chart: isLoading ? null : (
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
              data={walletsPerDayData}
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
          chart: isLoading ? null : (
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
              data={{
                labels: transactionsPerDayData.labels,
                datasets: transactionsPerDayData.datasets.map(
                  (dataset, datasetIndex) => ({
                    ...dataset,
                    data: dataset.data.map((dailyTx, valueIndex) => {
                      const dailyWallets =
                        walletsPerDayData.datasets[datasetIndex].data[
                          valueIndex
                        ]

                      return (dailyTx / dailyWallets).toFixed(2)
                    }),
                  }),
                ),
              }}
            />
          ),
          legend,
        },
      ]}
    >
      <Heading tag="h2">{title}</Heading>
    </TabCharts>
  )
}

export default TransactionsCharts
