"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Silo } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"
import { toSupabaseBigIntString } from "@/supabase/to-supabase-bigint-string"

export const updateSiloGasPrice = async (
  id: number,
  inputs: Pick<Silo, "gas_price">,
): Promise<Silo> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("silos")
    .update({ gas_price: inputs.gas_price })
    .eq("id", id)
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
