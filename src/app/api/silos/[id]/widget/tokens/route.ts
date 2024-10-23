import { createApiEndpoint } from "@/utils/api"
import { getSilo } from "@/actions/silos/get-silo"
import { getSiloToken } from "@/actions/silo-tokens/get-silo-token"
import { updateToken } from "@/actions/tokens/update-token"
import { ApiResponseBody } from "@/types/api"
import { getSiloTokenByAddress } from "@/actions/silo-tokens/get-silo-token-by-address"
import { createToken } from "@/actions/tokens/create-token"
import { abort } from "../../../../../../utils/abort"

const addToken = async (tokenId: number) => {
  const updatedToken = await updateToken(tokenId, {
    bridge_deployment_status: "PENDING",
  })

  return { status: updatedToken.bridge_deployment_status }
}

const addExistingToken = async (
  siloId: number,
  tokenId: number,
): Promise<ApiResponseBody<"createWidgetToken">> => {
  const token = await getSiloToken(siloId, tokenId)

  if (!token) {
    abort(404)
  }

  if (token.bridge_deployment_status === "DEPLOYED") {
    abort(400, "Token is already deployed")
  }

  return addToken(token.id)
}

const addCustomToken = async (
  siloId: number,
  symbol: string,
  address: string,
): Promise<ApiResponseBody<"createWidgetToken">> => {
  const token = await getSiloTokenByAddress(siloId, address)

  if (token?.bridge_deployment_status === "DEPLOYED") {
    abort(400, "Token is already deployed")
  }

  if (token) {
    return addToken(token.id)
  }

  const newToken = await createToken({
    symbol,
    address,
    deployment_status: "PENDING",
    bridge_deployment_status: "PENDING",
    silo_id: siloId,
    type: null,
    name: null,
    decimals: null,
    bridge_addresses: [],
    fast_bridge: false,
    bridge_origin: null,
    icon_url: null,
  })

  return { status: newToken.bridge_deployment_status }
}

export const POST = createApiEndpoint(
  "createWidgetToken",
  async (_req, ctx) => {
    const silo = await getSilo(Number(ctx.params.id))
    const badRequestMessage = "Must provide either tokenId or symbol/address"

    if (!silo) {
      abort(404)
    }

    if (ctx.body.tokenId && (ctx.body.symbol ?? ctx.body.address)) {
      abort(400, badRequestMessage)
    }

    if (ctx.body.tokenId) {
      return addExistingToken(silo.id, ctx.body.tokenId)
    }

    if (!ctx.body.symbol || !ctx.body.address) {
      abort(400, badRequestMessage)
    }

    return addCustomToken(silo.id, ctx.body.symbol, ctx.body.address)
  },
)
