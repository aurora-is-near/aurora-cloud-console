import { JsonRpcProvider } from "ethers"
import { createApiEndpoint } from "@/utils/api"
import { getSilo } from "@/actions/silos/get-silo"
import { getSiloBridgedTokens } from "@/actions/silo-bridged-tokens/get-silo-bridged-tokens"
import { adaptToken } from "@/utils/adapters"
import { checkTokenByContractAddress } from "@/utils/check-token-contract"
import { updateSiloBridgedToken } from "@/actions/silo-bridged-tokens/update-silo-bridged-token"
import { abort } from "../../../../../utils/abort"

export const GET = createApiEndpoint(
  "getSiloBridgedTokens",
  async (_req, ctx) => {
    const silo = await getSilo(Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    const tokens = await getSiloBridgedTokens(silo.id)
    const pendingTokens = tokens.filter((token) => token.is_deployment_pending)
    const provider = new JsonRpcProvider(silo.rpc_url)

    // Check if any tokens still marked as pending have subsequently been
    // deployed.
    await Promise.all(
      pendingTokens.map(async (token) => {
        if (!token.aurora_address) {
          return
        }

        const result = await checkTokenByContractAddress(
          provider,
          token.aurora_address,
        )

        if (result) {
          token.is_deployment_pending = false
          await updateSiloBridgedToken(silo.id, token.id, {
            isDeploymentPending: false,
          })
        }
      }),
    )

    return {
      total: tokens.length,
      items: tokens.map(adaptToken),
    }
  },
)
