"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { List } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const updateList = async (
  id: number,
  inputs: Omit<List, "id" | "created_at" | "team_id">,
): Promise<List> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("lists")
    .update(inputs)
    .eq("id", id)
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
