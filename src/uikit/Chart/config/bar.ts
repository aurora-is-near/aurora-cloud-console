import type { ChartDataset, ChartOptions } from "chart.js"

import { defaultTheme } from "../theme"
import { minimizeLabels as minimizeLabelsPlugin } from "../plugins"
import type { Theme } from "../theme"
import type { Label } from "../types"

import { getCommonChartOptions } from "./common"

type GetBarChartConfigArgs = {
  theme: Theme
  labels: Label[]
  minimizeLabels?: boolean
}

type BarResultOptions = {
  options: ChartOptions<"bar">
  datasetOptions: ChartDataset<"bar">
}

export const getConfig = ({
  labels = [],
  theme = defaultTheme,
  minimizeLabels = true,
}: GetBarChartConfigArgs): BarResultOptions => {
  const options: ChartOptions<"bar"> = getCommonChartOptions(theme)

  // checking for ticks just to resolve TS issue, in fact it's always there
  if (minimizeLabels && options.scales?.x?.ticks) {
    options.scales.x.ticks.callback = minimizeLabelsPlugin(labels)
  }

  const datasetOptions: ChartDataset<"bar"> = {
    data: [],
    barThickness: theme.barSize,
    // @ts-expect-error wrong library typings
    backgroundColor(context) {
      const values = context.dataset.data

      return values.map((value) =>
        value === 0 ? theme.colors.inactive : theme.colors.main,
      )
    },
  }

  return { options, datasetOptions }
}
