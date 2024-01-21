import { NextRequest } from "next/server"
import { apiRequestHandler } from "@/utils/api"
import { ApiRequestContext } from "@/types/api"
import { ApiKey } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const GET = apiRequestHandler<ApiKey[]>(
  ["admin"],
  async (_req: NextRequest, ctx: ApiRequestContext) => {
    const supabase = createAdminSupabaseClient()
    const result = await supabase
      .from("api_keys")
      .select()
      .order("created_at", { ascending: true })
      .eq("user_id", ctx.user.user_id)

    assertValidSupabaseResult(result)

    return result.data
  },
)

export const POST = apiRequestHandler(
  ["admin"],
  async (req: NextRequest, ctx: ApiRequestContext) => {
    const body = await req.json()

    const supabase = createAdminSupabaseClient()
    const result = await supabase
      .from("api_keys")
      .insert({
        note: body.note,
        scopes: body.scopes,
        user_id: ctx.user.user_id,
      })
      .select()
      .single()

    assertValidSupabaseResult(result)
    assertNonNullSupabaseResult(result)

    return result.data
  },
)
