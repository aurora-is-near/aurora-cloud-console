import { useMemo } from "react"
import { format, isBefore, isAfter, isToday } from "date-fns"
import { Line } from "react-chartjs-2"

import { defaultTheme } from "../theme"
import { showTodayLine } from "../plugins"
import { getConfig } from "../config/line"
import type { LineChartPlugins } from "../plugins"
import type { Label } from "../types"
import type { Theme } from "../theme"

const TODAY = new Date()
const formatXAxisValue = (date: Date) => format(date, "MMM d")

type Props = {
  data: { x: Date; y: number }[]

  theme?: Theme
  plugins?: LineChartPlugins[]
  showProjection?: boolean
  showAreaGradient?: boolean
  showPoints?: (label: Label) => boolean
}

export const LineDatesChart = ({
  data,
  plugins = [],
  theme = defaultTheme,
  showProjection = true,
  showAreaGradient = true,
  showPoints = () => false,
}: Props) => {
  const labels = useMemo(() => data.map(({ x }) => formatXAxisValue(x)), [data])

  const config = useMemo(
    () =>
      getConfig({
        theme,
        labels,
        showAreaGradient,
        minimizeLabels: plugins.includes("minimizeLabels"),
        showPoints: (label) => label === formatXAxisValue(TODAY),
      }),
    [theme, showAreaGradient, plugins, labels, showPoints],
  )

  const chartPlugins = useMemo(
    () =>
      plugins.includes("showTodayLine")
        ? [
            showTodayLine({
              xIndex: labels.indexOf(formatXAxisValue(TODAY)),
              yValue: data.find(({ x }) => isToday(x))?.y || 0,
            }),
          ]
        : [],
    [],
  )

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
            data: data.map(({ x, y }) =>
              isAfter(x, TODAY) || isToday(x) ? y : null,
            ),
          },
        ],
      }}
    />
  )
}
