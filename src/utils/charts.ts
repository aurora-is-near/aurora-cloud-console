import { CHART_COLOURS, CHART_COLOUR_HEXES } from "../constants/charts"
import { ChartColor, TransactionChart } from "../types/types"

type DailyMetricKey = "transactionsPerDay" | "walletsPerDay"

const getDates = (key: DailyMetricKey, charts?: TransactionChart[]): string[] =>
  charts?.reduce<string[]>((acc, chart) => {
    acc.push(...chart[key].map(({ day }) => day))

    return acc
  }, []) ?? []

export const getChartColor = <T extends ChartColor>(
  index: number,
  fixedColors?: T[],
): (typeof CHART_COLOUR_HEXES)[T] => {
  const fixedColor = fixedColors?.[index]

  if (fixedColor) {
    return CHART_COLOUR_HEXES[fixedColor]
  }

  const color = CHART_COLOURS[index % CHART_COLOURS.length]

  return CHART_COLOUR_HEXES[color]
}

export const getLineChartData = (
  key: DailyMetricKey,
  charts?: TransactionChart[],
  colors?: ChartColor[],
) => {
  return {
    labels: getDates(key, charts),
    datasets:
      charts?.map((chart, index) => ({
        label: chart.label,
        data: chart[key].map(({ count }) => count),
        borderColor: getChartColor(index, colors),
        backgroundColor: getChartColor(index, colors),
        tension: 0.3,
      })) ?? [],
  }
}
