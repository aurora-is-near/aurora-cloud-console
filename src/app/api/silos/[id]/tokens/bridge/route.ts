import { createApiEndpoint } from "@/utils/api"
import { getSilo } from "@/actions/silos/get-silo"
import { ApiResponseBody } from "@/types/api"
import { getBridgedToken } from "@/actions/bridged-tokens/get-bridged-token"
import { Silo } from "@/types/types"
import { createSiloBridgedToken } from "@/actions/silo-bridged-tokens/create-silo-bridged-token"
import { createSiloBridgedTokenRequest } from "@/actions/silo-bridged-tokens/create-silo-bridged-token-request"
import { getSiloBridgedToken } from "@/actions/silo-bridged-tokens/get-silo-bridged-token"
import { isTokenContractDeployed } from "@/utils/is-token-contract-deployed"
import { deployBridgedToken } from "@/actions/deployment/deploy-bridged-token"
import { abort } from "../../../../../../utils/abort"

const bridgeKnownToken = async (
  silo: Silo,
  tokenId: number,
): Promise<ApiResponseBody<"bridgeSiloToken">> => {
  const [bridgedToken, siloBridgedToken] = await Promise.all([
    getBridgedToken(tokenId),
    getSiloBridgedToken(silo.id, tokenId),
  ])

  if (!bridgedToken) {
    abort(404)
  }

  if (siloBridgedToken) {
    abort(400, `${bridgedToken.symbol} is already bridged for this silo`)
  }

  const transactionStatus = await deployBridgedToken({ silo, bridgedToken })
  const isDeploymentPending = transactionStatus !== "SUCCESSFUL"

  await createSiloBridgedToken(silo.id, bridgedToken.id, {
    isDeploymentPending,
  })

  return {
    isDeploymentPending,
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
