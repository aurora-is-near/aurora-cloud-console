import { abort } from "@/utils/abort"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { getTeam } from "@/utils/team"
import { NextRequest, NextResponse } from "next/server"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const DELETE = apiRequestHandler(
  ["admin"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const apiKeyId = ctx.params.id

    if (!ctx.teamKey) {
      abort(400, "No team key found")
    }

    const supabase = createAdminSupabaseClient()
    const team = await getTeam(ctx.teamKey)
    const result = await supabase
      .from("users_teams")
      .delete()
      .filter("user_id", "eq", apiKeyId)
      .eq("user_id", apiKeyId)
      .eq("team_id", team.id)

    assertValidSupabaseResult(result)

    return NextResponse.json({ status: "OK" })
  },
)
