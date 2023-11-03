"use client"

import "chartjs-adapter-date-fns"
import Heading from "@/components/Heading"
import Contact from "@/components/Contact"
import TabCharts from "@/components/TabCharts"
import Chart from "./Chart"
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
import { useTransactions } from "../../../utils/api/queries"
import { Line, ChartProps } from "react-chartjs-2"
import { Transactions } from "../../../types/types"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
)

const COLOURS = ["#4ade80", "#22d3ee", "#fb923c", "#c084fc"]

const getTotalCount = (
  key: "transactionsCount" | "walletsCount",
  data?: Transactions,
): string =>
  data?.silos.reduce((acc, item) => acc + item[key], 0).toLocaleString() ?? ""

const getDates = (
  key: "transactionsPerDay" | "walletsPerDay",
  data?: Transactions,
): string[] =>
  data?.silos.reduce<string[]>((acc, item) => {
    acc.push(...item[key].map(({ day }) => day))

    return acc
  }, []) ?? []

const getLineChartData = (
  key: "transactionsPerDay" | "walletsPerDay",
  data?: Transactions,
) => ({
  labels: getDates("transactionsPerDay", data),
  datasets:
    data?.silos.map((silo, index) => ({
      label: silo.label,
      data: silo[key].map(({ count }) => count),
      borderColor: COLOURS[index % COLOURS.length],
      backgroundColor: COLOURS[index % COLOURS.length],
    })) ?? [],
})

const Page = () => {
  const { data } = useTransactions()
  const legend = data?.silos.map(({ label }) => label) ?? []

  return (
    <div className="space-y-4 sm:space-y-5">
      <section>
        <TabCharts
          tabs={[
            {
              title: "Total transactions",
              value: getTotalCount("transactionsCount", data),
              chart: (
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
                  data={getLineChartData("transactionsPerDay", data)}
                />
              ),
              legend,
            },
            {
              title: "Total wallets",
              value: getTotalCount("walletsCount", data),
              chart: (
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
                  data={getLineChartData("walletsPerDay", data)}
                />
              ),
              legend,
            },
            {
              title: "Total balances",
              value: "$2,320,021",
              chart: <></>,
              legend,
            },
          ]}
        >
          <Heading tag="h2">Summary</Heading>
        </TabCharts>
      </section>

      <section className="grid md:grid-cols-2 gap-y-5 gap-x-2.5">
        <Chart
          title="Latency"
          subtitle="Last 24 hours"
          className="md:col-span-2"
          legend={["10%", "25%", "50%", "100%"]}
        />
        <Chart title="RPC Requests" />
        <Chart title="Failure rate" />
      </section>

      <Contact text="Need help setting up a silo?" />
    </div>
  )
}

export default Page
