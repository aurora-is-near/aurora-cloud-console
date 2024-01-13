import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const PATCH = apiRequestHandler(
  ["admin"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const { name } = await req.json()
    const supabase = createAdminSupabaseClient()
    const { error } = await supabase
      .from("users")
      .update({ name })
      .eq("user_id", ctx.user.user_id)

    if (error) {
      throw error
    }

    return NextResponse.json({ status: "OK" })
  },
)
