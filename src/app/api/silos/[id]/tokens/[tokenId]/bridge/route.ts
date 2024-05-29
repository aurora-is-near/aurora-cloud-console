import { createApiEndpoint } from "@/utils/api"
import { abort } from "../../../../../../../utils/abort"
import { getSilo } from "@/actions/silos/get-silo"
import { getSiloToken } from "@/actions/silo-tokens/get-silo-token"
import { updateToken } from "@/actions/tokens/update-token"

export const POST = createApiEndpoint("bridgeSiloToken", async (_req, ctx) => {
  const silo = await getSilo(Number(ctx.params.id))

  if (!silo) {
    abort(404)
  }

  const token = await getSiloToken(silo.id, Number(ctx.params.tokenId))

  if (!token) {
    abort(404)
  }

  if (token.bridge_deployment_status === "DEPLOYED") {
    abort(400, "Token is already deployed")
  }

  const updatedToken = await updateToken(token.id, {
    bridge_deployment_status: "PENDING",
  })

  return { status: updatedToken.bridge_deployment_status }
})
