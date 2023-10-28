import { NextRequest, NextResponse } from "next/server"
import { adminSupabase } from "@/utils/supabase"
import { abortIfUnauthorised } from "@/utils/abort"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { User } from "@/types/types"

export const PATCH = apiRequestHandler(async (
  req: NextRequest,
  _res: NextResponse,
  ctx: ApiRequestContext
) => {
  const supabase = adminSupabase()
  const { newName } = await req.json();

  abortIfUnauthorised(ctx)

  const { error } = await supabase
    .from("users")
    .update({ name: newName })
    .eq("user_guid", ctx.user.user_guid)

  if (error) throw error

  return NextResponse.json({ status: "OK" })
})


export const GET = apiRequestHandler(async (
  _req: NextRequest,
  _res: NextResponse,
  ctx: ApiRequestContext
) => {
  abortIfUnauthorised(ctx)

  return NextResponse.json<User>(ctx.user)
})
