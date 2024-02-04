import { DealSchema, ListSchema, SiloSchema } from "@/types/api-schemas"
import { Deal, List, Silo } from "@/types/types"

const getIsoString = (date: number | null) => {
  return date ? new Date(date).toISOString() : null
}

export const adaptDeal = (deal: Deal): DealSchema => ({
  id: deal.id,
  createdAt: deal.created_at,
  updatedAt: deal.updated_at,
  name: deal.name,
  teamId: deal.team_id,
  enabled: deal.enabled,
  startTime: getIsoString(deal.start_time),
  endTime: getIsoString(deal.end_time),
})

export const adaptSilo = (silo: Silo): SiloSchema => ({
  id: silo.id,
  name: silo.name,
  chainId: silo.chain_id,
  createdAt: silo.created_at,
  updatedAt: silo.updated_at,
  engineAccount: silo.engine_account,
  engineVersion: silo.engine_version,
  genesis: silo.genesis,
  network: silo.network,
  rpcUrl: silo.rpc_url,
})

export const adaptList = (list: List): ListSchema => ({
  id: list.id,
  createdAt: list.created_at,
  name: list.name,
  teamId: list.team_id,
})
