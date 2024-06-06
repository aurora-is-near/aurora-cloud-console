import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { getLatencyCharts } from "@/utils/grafana/charts"
import { LATENCY_PERCENTILES } from "@/constants/latency"

export const GET = createApiEndpoint(
  "getSiloLatency",
  async (req: NextRequest) => {
    const { searchParams } = req.nextUrl
    const interval = searchParams.get("interval")
    const items = await getLatencyCharts(LATENCY_PERCENTILES, interval)

    return { items }
  },
)
