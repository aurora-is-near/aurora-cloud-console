import {
  DealSchema,
  ListSchema,
  SiloSchema,
  SimpleListSchema,
} from "@/types/api-schemas"
import { Deal, List, Silo } from "@/types/types"

const getIsoString = (date: number | null) => {
  return date ? new Date(date).toISOString() : null
}

const getRelatedList = (
  lists: List[],
  id: number | null,
): SimpleListSchema | null => {
  const list = lists.find(({ id: listId }) => listId === id)

  if (!list) {
    return null
  }

  return {
    id: list.id,
    name: list.name,
  }
}

export const adaptDeal = (deal: Deal, lists: List[]): DealSchema => ({
  id: deal.id,
  createdAt: deal.created_at,
  updatedAt: deal.updated_at,
  name: deal.name,
  teamId: deal.team_id,
  enabled: deal.enabled,
  startTime: getIsoString(deal.start_time),
  endTime: getIsoString(deal.end_time),
  lists: {
    chainFilter: getRelatedList(lists, deal.chain_filter_list_id),
    contractFilter: getRelatedList(lists, deal.contract_filter_list_id),
    eoaFilter: getRelatedList(lists, deal.eoa_filter_list_id),
    eoaBlacklist: getRelatedList(lists, deal.eoa_blacklist_list_id),
  },
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
