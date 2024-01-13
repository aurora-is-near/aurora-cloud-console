"use client"

import "chartjs-adapter-date-fns"
import BreadcrumbHeading from "@/components/BreadcrumbHeading"
import TabCharts from "@/components/TabCharts"
import {
  Chart as ChartJS,
  CategoryScale,
  TimeScale,
  LinearScale,
  Title,
  Tooltip,
  BarElement,
} from "chart.js"
import { useNotFoundError } from "@/hooks/useNotFoundError"
import { Bar } from "react-chartjs-2"
import { getChartColor } from "@/utils/charts"
import { ChartColor } from "@/types/types"
import { getQueryFnAndKey } from "@/utils/api/queries"
import { useQuery } from "@tanstack/react-query"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  TimeScale,
  Title,
  Tooltip,
)

type ChartsProps = {
  siloId: number
}

const CHART_COLORS: ChartColor[] = ["green", "rose"]

const LABELS = ["06", "07", "08", "09", "10", "11"]
  .map((month) => [
    `2023-${month}-01T00:00:00.000Z`,
    `2023-${month}-04T00:00:00.000Z`,
    `2023-${month}-07T00:00:00.000Z`,
    `2023-${month}-10T00:00:00.000Z`,
    `2023-${month}-13T00:00:00.000Z`,
    `2023-${month}-16T00:00:00.000Z`,
    `2023-${month}-19T00:00:00.000Z`,
    `2023-${month}-22T00:00:00.000Z`,
    `2023-${month}-25T00:00:00.000Z`,
    `2023-${month}-28T00:00:00.000Z`,
  ])
  .flat()

const Charts = ({ siloId }: ChartsProps) => {
  const { data: silo, error } = useQuery(
    getQueryFnAndKey("getSilo", {
      id: siloId,
    }),
  )

  useNotFoundError(error)

  return (
    <section>
      <TabCharts
        colors={["green", "rose"]}
        tabs={[
          {
            title: "KYC",
            value: 2778,
            chart: (
              <Bar
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      stacked: true,
                      type: "time",
                      time: {
                        unit: "month",
                      },
                    },
                    y: {
                      stacked: true,
                    },
                  },
                }}
                data={{
                  labels: LABELS,
                  datasets: [
                    {
                      label: "Rejection",
                      data: LABELS.map(() => Math.floor(Math.random() * 20)),
                      backgroundColor: getChartColor(1, CHART_COLORS),
                    },
                    {
                      label: "Success",
                      data: LABELS.map(() => Math.floor(Math.random() * 80)),
                      backgroundColor: getChartColor(0, CHART_COLORS),
                    },
                  ],
                }}
              />
            ),
            legend: ["Success", "Rejection"],
          },
          {
            title: "KYB",
            value: 1201,
            chart: (
              <Bar
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      stacked: true,
                      type: "time",
                      time: {
                        unit: "month",
                      },
                    },
                    y: {
                      stacked: true,
                    },
                  },
                }}
                data={{
                  labels: LABELS,
                  datasets: [
                    {
                      label: "Rejection",
                      data: LABELS.map(() => Math.floor(Math.random() * 20)),
                      backgroundColor: getChartColor(1, CHART_COLORS),
                    },
                    {
                      label: "Success",
                      data: LABELS.map(() => Math.floor(Math.random() * 80)),
                      backgroundColor: getChartColor(0, CHART_COLORS),
                    },
                  ],
                }}
              />
            ),
            legend: ["Success", "Rejection"],
          },
        ]}
      >
        <BreadcrumbHeading titles={[silo?.name ?? "", "KYC"]} />
      </TabCharts>
    </section>
  )
}

export default Charts
