import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { adminSupabase } from "@/utils/supabase"
import { ApiKey } from "@/types/types"

export const GET = apiRequestHandler(['admin'], async (
  _req: NextRequest,
  ctx: ApiRequestContext
) => {
  const supabase = adminSupabase()
  const { data, error } = await supabase
    .from("api_keys")
    .select()
    .order("created_at", { ascending: false })
    .eq("user_id", ctx.user.user_id)

  if (error) throw error

  return NextResponse.json<ApiKey[]>(data)
})

export const POST = apiRequestHandler(['admin'], async (
  req: NextRequest,
  ctx: ApiRequestContext
) => {
  const body = await req.json()

  const supabase = adminSupabase()
  const { data, error } = await supabase
    .from("api_keys")
    .insert({
      note: body.note,
      scopes: body.scopes,
      user_id: ctx.user.user_id,
    })
    .select()
    .single()

  if (error) throw error

  return NextResponse.json(data)
})
