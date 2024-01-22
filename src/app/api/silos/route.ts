import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { getTeamSilos } from "@/actions/admin/team-silos/get-team-silos"

export const GET = createApiEndpoint(
  "getSilos",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const silos = await getTeamSilos(ctx.team.id)

    return {
      items: (silos ?? []).map(
        (silo) => ({
          ...silo,
          teams: undefined,
        }),
        [],
      ),
    }
  },
)
