import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { abort } from "@/utils/abort"

export const getDealKey = async (id: number) => {
  const supabase = createAdminSupabaseClient()

  // TODO: Remove this once the Proxy API is implemented
  const { data: deal } = await supabase
    .from("deals")
    .select("id, demo_key, teams!inner(id)")
    .eq("id", id)
    .single()

  if (!deal) {
    abort(404, `Deal with id ${id} not found`)
  }

  if (!deal.teams) {
    throw new Error(`No team found for deal ${id}`)
  }

  if (deal.demo_key) {
    return deal.demo_key
  }

  return `acc::customers::${deal.teams.id}::deals::${deal.id}`
}
