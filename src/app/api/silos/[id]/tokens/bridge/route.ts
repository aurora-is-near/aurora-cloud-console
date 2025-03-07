import { JsonRpcProvider } from "ethers"
import { createApiEndpoint } from "@/utils/api"
import { getSilo } from "@/actions/silos/get-silo"
import { ApiResponseBody } from "@/types/api"
import { getBridgedToken } from "@/actions/bridged-tokens/get-bridged-token"
import { checkTokenByContractAddress } from "@/utils/check-token-contract"
import { Silo } from "@/types/types"
import { createSiloBridgedToken } from "@/actions/silo-bridged-tokens/create-silo-bridged-token"
import { abort } from "../../../../../../utils/abort"

const isTokenDeployed = async (silo: Silo, contractAddress: string) => {
  const provider = new JsonRpcProvider(silo.rpc_url)
  const isDeployed = await checkTokenByContractAddress(
    provider,
    contractAddress,
  )

  return isDeployed
}

const bridgeExistingToken = async (
  silo: Silo,
  tokenId: number,
): Promise<ApiResponseBody<"bridgeSiloToken">> => {
  const token = await getBridgedToken(tokenId)

  if (!token) {
    abort(404)
  }

  const isDeployed = await isTokenDeployed(silo, token.aurora_address)

  const metadata = {
    isDeploymentPending: !isDeployed,
    isActive: isDeployed,
  }

  await createSiloBridgedToken(silo.id, token.id, metadata)

  return metadata
}

const bridgeCustomToken = async (
  silo: Silo,
  symbol: string,
  address: string,
): Promise<ApiResponseBody<"bridgeSiloToken">> => {
  const isDeployed = await isTokenDeployed(silo, address)

  if (isDeployed) {
    abort(400, "Token is already deployed")
  }

  // TODO: Store a request for the token deployment and maybe send a Slack
  // notification
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

  if (ctx.body.tokenId && (ctx.body.symbol ?? ctx.body.address)) {
    abort(400, badRequestMessage)
  }

  if (ctx.body.tokenId) {
    return bridgeExistingToken(silo, ctx.body.tokenId)
  }

  if (!ctx.body.symbol || !ctx.body.address) {
    abort(400, badRequestMessage)
  }

  return bridgeCustomToken(silo, ctx.body.symbol, ctx.body.address)
})
