import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { abort } from "../../../../utils/abort"
import { ApiRequestContext } from "@/types/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const GET = createApiEndpoint(
  "getDeal",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()
    const result = await supabase
      .from("deals")
      .select("id, created_at, updated_at, name, team_id")
      .eq("id", Number(ctx.params.id))
      .eq("team_id", ctx.team.id)
      .maybeSingle()

    assertValidSupabaseResult(result)

    if (!result.data) {
      abort(404)
    }

    return result.data
  },
)
