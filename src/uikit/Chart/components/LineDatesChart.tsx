import { useMemo } from "react"
import { format, isAfter, isBefore, isToday } from "date-fns"
import { Line } from "react-chartjs-2"

import { defaultTheme } from "../theme"
import { showTodayLine } from "../plugins"
import { getConfig } from "../config/line"
import type { LineChartPlugins } from "../plugins"
import type { Label } from "../types"
import type { Theme } from "../theme"

const TODAY = new Date()

type Props = {
  data: { x: Date; y: number }[]
  theme?: Theme
  plugins?: LineChartPlugins[]
  showProjection?: boolean
  showAreaGradient?: boolean
  showPoints?: (label: Label) => boolean
  formatLabel?: (label: Date) => string
}

export const LineDatesChart = ({
  data,
  plugins = [],
  theme = defaultTheme,
  showProjection = true,
  showAreaGradient = true,
  showPoints = () => false,
  formatLabel = (date: Date) => format(date, "MMM d"),
}: Props) => {
  const labels = useMemo(
    () => data.map(({ x }) => formatLabel(x)),
    [data, formatLabel],
  )

  const config = useMemo(
    () =>
      getConfig({
        theme,
        labels,
        showAreaGradient,
        minimizeLabels: plugins.includes("minimizeLabels"),
        showPoints,
      }),
    [theme, showAreaGradient, plugins, labels, showPoints],
  )

  const chartPlugins = useMemo(
    () =>
      plugins.includes("showTodayLine")
        ? [
            showTodayLine({
              xIndex: labels.indexOf(formatLabel(TODAY)),
              yValue: data.find(({ x }) => isToday(x))?.y ?? 0,
            }),
          ]
        : [],
    [data, formatLabel, labels, plugins],
  )

  const estimateProjection = useMemo(() => {
    if (data.length < 2) {
      return 0
    }

    // Calculates a difference projection between today and halfway past point
    const todayIndex = data.findIndex(({ x }) => isToday(x))

    // Calculate average difference between points from start to today
    const differences = []

    for (let i = 1; i <= todayIndex; i += 1) {
      differences.push(data[i].y - data[i - 1].y)
    }

    const avgDifference =
      differences.reduce((sum, diff) => sum + diff, 0) / differences.length

    return avgDifference
  }, [data])

  return (
    <Line
      plugins={chartPlugins}
      options={config.options}
      data={{
        labels,
        datasets: [
          {
            ...config.getDatasetOptions(true),
            data: data.map(({ x, y }) =>
              showProjection && (isBefore(x, TODAY) || isToday(x)) ? y : null,
            ),
          },
          {
            ...config.getDatasetOptions(false),
            data: data.map(({ x, y }, index) => {
              const todayIndex = data.findIndex(({ x: _x }) => isToday(_x))
              const diff = (index - todayIndex) * estimateProjection

              return isAfter(x, TODAY) || isToday(x) ? y + diff : null
            }),
          },
        ],
      }}
    />
  )
}
