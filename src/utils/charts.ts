import { ChartData } from "chart.js"
import { TransactionDataSchema } from "@/types/api-schemas"
import { CHART_COLOUR_HEXES, CHART_COLOURS } from "../constants/charts"
import { ChartColor } from "../types/types"

type DailyMetricKey = "transactionsPerDay" | "walletsPerDay"

type ChartItem = { day: string | number; count: number }

type GenericChartData = {
  [x: string]: string | number | ChartItem[]
}

const toArray = (item: string | number | ChartItem[]): ChartItem[] => {
  if (!Array.isArray(item)) {
    throw new Error("Expected item to be an array")
  }

  return item
}

const getDates = (key: string, items?: GenericChartData[]) =>
  items?.reduce<(string | number)[]>((acc, item) => {
    const keyItems = item[key]

    if (!Array.isArray(keyItems)) {
      throw new Error(`Expected ${key} to be an array`)
    }

    acc.push(...keyItems.map(({ day }) => day))

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

const getItem = (
  item: GenericChartData,
  key: string,
  index: number,
  colors?: ChartColor[],
) => ({
  label: String(item.label),
  data: toArray(item[key]).map(({ count }) => count),
  borderColor: getChartColor(index, colors),
  backgroundColor: getChartColor(index, colors),
  tension: 0.3,
})

export const getGenericLineChartData = (
  key: string,
  items: GenericChartData[],
  colors?: ChartColor[],
): ChartData<"line", number[], string | number> => {
  return {
    labels: getDates(key, items),
    datasets:
      items.map((item, index) => getItem(item, key, index, colors)) ?? [],
  }
}

export const getTransactionLineChartData = (
  key: DailyMetricKey,
  charts?: TransactionDataSchema[],
  colors?: ChartColor[],
) => {
  return {
    labels: getDates(key, charts),
    datasets:
      charts?.map((chart, index) => getItem(chart, key, index, colors)) ?? [],
  }
}
