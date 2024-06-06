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
import { getQueryFnAndKey } from "@/utils/api/queries"
import { getGenericLineChartData } from "@/utils/charts"
import { Line } from "react-chartjs-2"
import { useQuery } from "@tanstack/react-query"
import Chart from "./Chart"

type FailureRateChartProps = {
  id: string
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
)

export const FailureRateChart = ({ id }: FailureRateChartProps) => {
  const { data, isLoading } = useQuery(
    getQueryFnAndKey("getSiloFailureRate", {
      id: Number(id),
    }),
  )

  return (
    <Chart title="Failure rate" isLoading={isLoading}>
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
        data={getGenericLineChartData("chart", data?.items ?? [], ["rose"])}
      />
    </Chart>
  )
}
