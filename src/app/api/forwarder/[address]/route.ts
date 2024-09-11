import { getAddress } from "ethers"
import { createApiEndpoint } from "@/utils/api"
import { abort } from "@/utils/abort"
import { forwarderApiClient } from "@/utils/forwarder-api/client"

export const GET = createApiEndpoint(
  "getForwarderAddress",
  async (_req, ctx) => {
    const { address } = ctx.params
    let targetAddress

    try {
      targetAddress = getAddress(address)
    } catch {
      abort(400, "Invalid address")
    }

    const result = await forwarderApiClient.getContract({
      targetAddress,
    })

    if (!result.result.address) {
      abort(404)
    }

    return {
      forwarderAddress: result.result.address,
    }
  },
)
