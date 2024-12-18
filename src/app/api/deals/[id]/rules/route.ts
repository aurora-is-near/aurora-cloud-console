import { createApiEndpoint } from "@/utils/api"
import { adaptRule } from "@/utils/adapters"
import { getRules } from "@/actions/rules/get-rules"

export const GET = createApiEndpoint("getRules", async (_req, ctx) => {
  const rules = await getRules({ dealId: Number(ctx.params.id) })

  return {
    items: rules.map(adaptRule),
  }
})
