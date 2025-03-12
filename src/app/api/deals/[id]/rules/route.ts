import { createApiEndpoint } from "@/utils/api"
import { adaptRule } from "@/utils/adapters"
import { getRules } from "@/actions/rules/get-rules"
import { createRule } from "@/actions/rules/create-rule"
import { abortIfNotFound } from "@/utils/supabase"

export const GET = createApiEndpoint("getRules", async (_req, ctx) => {
  const rules = await getRules({ dealId: Number(ctx.params.id) })

  return {
    items: rules.data.map(adaptRule),
  }
})

export const POST = createApiEndpoint("createRule", async (req, ctx) => {
  const {
    chains = [],
    contracts = [],
    exceptChains = [],
    exceptContracts = [],
  } = ctx.body

  const rule = await createRule({
    rule: {
      deal_id: Number(ctx.params.id),
      chains,
      contracts,
      except_chains: exceptChains,
      except_contracts: exceptContracts,
    },
    team_id: Number(ctx.params.teamId),
  })

  abortIfNotFound(rule)

  return adaptRule(rule)
})
