import { createApiEndpoint } from "@/utils/api"
import { getSilo } from "@/actions/silos/get-silo"
import { ApiResponseBody } from "@/types/api"
import { getBridgedToken } from "@/actions/bridged-tokens/get-bridged-token"
import { Silo } from "@/types/types"
import { createSiloBridgedToken } from "@/actions/silo-bridged-tokens/create-silo-bridged-token"
import { createSiloBridgedTokenRequest } from "@/actions/silo-bridged-tokens/create-silo-bridged-token-request"
import { getSiloBridgedToken } from "@/actions/silo-bridged-tokens/get-silo-bridged-token"
import { isBridgedTokenDeployed } from "@/utils/is-bridged-token-deployed"
import { isTokenContractDeployed } from "@/utils/is-token-contract-deployed"
import { abort } from "../../../../../../utils/abort"

const bridgeKnownToken = async (
  silo: Silo,
  tokenId: number,
): Promise<ApiResponseBody<"bridgeSiloToken">> => {
  const [token, siloBridgedToken] = await Promise.all([
    getBridgedToken(tokenId),
    getSiloBridgedToken(silo.id, tokenId),
  ])

  if (!token) {
    abort(404)
  }

  if (siloBridgedToken) {
    abort(400, `${token.symbol} is already bridged for this silo`)
  }

  const isDeployed = await isBridgedTokenDeployed(silo, token)

  await createSiloBridgedToken(silo.id, token.id, {
    isDeploymentPending: !isDeployed,
  })

  return {
    isDeploymentPending: !isDeployed,
  }
}

const bridgeCustomToken = async (
  silo: Silo,
  symbol: string,
  address: string,
): Promise<ApiResponseBody<"bridgeSiloToken">> => {
  const isDeployed = await isTokenContractDeployed(silo, address)

  if (isDeployed) {
    abort(400, "Token is already deployed")
  }

  await createSiloBridgedTokenRequest({
    silo_id: silo.id,
    symbol,
    address,
    resolved_at: null,
  })

  // TODO: Send a Slack notification, once we know this is all working
  return {
    isDeploymentPending: true,
  }
}

export const POST = createApiEndpoint("bridgeSiloToken", async (_req, ctx) => {
  const silo = await getSilo(Number(ctx.params.id))
  const badRequestMessage = "Must provide either tokenId or symbol/address"

  if (!silo) {
    abort(404)
  }

  if (ctx.body.tokenId) {
    return bridgeKnownToken(silo, ctx.body.tokenId)
  }

  if (!(ctx.body.symbol && ctx.body.address)) {
    abort(400, badRequestMessage)
  }

  return bridgeCustomToken(silo, ctx.body.symbol, ctx.body.address)
})
