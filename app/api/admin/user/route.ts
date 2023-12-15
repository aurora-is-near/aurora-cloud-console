import { NextRequest, NextResponse } from "next/server"
import { adminSupabase } from "@/utils/supabase/admin-supabase"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"

export const PATCH = apiRequestHandler(
  ["admin"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const { name } = await req.json()
    const supabase = adminSupabase()
    const { error } = await supabase
      .from("users")
      .update({ name })
      .eq("user_id", ctx.user.user_id)

    if (error) throw error

    return NextResponse.json({ status: "OK" })
  },
)
