import { createApiEndpoint } from "@/utils/api"
import { adaptUserlist } from "@/utils/adapters"
import { getUserlists } from "@/actions/userlists/get-userlists"

export const GET = createApiEndpoint("getUserlists", async (_req, ctx) => {
  const userlists = await getUserlists({ rule_id: Number(ctx.params.rule_id) })

  return userlists.map(adaptUserlist)
})
