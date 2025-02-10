import { getAddress } from "ethers"
import { createApiEndpoint } from "@/utils/api"
import { abort } from "@/utils/abort"
import { forwarderApiClient } from "@/utils/forwarder-api/client"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"

export const GET = createApiEndpoint(
  "getForwarderAddress",
  async (_req, ctx) => {
    const silo = await getTeamSilo(ctx.team.id, Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    let targetAddress

    try {
      targetAddress = getAddress(ctx.params.targetAddress)
    } catch {
      abort(400, "Invalid address")
    }

    const result = await forwarderApiClient.getContract({
      targetAddress,
      targetNetwork: silo.engine_account,
    })

    if (!result.result.address) {
      abort(404)
    }

    return {
      address: result.result.address,
    }
  },
)
