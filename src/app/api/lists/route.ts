import { createApiEndpoint } from "@/utils/api"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import { adaptList } from "@/utils/adapters"
import { createList } from "@/utils/proxy-api/create-list"
import { getLists } from "@/utils/proxy-api/get-lists"

export const GET = createApiEndpoint("getLists", async (_req, ctx) => {
  const supabase = createAdminSupabaseClient()
  const [{ data: lists }, proxyApiLists] = await Promise.all([
    supabase
      .from("lists")
      .select("*")
      .order("id", { ascending: true })
      .eq("team_id", ctx.team.id),
    getLists(ctx.team.id),
  ])

  const validLists = (lists ?? []).filter(({ id }) =>
    proxyApiLists.some((list) => list.id === id),
  )

  const invalidLists = (lists ?? []).filter(
    ({ id }) => !proxyApiLists.some((list) => list.id === id),
  )

  invalidLists.forEach(({ id }) => {
    console.warn(`Found list ${id} in the database but not in the proxy API`)
  })

  return {
    items: validLists.map(adaptList),
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
