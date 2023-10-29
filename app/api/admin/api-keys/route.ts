import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { Database } from "@/types/supabase"
import { adminSupabase } from "@/utils/supabase"

export const GET = apiRequestHandler(['admin'], async (
  _req: NextRequest,
  ctx: ApiRequestContext
) => {
  const supabase = adminSupabase()
  const { data, error } = await supabase
    .from("api_keys")
    .select()
    .eq("user_id", ctx.user.user_id)

  if (error) throw error

  return NextResponse.json<Database['public']['Tables']['api_keys']['Row'][]>(data)
})

export const POST = apiRequestHandler(['admin'], async (
  req: NextRequest,
  ctx: ApiRequestContext
) => {
  const body = await req.json()

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
