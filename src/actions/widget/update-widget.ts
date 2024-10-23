"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Widget, WidgetNetworkType } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const updateWidget = async (
  siloId: number,
  inputs: {
    fromNetworks?: WidgetNetworkType[]
    toNetworks?: WidgetNetworkType[]
    tokens?: number[]
  },
): Promise<Widget> => {
  const supabase = createAdminSupabaseClient()

  const result = await supabase
    .from("widgets")
    .update({
      from_networks: inputs.fromNetworks,
      to_networks: inputs.toNetworks,
      tokens: inputs.tokens,
    })
    .eq("silo_id", siloId)
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
