import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { abortIfUnauthorised } from "@/utils/abort"
import { Database } from "@/types/supabase"
import { adminSupabase } from "@/utils/supabase"

export const GET = apiRequestHandler(async (
  _req: NextRequest,
  ctx: ApiRequestContext
) => {
  abortIfUnauthorised(ctx, ['admin'])

  const supabase = adminSupabase()
  const { data, error } = await supabase
    .from("api_keys")
    .select()
    .eq("user_id", ctx.user.user_id)

  if (error) throw error

  return NextResponse.json<Database['public']['Tables']['api_keys']['Row'][]>(data)
})

export const PUT = apiRequestHandler(async (
  req: NextRequest,
  ctx: ApiRequestContext
) => {
  const body = await req.json()

  abortIfUnauthorised(ctx, ['admin'])

  const supabase = adminSupabase()
  const { error } = await supabase
    .from("api_keys")
    .insert({
      description: body.description,
      scopes: body.scopes,
      user_id: ctx.user.user_id,
    })

  if (error) throw error

  return NextResponse.json({ status: "OK" })
})
