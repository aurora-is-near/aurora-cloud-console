"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { Widget, WidgetNetworkType } from "@/types/types"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"

export const upsertWidget = async (
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
    .upsert(
      {
        silo_id: siloId,
        from_networks: inputs.fromNetworks,
        to_networks: inputs.toNetworks,
        tokens: inputs.tokens,
      },
      { onConflict: "silo_id" },
    )
    .select()
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  return result.data
}
