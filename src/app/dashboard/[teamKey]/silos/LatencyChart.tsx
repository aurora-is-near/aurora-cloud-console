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
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { getGenericLineChartData } from "@/utils/charts"
import { LATENCY_PERCENTILES } from "@/constants/latency"
import Chart from "./Chart"

type LatencyChartProps = {
  id: number
}

type LatencyChartInterval = {
  label: string
  value: number
  unit: string
  interval: string
}

type LatencyChartIntervalKey = "h24" | "h12" | "h1" | "m15"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
)

const INTERVALS: { [x in LatencyChartIntervalKey]: LatencyChartInterval } = {
  h24: { label: "Last 24 hours", value: 24, unit: "h", interval: "now-24h" },
  h12: { label: "Last 12 hours", value: 12, unit: "h", interval: "now-12h" },
  h1: { label: "Last 1 hour", value: 1, unit: "h", interval: "now-1h" },
  m15: { label: "Last 15 minutes", value: 15, unit: "m", interval: "now-15m" },
}

export const LatencyChart = ({ id }: LatencyChartProps) => {
  const [interval, setInterval] = useState<LatencyChartIntervalKey>("h24")
  const { data, isLoading } = useQuery(
    getQueryFnAndKey("getSiloLatency", {
      id,
      interval: INTERVALS[interval].interval,
    }),
  )

  return (
    <Chart
      title="Latency"
      subtitle={
        <select
          name="interval"
          className="block w-full py-4 pl-3 pr-8 text-sm border-0 rounded-md focus:ring-0"
          onChange={(e) =>
            setInterval(e.target.value as LatencyChartIntervalKey)
          }
          value={interval}
        >
          {Object.entries(INTERVALS).map(([intervalKey, { label }]) => (
            <option key={label} value={intervalKey}>
              {label}
            </option>
          ))}
        </select>
      }
      className="md:col-span-2"
      legend={LATENCY_PERCENTILES.map((percentile) => `${percentile * 100}%`)}
      isLoading={isLoading}
    >
      <Line
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: "time",
              time: {
                unit:
                  INTERVALS[interval].unit === "m" ||
                  INTERVALS[interval].value === 1
                    ? "minute"
                    : "hour",
              },
            },
          },
        }}
        data={getGenericLineChartData("chart", data?.items ?? [])}
      />
    </Chart>
  )
}
