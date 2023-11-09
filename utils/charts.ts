import { CHART_COLOURS } from "../constants/charts"
import { Transactions } from "../types/types"

type DailyMetricKey = "transactionsPerDay" | "walletsPerDay"

const getDates = (key: DailyMetricKey, data?: Transactions): string[] =>
  data?.items.reduce<string[]>((acc, item) => {
    acc.push(...item[key].map(({ day }) => day))

    return acc
  }, []) ?? []

const getChartColor = (index: number) =>
  CHART_COLOURS[index % CHART_COLOURS.length]

export const getLineChartData = (key: DailyMetricKey, data?: Transactions) => {
  return {
    labels: getDates(key, data),
    datasets:
      data?.items.map((silo, index) => ({
        label: silo.label,
        data: silo[key].map(({ count }) => count),
        borderColor: getChartColor(index),
        backgroundColor: getChartColor(index),
      })) ?? [],
  }
}
