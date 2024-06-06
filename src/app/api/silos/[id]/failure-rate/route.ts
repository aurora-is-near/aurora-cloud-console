import { getSilo } from "@/actions/silos/get-silo"
import { abort } from "@/utils/abort"
import { createApiEndpoint } from "@/utils/api"
import { getFailureRateChart } from "@/utils/grafana/charts"

export const GET = createApiEndpoint(
  "getSiloFailureRate",
  async (_req, ctx) => {
    const silo = await getSilo(Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    const item = await getFailureRateChart({
      network: silo.grafana_network_key,
    })

    return { items: [item] }
  },
)
