"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { List } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const createList = async (
  inputs: Omit<List, "id" | "created_at">,
): Promise<List> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase.from("lists").insert(inputs).select().single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
