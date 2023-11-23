import { ApiUser, Deal } from "@/types/types"
import { adminSupabase } from "@/utils/supabase"

export const getDeals = async (user: ApiUser): Promise<Deal[]> => {
  if (!user.company_id) {
    return []
  }

  const { data: deals, error: dealsError } = await adminSupabase()
    .from("deals")
    .select("id, name, created_at, key, deals_contracts!inner(*)")
    .eq("company_id", user.company_id)

  if (!deals) {
    return []
  }

  if (dealsError) {
    throw dealsError
  }

  const contractIds = deals
    ?.map((deal) =>
      deal.deals_contracts.map((contract) => contract.contract_id),
    )
    .flat()

  const uniqueContractIds = [...new Set(contractIds)]
  const { data: contracts, error: contractsError } = await adminSupabase()
    .from("contracts")
    .select("*")
    .in("id", uniqueContractIds)

  if (contractsError) {
    throw contractsError
  }

  return deals?.map((deal) => ({
    id: deal.id,
    name: deal.name,
    created_at: deal.created_at,
    key: deal.key,
    contracts: contracts.filter((contract) =>
      deal.deals_contracts
        .map((dealContract) => dealContract.contract_id)
        .includes(contract.id),
    ),
  }))
}
