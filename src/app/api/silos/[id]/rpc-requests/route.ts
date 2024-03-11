import { createApiEndpoint } from "@/utils/api"
import { getRpcChart } from "@/utils/grafana/charts"

export const GET = createApiEndpoint("getSiloRpcRequests", async () => {
  const item = await getRpcChart()

  return { items: [item] }
})
