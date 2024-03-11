import { ChartData } from "@/types/types"
import { queryFailureRate, queryLatency, queryRpc } from "@/utils/grafana/query"

const getValuesFromFrame = (frame: { data: { values: number[][] } }) =>
  frame.data.values[0].map((value: any, i: number) => ({
    day: value,
    count: frame.data.values[1][i],
  }))

export const getLatencyCharts = async (
  percentiles: number[],
  interval: string | null,
): Promise<ChartData[]> => {
  const data = await queryLatency(percentiles, interval)

  return Array.from({ length: percentiles.length }, (_, index): ChartData => {
    const [frame] = data.results[String(index)].frames

    return {
      label: `Latency (ms), ${percentiles[index] * 100}% quantile`,
      chart: getValuesFromFrame(frame),
    }
  })
}

export const getRpcChart = async (): Promise<ChartData> => {
  const data = await queryRpc()
  const [frame] = data.results["0"].frames

  return {
    label: "RPC requests",
    chart: getValuesFromFrame(frame),
  }
}

export const getFailureRateChart = async (): Promise<ChartData> => {
  const data = await queryFailureRate()
  const [frame] = data.results["0"].frames

  return {
    label: "Failure rate",
    chart: getValuesFromFrame(frame),
  }
}
