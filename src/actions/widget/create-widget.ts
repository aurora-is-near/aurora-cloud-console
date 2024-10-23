"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Widget } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const createWidget = async (inputs: {
  silo_id: number
}): Promise<Widget> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase.from("widgets").insert(inputs).select().single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
