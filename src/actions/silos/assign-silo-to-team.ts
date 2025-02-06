"use server"

import {
  assertNonNullSupabaseResult,
  assertValidSupabaseResult,
} from "@/utils/supabase"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { KNOWN_BASE_TOKENS } from "@/constants/tokens"
import type { KnownBaseTokenSymbol } from "@/types/types"

type BaseToken =
  | { symbol: KnownBaseTokenSymbol; name?: never }
  | { symbol: string; name: string }

export const assignSiloToTeam = async (
  teamId: number,
  baseToken: BaseToken,
) => {
  const supabase = createAdminSupabaseClient()

  // 1. Get next available unassigned silo
  const unassignedSiloResult = await supabase
    .from("silos")
    .select("id, teams(id)")
    .is("teams", null)
    .order("id", { ascending: true })
    .limit(1)
    .maybeSingle()

  assertNonNullSupabaseResult(unassignedSiloResult, "Unassigned silo not found")
  assertValidSupabaseResult(unassignedSiloResult)

  // 2. Assign silo to a team
  const siloId = unassignedSiloResult.data.id

  await supabase
    .from("silos_teams")
    .insert([{ team_id: teamId, silo_id: siloId }])

  // 3. Update silo's base token data
  const baseTokenName = baseToken.name ?? KNOWN_BASE_TOKENS[baseToken.symbol]
  const assignedSiloResult = await supabase
    .from("silos")
    .update({
      base_token_name: baseTokenName,
      base_token_symbol: baseToken.symbol,
    })
    .eq("id", siloId)
    .select()
    .single()

  assertNonNullSupabaseResult(
    assignedSiloResult,
    "Base token data failed to update for a silo",
  )
  assertValidSupabaseResult(assignedSiloResult)

  return assignedSiloResult.data
}
