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
import { useQuery } from "@tanstack/react-query"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { getGenericLineChartData } from "@/utils/charts"
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
