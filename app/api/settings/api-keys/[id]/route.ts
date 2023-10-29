import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { abortIfUnauthorised } from "@/utils/abort"
import { adminSupabase } from "@/utils/supabase"

export const DELETE = apiRequestHandler(async (
  req: NextRequest,
  ctx: ApiRequestContext
) => {
  const apiKeyId = ctx.params.id

  abortIfUnauthorised(ctx, ['admin'])

  const supabase = adminSupabase()
  const { error } = await supabase
    .from("api_keys")
    .delete()
    .eq("id", apiKeyId)
    .eq("user_id", ctx.user.user_id)

  if (error) throw error

  return NextResponse.json({ status: "OK" })
})
