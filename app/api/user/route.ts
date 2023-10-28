import { NextRequest, NextResponse } from "next/server"
import { adminSupabase } from "@/utils/supabase"
import { ApiRequestContext, apiRequestHandler, getErrorResponse } from "@/utils/api"

export const PATCH = apiRequestHandler(async (
  req: NextRequest,
  _res: NextResponse,
  ctx: ApiRequestContext
) => {
  const supabase = adminSupabase()
  const { newName } = await req.json();

  if (!ctx.user) {
    return getErrorResponse(401)
  }

  const { error } = await supabase
    .from("users")
    .update({ name: newName })
    .eq("user_guid", ctx.user.user_guid)

  if (error) throw error

  try {
    return NextResponse.json({ status: "OK" })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong." },
      { status: error.status || 500 }
    )
  }
})
