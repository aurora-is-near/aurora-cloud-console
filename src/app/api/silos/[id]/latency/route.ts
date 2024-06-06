import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { getLatencyCharts } from "@/utils/grafana/charts"
import { LATENCY_PERCENTILES } from "@/constants/latency"
import { getSilo } from "@/actions/silos/get-silo"
import { abort } from "@/utils/abort"

export const GET = createApiEndpoint("getSiloLatency", async (req, ctx) => {
  const silo = await getSilo(Number(ctx.params.id))

  if (!silo) {
    abort(404)
  }

  const { searchParams } = req.nextUrl
  const interval = searchParams.get("interval")
  const items = await getLatencyCharts(LATENCY_PERCENTILES, {
    interval,
    network: silo.grafana_network_key,
  })

  return { items }
})
