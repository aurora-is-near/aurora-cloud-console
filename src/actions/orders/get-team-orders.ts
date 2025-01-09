"use server"

import { Order } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeamOrders = async (teamId: number): Promise<Order[]> => {
  const supabase = createAdminSupabaseClient()
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("id", { ascending: true })
    .eq("team_id", teamId)

  return orders ?? []
}
