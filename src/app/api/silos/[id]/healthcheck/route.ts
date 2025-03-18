import { createApiEndpoint } from "@/utils/api"
import { getSilo } from "@/actions/silos/get-silo"
import { abort } from "@/utils/abort"
import { healthcheck } from "@/utils/healthcheck"

export const GET = createApiEndpoint("healthcheck", async (_req, ctx) => {
  const silo = await getSilo(Number(ctx.params.id))

  if (!silo) {
    abort(404)
  }

  return healthcheck(silo)
})
