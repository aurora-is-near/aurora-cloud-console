import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { abort } from "../../../../utils/abort"
import { getTeamSilo } from "@/actions/admin/team-silos/get-team-silo"

export const GET = createApiEndpoint(
  "getSilo",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const silo = await getTeamSilo(ctx.team.id, Number(ctx.params.id))

    if (!silo) {
      abort(404)
    }

    return {
      ...silo,
      teams: undefined,
    }
  },
)
