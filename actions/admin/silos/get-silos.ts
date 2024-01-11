"use server"

import { SiloWithRelationships, Team, Token } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getSilos = async (
  teamKey?: string | null,
): Promise<SiloWithRelationships[]> => {
  const supabase = createAdminSupabaseClient()

  const silosQuery = supabase
    .from("silos")
    .select("*, teams!inner(team_key)")
    .order("created_at", { ascending: false })

  if (teamKey) {
    silosQuery.eq("teams.team_key", teamKey)
  }

  const { data: silos, error: silosError } = await silosQuery

  if (silosError) {
    throw silosError
  }

  const siloIds = silos?.map((silo) => silo.id)

  const { data: tokens, error: tokensError } = await supabase
    .from("tokens")
    .select("*, silos_tokens!inner(silo_id)")
    .in("silos_tokens.silo_id", siloIds)

  if (tokensError) {
    throw tokensError
  }

  const tokensBySiloId = tokens.reduce<Record<string, Token[]>>(
    (acc, token) => {
      token.silos_tokens.forEach(({ silo_id }) => {
        acc[silo_id] = [...(acc[silo_id] ?? []), token]
      })

      return acc
    },
    {},
  )

  return silos?.map((silo) => ({
    ...silo,
    tokens: tokensBySiloId[silo.id] ?? [],
  }))
}
