"use server"

import { Silo } from "@/types/types"
import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"

export const getTeamsSilos = async (): Promise<Record<string, Silo[]>> => {
  const supabase = createAdminSupabaseClient()
  const { data: silos } = await supabase
    .from("silos")
    .select("*, teams(team_key)")
    .order("created_at", { ascending: true })

  return (
    silos?.reduce<Record<string, Silo[]>>((acc, silo) => {
      silo.teams.forEach((team) => {
        acc[team.team_key] = acc[team.team_key] ?? []
        acc[team.team_key].push(silo)
      })
      return acc
    }, {}) ?? {}
  )
}
