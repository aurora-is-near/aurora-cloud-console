import { Deal } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"
import { proxyApiClient } from "@/utils/proxy-api/request"

export const enableDeal = async (
  id: number,
  enabled: boolean,
): Promise<Deal> => {
  const supabase = createAdminSupabaseClient()
  const result = await supabase
    .from("deals")
    .update({ enabled })
    .eq("id", id)
    .select("*, teams!inner(id)")
    .single()

  assertValidSupabaseResult(result)
  assertNonNullSupabaseResult(result)

  if (!result.data.teams) {
    throw new Error("No team found")
  }

  await proxyApiClient.update([
    {
      op_type: "set_value",
      var_type: "number",
      var_key: `deal::acc::customers::${result.data.teams.id}::deals::${result.data.id}::enabled`,
      number_value: enabled ? 1 : 0,
    },
  ])

  return result.data
}
