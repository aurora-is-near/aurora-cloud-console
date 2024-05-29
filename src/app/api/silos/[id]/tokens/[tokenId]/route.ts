import { createApiEndpoint } from "@/utils/api"
import { abort } from "../../../../../../utils/abort"
import { getSilo } from "@/actions/silos/get-silo"
import { getSiloToken } from "@/actions/silo-tokens/get-silo-token"
import { adaptToken } from "@/utils/adapters"

export const GET = createApiEndpoint("getSiloToken", async (_req, ctx) => {
  const silo = await getSilo(Number(ctx.params.id))

  if (!silo) {
    abort(404)
  }

  const token = await getSiloToken(silo.id, Number(ctx.params.tokenId))

  if (!token) {
    abort(404)
  }

  return adaptToken(token)
})
