"use server"

import { createAdminSupabaseClient } from "@/supabase/create-admin-supabase-client"
import { AuroraOracle } from "@/types/oracle"
import { getSilo } from "@/actions/silos/get-silo"
import { auroraOracleApiClient } from "@/utils/aurora-oracle-api/client"

export const getSiloOracle = async (
  id: number,
): Promise<AuroraOracle | null> => {
  const supabase = createAdminSupabaseClient()
  const [silo, { data: oracle }, contracts] = await Promise.all([
    getSilo(id),
    supabase.from("oracles").select("*").eq("silo_id", id).maybeSingle(),
    auroraOracleApiClient.getContracts(),
  ])

  if (!oracle) {
    return null
  }

  const contract = contracts.items.find(
    ({ chainId }) => chainId === silo?.chain_id,
  )

  return { ...oracle, contract }
}
