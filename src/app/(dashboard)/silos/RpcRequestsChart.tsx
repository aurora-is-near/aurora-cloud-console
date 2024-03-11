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
import Chart from "@/app/(dashboard)/silos/Chart"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { getGenericLineChartData } from "@/utils/charts"
import { Line } from "react-chartjs-2"
import { useQuery } from "@tanstack/react-query"

type RpcRequestsChartProps = {
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

export const RpcRequestsChart = ({ id }: RpcRequestsChartProps) => {
  const { data, isLoading } = useQuery(
    getQueryFnAndKey("getSiloRpcRequests", {
      id: Number(id),
    }),
  )

  return (
    <Chart title="RPC requests" isLoading={isLoading}>
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
        data={getGenericLineChartData("chart", data?.items ?? [])}
      />
    </Chart>
  )
}
