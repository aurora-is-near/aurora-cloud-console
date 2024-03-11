import { createApiEndpoint } from "@/utils/api"
import { getFailureRateChart } from "@/utils/grafana/charts"

export const GET = createApiEndpoint("getSiloFailureRate", async () => {
  const item = await getFailureRateChart()

  return { items: [item] }
})
