import { getAddress } from "ethers"
import { createApiEndpoint } from "@/utils/api"
import { abort } from "@/utils/abort"
import { forwarderApiClient } from "@/utils/forwarder-api/client"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"

export const POST = createApiEndpoint(
  "createForwarderAddress",
  async (_req, ctx) => {
    const silo = await getTeamSilo(ctx.team.id, Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    let targetAddress

    try {
      targetAddress = getAddress(ctx.body.targetAddress)
    } catch {
      abort(400, "Invalid address")
    }

    const result = await forwarderApiClient.createContract({
      targetAddress,
      targetNetwork: silo.engine_account,
    })

    return {
      address: result.result.address,
    }
  },
)
