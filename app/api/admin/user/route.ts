import { NextRequest, NextResponse } from "next/server"
import { adminSupabase } from "@/utils/supabase"
import { abortIfUnauthorised } from "@/utils/abort"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { User } from "@/types/types"

export const PATCH = apiRequestHandler(async (
  req: NextRequest,
  ctx: ApiRequestContext
) => {
  const { newName } = await req.json();

  abortIfUnauthorised(ctx, ["admin"])

  const supabase = adminSupabase()
  const { error } = await supabase
    .from("users")
    .update({ name: newName })
    .eq("user_id", ctx.user.user_id)

  if (error) throw error

  return NextResponse.json({ status: "OK" })
})


export const GET = apiRequestHandler(async (
  _req: NextRequest,
  ctx: ApiRequestContext
) => {
  abortIfUnauthorised(ctx, ["admin"])

  return NextResponse.json<User>(ctx.user)
})
