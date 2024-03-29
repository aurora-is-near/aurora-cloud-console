import { createApiEndpoint } from "@/utils/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import { adaptList } from "@/utils/adapters"
import { createList } from "@/utils/proxy-api/create-list"

export const GET = createApiEndpoint("getLists", async (_req, ctx) => {
  const supabase = createAdminSupabaseClient()
  const { data: lists } = await supabase
    .from("lists")
    .select("*")
    .order("id", { ascending: true })
    .eq("team_id", ctx.team.id)

  return {
    items: (lists ?? []).map(adaptList),
  }
})

export const POST = createApiEndpoint("createList", async (_req, ctx) => {
  const { name } = ctx.body
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("lists")
    .insert({ name, team_id: ctx.team.id })
    .select()
    .single()

  assertValidSupabaseResult(result)

  await createList(ctx.team.id, result.data.id)

  return adaptList(result.data)
})
