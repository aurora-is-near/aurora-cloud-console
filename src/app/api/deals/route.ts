import { NextRequest } from "next/server"
import { createApiEndpoint } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const GET = createApiEndpoint(
  "getDeals",
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()
    const result = await supabase
      .from("deals")
      .select("id, created_at, updated_at, name, team_id")
      .order("created_at", { ascending: true })
      .eq("team_id", ctx.team.id)

    assertValidSupabaseResult(result)

    return {
      items: result.data,
    }
  },
)
