import { NextRequest } from "next/server"
import { apiRequestHandler } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const GET = apiRequestHandler(
  ["admin"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const apiKeyId = ctx.params.id

    const supabase = createAdminSupabaseClient()
    const result = await supabase
      .from("api_keys")
      .select()
      .eq("id", apiKeyId)
      .eq("user_id", ctx.user.user_id)
      .select()
      .single()

    assertValidSupabaseResult(result)

    return result.data
  },
)

export const PUT = apiRequestHandler(
  ["admin"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const apiKeyId = ctx.params.id
    const body = await req.json()

    const supabase = createAdminSupabaseClient()
    const result = await supabase
      .from("api_keys")
      .update({
        note: body.note,
        scopes: body.scopes,
      })
      .eq("id", apiKeyId)
      .eq("user_id", ctx.user.user_id)
      .select()
      .single()

    assertValidSupabaseResult(result)
    assertNonNullSupabaseResult(result)

    return result.data
  },
)

export const DELETE = apiRequestHandler(
  ["admin"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const apiKeyId = ctx.params.id

    const supabase = createAdminSupabaseClient()
    const result = await supabase
      .from("api_keys")
      .delete()
      .eq("id", apiKeyId)
      .eq("user_id", ctx.user.user_id)

    assertValidSupabaseResult(result)

    return { status: "OK" }
  },
)
