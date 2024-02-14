import { apiRequestHandler } from "@/utils/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"
import { PublicApiScope } from "@/types/types"

export const GET = apiRequestHandler(["admin"], async (_req, ctx) => {
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
})

export const PUT = apiRequestHandler(["admin"], async (_req, ctx) => {
  const apiKeyId = ctx.params.id
  const { note, scopes } = ctx.body as {
    note: string
    scopes: PublicApiScope[]
  }

  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("api_keys")
    .update({
      note,
      scopes,
    })
    .eq("id", apiKeyId)
    .eq("user_id", ctx.user.user_id)
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
})

export const DELETE = apiRequestHandler(["admin"], async (_req, ctx) => {
  const apiKeyId = ctx.params.id

  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("api_keys")
    .delete()
    .eq("id", apiKeyId)
    .eq("user_id", ctx.user.user_id)

  assertValidSupabaseResult(result)

  return { status: "OK" }
})
