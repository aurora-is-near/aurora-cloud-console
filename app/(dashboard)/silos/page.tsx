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
import Contact from "@/components/Contact"
import TabCharts from "@/components/TabCharts"
import Chart from "./Chart"
import { useTransactions } from "../../../utils/api/queries"
import { Line } from "react-chartjs-2"
import { useState } from "react"
import { CHART_DATE_OPTIONS } from "../../../constants/charts"
import { getLineChartData } from "../../../utils/charts"
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

export const getAllSilosTotal = (
  key: "transactionsCount" | "walletsCount",
  data?: Transactions,
): number | undefined => data?.silos.reduce((acc, item) => acc + item[key], 0)

const Page = () => {
  const [interval, setInterval] = useState<string | null>(
    CHART_DATE_OPTIONS[0].value,
  )

  const { data } = useTransactions({ interval })
  const legend = data?.silos.map(({ label }) => label) ?? []
  const transactionsCount = getAllSilosTotal("transactionsCount", data)
  const walletsCount = getAllSilosTotal("walletsCount", data)

  return (
    <div className="space-y-4 sm:space-y-5">
      <section>
        <TabCharts
          dateOptions={CHART_DATE_OPTIONS}
          selectedDateOption={interval}
          onDateOptionChange={setInterval}
          tabs={[
            {
              title: "Total transactions",
              value: transactionsCount?.toLocaleString() ?? "...",
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
              value: walletsCount?.toLocaleString() ?? "...",
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
              title: "Avg transactions per wallet",
              value:
                transactionsCount && walletsCount
                  ? (transactionsCount / walletsCount)
                      .toFixed(2)
                      .toLocaleString()
                  : "...",
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
