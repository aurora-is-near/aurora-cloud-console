import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getDealKey = async (id: number) => {
  const supabase = createAdminSupabaseClient()

  const { data: deal } = await supabase
    .from("deals")
    .select(
      "borealis_deal_id, demo_key, teams!inner(borealis_customer_id, is_demo_account)",
    )
    .eq("id", id)
    .single()

  if (!deal) {
    throw new Error(`Deal with id ${id} not found`)
  }

  if (!deal.teams) {
    throw new Error(`No team found for deal ${id}`)
  }

  if (deal.teams.is_demo_account) {
    return deal.demo_key
  }

  return `acc::customers::${deal.teams.borealis_customer_id}::deals::${deal.borealis_deal_id}`
}
