import { useMemo } from "react"
import { Bar } from "react-chartjs-2"

import { getConfig } from "../config/bar"
import { getTooltipConfig } from "../config/tooltip"
import { defaultTheme } from "../theme"
import type { BarChartPlugins } from "../plugins"
import type { Theme } from "../theme"

type Props = {
  data: { x: string; y: number }[]
  plugins?: BarChartPlugins[]
  theme?: Theme
}

export const BarChart = ({
  data,
  plugins = [],
  theme = defaultTheme,
}: Props) => {
  const labels = useMemo(() => data.map(({ x }) => x), [data])

  const config = useMemo(
    () =>
      getConfig({
        theme,
        labels,
        minimizeLabels: plugins.includes("minimizeLabels"),
      }),
    [theme, plugins, labels],
  )

  return (
    <Bar
      options={{
        ...config.options,
        plugins: {
          tooltip: getTooltipConfig(theme),
        },
      }}
      data={{
        labels,
        datasets: [
          {
            ...config.datasetOptions,
            data: data.map(({ y }) => (y === 0 ? 0 : y)),
          },
        ],
      }}
    />
  )
}
