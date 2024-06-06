import { ChartData } from "@/types/types"
import { queryFailureRate, queryLatency, queryRpc } from "@/utils/grafana/query"

const getValuesFromFrame = (frame: { data: { values: number[][] } }) => {
  const [items] = frame.data.values

  if (!items) return []

  return items.map((value: any, i: number) => ({
    day: value,
    count: frame.data.values[1][i],
  }))
}

export const getLatencyCharts = async (
  percentiles: number[],
  {
    interval,
    network,
  }: {
    interval: string | null
    network: string | null
  },
): Promise<ChartData[]> => {
  const data = await queryLatency(percentiles, {
    interval,
    network,
  })

  return Array.from({ length: percentiles.length }, (_, index): ChartData => {
    const [frame] = data.results[String(index)].frames

    return {
      label: `Latency (ms), ${percentiles[index] * 100}% quantile`,
      chart: getValuesFromFrame(frame),
    }
  })
}

export const getRpcChart = async ({
  network,
}: {
  network: string | null
}): Promise<ChartData> => {
  const data = await queryRpc({ network })
  const [frame] = data.results["0"].frames

  return {
    label: "RPC requests",
    chart: getValuesFromFrame(frame),
  }
}

export const getFailureRateChart = async ({
  network,
}: {
  network: string | null
}): Promise<ChartData> => {
  const data = await queryFailureRate({ network })
  const [frame] = data.results["0"].frames

  return {
    label: "Failure rate",
    chart: getValuesFromFrame(frame),
  }
}
