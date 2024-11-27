"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Silo } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const updateSiloGasPrice = async (
  id: number,
  inputs: {
    name?: string
    open?: boolean
    enabled?: boolean
    start_time?: string
    end_time?: string
  },
): Promise<Deal> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silos")
    .update(inputs)
    .eq("id", id)
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
