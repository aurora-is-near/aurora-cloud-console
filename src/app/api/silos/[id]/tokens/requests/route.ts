import { createApiEndpoint } from "@/utils/api"
import { getSilo } from "@/actions/silos/get-silo"
import { getSiloBridgedTokenRequests } from "@/actions/silo-bridged-tokens/get-silo-bridged-token-requests"
import { abort } from "../../../../../../utils/abort"

export const GET = createApiEndpoint(
  "getSiloBridgedTokenRequests",
  async (_req, ctx) => {
    const silo = await getSilo(Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    const items = await getSiloBridgedTokenRequests(silo.id)

    return {
      total: items.length,
      items: items.map((item) => ({
        id: item.id,
        symbol: item.symbol,
        address: item.address,
        createdAt: item.created_at,
      })),
    }
  },
)
