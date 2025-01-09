"use server"

import { Order } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getOrders = async ({ team }: { team?: number } = {}): Promise<
  (Order & { team: { name: string } | null })[]
> => {
  const supabase = createAdminSupabaseClient()
  let query = supabase
    .from("orders")
    .select("*, teams!inner(name)")
    .order("id", { ascending: true })

  if (team) {
    query = query.eq("team_id", team)
  }

  const { data: orders } = await query

  if (!orders) {
    return []
  }

  return orders.map((order) => ({
    ...order,
    team: order.teams,
  }))
}
