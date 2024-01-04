import { NextRequest, NextResponse } from "next/server"
import { ApiRequestContext, apiRequestHandler } from "@/utils/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const GET = apiRequestHandler(
  ["admin"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const apiKeyId = ctx.params.id

    const supabase = createAdminSupabaseClient()
    const { data, error } = await supabase
      .from("api_keys")
      .select()
      .eq("id", apiKeyId)
      .eq("user_id", ctx.user.user_id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  },
)

export const PUT = apiRequestHandler(
  ["admin"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const apiKeyId = ctx.params.id
    const body = await req.json()

    const supabase = createAdminSupabaseClient()
    const { data, error } = await supabase
      .from("api_keys")
      .update({
        note: body.note,
        scopes: body.scopes,
      })
      .eq("id", apiKeyId)
      .eq("user_id", ctx.user.user_id)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data)
  },
)

export const DELETE = apiRequestHandler(
  ["admin"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const apiKeyId = ctx.params.id

    const supabase = createAdminSupabaseClient()
    const { error } = await supabase
      .from("api_keys")
      .delete()
      .eq("id", apiKeyId)
      .eq("user_id", ctx.user.user_id)

    if (error) throw error

    return NextResponse.json({ status: "OK" })
  },
)
