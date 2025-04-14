"use server"

import { Deal } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { assertValidSupabaseResult } from "@/utils/supabase"
import { Pagination } from "@/types/pagination"

export const getDeals = async ({
  pagination,
}: {
  pagination?: Pagination
} = {}): Promise<Deal[]> => {
  const supabase = createAdminSupabaseClient()
  const query = supabase
    .from("deals")
    .select("*")
    .order("id", { ascending: true })
    .is("deleted_at", null)

  if (pagination) {
    const { limit, offset } = pagination

    void query.range(offset, offset + limit - 1)
  }

  const result = await query

  assertValidSupabaseResult(result)

  return result.data
}
