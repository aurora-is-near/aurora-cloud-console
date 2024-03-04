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
import { CHART_DATE_OPTIONS } from "../constants/charts"
import { getLineChartData } from "../utils/charts"
import { ReactNode } from "react"
import { TransactionDataSchema } from "@/types/api-schemas"

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
  title: ReactNode
  charts?: TransactionDataSchema[]
  interval: string | null
  setInterval: (value: string | null) => void
}

const getTotalCount = (
  key: "transactionsCount" | "walletsCount",
  charts?: TransactionDataSchema[],
): number | undefined => charts?.reduce((acc, item) => acc + item[key], 0) ?? 0

const TransactionsCharts = ({
  title,
  charts,
  interval,
  setInterval,
}: TransactionsChartsProps) => {
  const legend = charts?.map(({ label }) => label) ?? []
  const transactionsCount = getTotalCount("transactionsCount", charts)
  const walletsCount = getTotalCount("walletsCount", charts)
  const isLoading = !charts

  const walletsPerDayData = getLineChartData("walletsPerDay", charts)
  const transactionsPerDayData = getLineChartData("transactionsPerDay", charts)

  return (
    <TabCharts
      dateOptions={CHART_DATE_OPTIONS}
      selectedDateOption={interval}
      onDateOptionChange={setInterval}
      tabs={[
        {
          title: "Total transactions",
          value: transactionsCount,
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
          value: walletsCount,
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
              ? transactionsCount / walletsCount
              : undefined,
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
