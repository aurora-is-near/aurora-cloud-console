import { CHART_COLOURS, CHART_COLOUR_HEXES } from "../constants/charts"
import { ChartColor, Transactions } from "../types/types"

type DailyMetricKey = "transactionsPerDay" | "walletsPerDay"

const getDates = (key: DailyMetricKey, data?: Transactions): string[] =>
  data?.items.reduce<string[]>((acc, item) => {
    acc.push(...item[key].map(({ day }) => day))

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
  data?: Transactions,
  colors?: ChartColor[],
) => {
  return {
    labels: getDates(key, data),
    datasets:
      data?.items.map((silo, index) => ({
        label: silo.label,
        data: silo[key].map(({ count }) => count),
        borderColor: getChartColor(index, colors),
        backgroundColor: getChartColor(index, colors),
        tension: 0.3,
      })) ?? [],
  }
}
