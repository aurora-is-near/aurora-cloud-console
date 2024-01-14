import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { Team } from "@/types/types"
import { abort } from "@/utils/abort"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const GET = apiRequestHandler(
  ["admin"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    if (!ctx.teamKey) {
      abort(500, "No team key found")
    }

    const supabase = createAdminSupabaseClient()
    const result = await supabase
      .from("teams")
      .select()
      .eq("team_key", ctx.teamKey)
      .single()

    assertValidSupabaseResult(result)

    return NextResponse.json<Team>(result.data)
  },
)
