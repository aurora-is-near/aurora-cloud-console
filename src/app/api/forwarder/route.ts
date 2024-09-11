import { getAddress } from "ethers"
import { createApiEndpoint } from "@/utils/api"
import { abort } from "@/utils/abort"
import { forwarderApiClient } from "@/utils/forwarder-api/client"

export const POST = createApiEndpoint(
  "createForwarderAddress",
  async (_req, ctx) => {
    const { address } = ctx.body
    let targetAddress

    try {
      targetAddress = getAddress(address)
    } catch {
      abort(400, "Invalid address")
    }

    const result = await forwarderApiClient.createContract({
      targetAddress,
    })

    return {
      forwarderAddress: result.result.address,
    }
  },
)
