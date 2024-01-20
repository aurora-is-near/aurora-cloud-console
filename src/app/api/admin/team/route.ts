import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { Team } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const GET = apiRequestHandler<Team>(
  ["admin"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()
    const result = await supabase
      .from("teams")
      .select()
      .eq("id", ctx.team.id)
      .single()

    assertValidSupabaseResult(result)

    return result.data
  },
)
