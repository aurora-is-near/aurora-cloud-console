import type { ChartDataset, ChartOptions, ScriptableContext } from "chart.js"

import { defaultTheme } from "../theme"
import { minimizeLabels as minimizeLabelsPlugin } from "../plugins"
import type { Theme } from "../theme"
import type { Label } from "../types"

import { getCommonChartOptions } from "./common"

type GetLineChartConfigArgs = {
  theme: Theme
  labels: Label[]
  minimizeLabels?: boolean
  showAreaGradient?: boolean
  showPoints?: (label: Label) => boolean
}

type LineResultOptions = {
  options: ChartOptions<"line">
  getDatasetOptions: (hasData: boolean) => ChartDataset<"line">
}

const getAreaGradient =
  (theme: Theme, hasData: boolean) =>
  (ctx: ScriptableContext<"line">): CanvasGradient | string => {
    const { chart } = ctx
    const { chartArea } = chart

    if (!chartArea) {
      return theme.colors.bg
    }

    const gradient = chart.ctx.createLinearGradient(
      0,
      chartArea.top,
      0,
      chartArea.bottom,
    )

    if (hasData) {
      gradient.addColorStop(0, theme.colors.areaActive[0])
      gradient.addColorStop(1, theme.colors.areaActive[1])
    } else {
      gradient.addColorStop(0, theme.colors.areaInactive[0])
      gradient.addColorStop(1, theme.colors.areaInactive[1])
    }

    return gradient
  }

export const getConfig = ({
  labels = [],
  showPoints = () => false,
  showAreaGradient = false,
  theme = defaultTheme,
  minimizeLabels = true,
}: GetLineChartConfigArgs): LineResultOptions => {
  const options: ChartOptions<"line"> = getCommonChartOptions(theme)

  if (showAreaGradient) {
    options.plugins = {
      ...options.plugins,
      filler: {
        propagate: true,
      },
    }
  }

  // checking for ticks just to resolve TS issue, in fact it's always there
  if (minimizeLabels && options.scales?.x?.ticks) {
    options.scales.x.ticks.callback = minimizeLabelsPlugin(labels)
  }

  const getDatasetOptions = (hasData: boolean): ChartDataset<"line"> => {
    const datasetOptions: ChartDataset<"line"> = {
      data: [],
      pointStyle: labels.map((label) => (showPoints(label) ? "circle" : false)),
      cubicInterpolationMode: "monotone",
      pointBackgroundColor: theme.colors.main,
      borderWidth: 1.5,
      pointRadius: 4,
      pointHoverRadius: 6,
      pointHitRadius: 10,
    }

    if (hasData) {
      datasetOptions.borderColor = theme.colors.main
    } else {
      datasetOptions.borderDash = [10, 5]
      datasetOptions.borderColor = theme.colors.inactive
    }

    if (showAreaGradient) {
      datasetOptions.fill = showAreaGradient ? "start" : false
      datasetOptions.backgroundColor = getAreaGradient(theme, hasData)
    }

    return datasetOptions
  }

  return { options, getDatasetOptions }
}
