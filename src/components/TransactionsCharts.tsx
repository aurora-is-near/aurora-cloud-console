"use client"

import "chartjs-adapter-date-fns"
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  LineElement,
  PointElement,
  TimeScale,
  Title,
  Tooltip,
} from "chart.js"
import { Bar, Line } from "react-chartjs-2"
import { ComponentProps, ReactNode } from "react"
import Heading from "@/components/Heading"
import TabCharts from "@/components/TabCharts"
import { TransactionDataSchema } from "@/types/api-schemas"
import { CHART_DATE_OPTIONS } from "../constants/charts"
import { getTransactionChartData } from "../utils/charts"

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
  hasError?: boolean
}

const LINE_CHART_OPTIONS: ComponentProps<typeof Line>["options"] = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: "time",
      time: {
        unit: "month",
      },
    },
    y: {
      ticks: {
        precision: 0,
      },
    },
  },
}

const BAR_CHART_OPTIONS: ComponentProps<typeof Bar>["options"] = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: "time",
      time: {
        unit: "month",
      },
    },
    y: {
      ticks: {
        precision: 0,
      },
    },
  },
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
  hasError,
}: TransactionsChartsProps) => {
  const legend = charts?.map(({ label }) => label) ?? []
  const transactionsCount = getTotalCount("transactionsCount", charts)
  const walletsCount = getTotalCount("walletsCount", charts)
  const isLoading = !charts

  const walletsPerDayData = getTransactionChartData("walletsPerDay", charts)
  const transactionsPerDayData = getTransactionChartData(
    "transactionsPerDay",
    charts,
  )

  return (
    <TabCharts
      isLoading={isLoading}
      dateOptions={CHART_DATE_OPTIONS}
      selectedDateOption={interval}
      onDateOptionChange={setInterval}
      hasError={hasError}
      tabs={[
        {
          title: "Total transactions",
          value: transactionsCount,
          chart: isLoading ? null : (
            <Bar options={BAR_CHART_OPTIONS} data={transactionsPerDayData} />
          ),
          legend,
        },
        {
          title: "Total wallets",
          value: walletsCount,
          chart: isLoading ? null : (
            <Line options={LINE_CHART_OPTIONS} data={walletsPerDayData} />
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
              options={LINE_CHART_OPTIONS}
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
