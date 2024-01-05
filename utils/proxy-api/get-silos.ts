import { Silo, Token } from "@/types/types"
import { getTeam } from "@/utils/team"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getSilos = async (teamKey: string | null): Promise<Silo[]> => {
  if (!teamKey) {
    return []
  }

  const team = await getTeam(teamKey)

  const { data: silos, error: silosError } = await createAdminSupabaseClient()
    .from("silos")
    .select("*")
    .order("created_at", { ascending: false })
    .eq("team_id", team.id)

  if (!silos) {
    return []
  }

  if (silosError) {
    throw silosError
  }

  const siloIds = silos?.map((silo) => silo.id)

  const { data: tokens, error: tokensError } = await createAdminSupabaseClient()
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
    id: silo.id,
    created_at: silo.created_at,
    team_id: silo.team_id,
    name: silo.name,
    chain_id: silo.chain_id,
    tokens: tokensBySiloId[silo.id] ?? [],
  }))
}
