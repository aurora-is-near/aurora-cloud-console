import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { NextRequest, NextResponse } from "next/server"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const DELETE = apiRequestHandler(
  ["admin"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const apiKeyId = ctx.params.id

    const supabase = createAdminSupabaseClient()
    const result = await supabase
      .from("users_teams")
      .delete()
      .filter("user_id", "eq", apiKeyId)
      .eq("user_id", apiKeyId)
      .eq("team_id", ctx.team.id)

    assertValidSupabaseResult(result)

    return { status: "OK" }
  },
)
