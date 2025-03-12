import { JsonRpcProvider } from "ethers"
import { createApiEndpoint } from "@/utils/api"
import { getSilo } from "@/actions/silos/get-silo"
import { ApiResponseBody } from "@/types/api"
import { getBridgedToken } from "@/actions/bridged-tokens/get-bridged-token"
import { checkTokenByContractAddress } from "@/utils/check-token-contract"
import { BridgedToken, Silo } from "@/types/types"
import { createSiloBridgedToken } from "@/actions/silo-bridged-tokens/create-silo-bridged-token"
import { createSiloBridgedTokenRequest } from "@/actions/silo-bridged-tokens/create-silo-bridged-token-request"
import { getSiloBridgedToken } from "@/actions/silo-bridged-tokens/get-silo-bridged-token"
import { abort } from "../../../../../../utils/abort"

const isTokenContractDeployed = async (silo: Silo, contractAddress: string) => {
  const provider = new JsonRpcProvider(silo.rpc_url)
  const isDeployed = await checkTokenByContractAddress(
    provider,
    contractAddress,
  )

  return isDeployed
}

const isTokenDeployed = async (silo: Silo, token: BridgedToken) => {
  const isBaseToken =
    silo.base_token_symbol.toUpperCase() === token.symbol.toUpperCase()

  if (isBaseToken) {
    return true
  }

  if (!token.aurora_address) {
    return false
  }

  return isTokenContractDeployed(silo, token.aurora_address)
}

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

  const isDeployed = await isTokenDeployed(silo, token)

  await createSiloBridgedToken(silo.id, token.id, {
    isDeploymentPending: !isDeployed,
  })

  return {
    isDeploymentPending: !isDeployed,
    isActive: isDeployed,
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
    isActive: false,
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
