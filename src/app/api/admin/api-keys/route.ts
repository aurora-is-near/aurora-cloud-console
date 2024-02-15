import { apiRequestHandler } from "@/utils/api"
import { ApiKey, PublicApiScope } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const GET = apiRequestHandler<ApiKey[]>(["admin"], async (_req, ctx) => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("api_keys")
    .select()
    .order("id", { ascending: true })
    .eq("user_id", ctx.user.user_id)

  assertValidSupabaseResult(result)

  return result.data
})

export const POST = apiRequestHandler(["admin"], async (_req, ctx) => {
  const { note, scopes } = ctx.body as {
    note: string
    scopes: PublicApiScope[]
  }
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("api_keys")
    .insert({
      note,
      scopes,
      user_id: ctx.user.user_id,
    })
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
})
