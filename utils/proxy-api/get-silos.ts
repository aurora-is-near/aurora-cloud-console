import { Silo, Token } from "@/types/types"
import { adminSupabase } from "@/utils/supabase/admin-supabase"
import { getTeam } from "@/utils/team"

export const getSilos = async (teamKey: string | null): Promise<Silo[]> => {
  if (!teamKey) {
    return []
  }

  const team = await getTeam(teamKey)

  const { data: silos, error: silosError } = await adminSupabase()
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

  const { data: tokens, error: tokensError } = await adminSupabase()
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
    name: silo.name,
    chainId: silo.chain_id,
    tokens: tokensBySiloId[silo.id] ?? [],
  }))
}
