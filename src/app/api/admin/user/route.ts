import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"

export const PATCH = apiRequestHandler(
  ["admin"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const { name } = await req.json()
    const supabase = createAdminSupabaseClient()
    const result = await supabase
      .from("users")
      .update({ name })
      .eq("user_id", ctx.user.user_id)

    assertValidSupabaseResult(result)

    return { status: "OK" }
  },
)
