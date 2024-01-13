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
import { Line } from "react-chartjs-2"
import Heading from "@/components/Heading"
import TabCharts from "@/components/TabCharts"
import { CHART_DATE_OPTIONS } from "../../../constants/charts"
import { getLineChartData } from "../../../utils/charts"
import { TransactionChart } from "../../../types/types"

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
  charts?: TransactionChart[]
  interval?: string | null
  setInterval?: (value: string | null) => void
}

const getTotalCount = (
  key: "transactionsCount" | "walletsCount",
  charts?: TransactionChart[],
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
