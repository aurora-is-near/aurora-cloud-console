import { LIST_TYPES } from "@/constants/lists"
import {
  DealSchema,
  ListSchema,
  SiloSchema,
  SimpleListSchema,
  TokenSchema,
} from "@/types/api-schemas"
import { ProxyApiDealData } from "@/types/deal"
import { ListType } from "@/types/lists"
import { Deal, List, Silo, Token } from "@/types/types"

const getIsoString = (date: number | null) => {
  return date ? new Date(date).toISOString() : null
}

const getLatestDate = (dates: (string | null)[]): string | null => {
  return dates.reduce((acc, date) => {
    if (!date) {
      return acc
    }

    if (!acc) {
      return date
    }

    return new Date(date) > new Date(acc) ? date : acc
  }, null)
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

export const adaptDeal = (
  deal: Deal,
  proxyApiDeal: ProxyApiDealData,
  lists: List[],
): DealSchema => {
  return {
    id: deal.id,
    createdAt: deal.created_at,
    updatedAt: getLatestDate([proxyApiDeal.updatedAt, deal.updated_at]),
    name: deal.name,
    teamId: deal.team_id,
    enabled: proxyApiDeal.enabled,
    startTime: getIsoString(proxyApiDeal.startTime),
    endTime: getIsoString(proxyApiDeal.endTime),
    lists: LIST_TYPES.reduce(
      (acc, listType) => ({
        ...acc,
        [listType]: getRelatedList(lists, proxyApiDeal.lists[listType]),
      }),
      {} as Record<ListType, SimpleListSchema | null>,
    ),
  }
}

export const adaptToken = (token: Token): TokenSchema => ({
  id: token.id,
  address: token.address,
  createdAt: token.created_at,
  symbol: token.symbol,
  name: token.name,
  decimals: token.decimals,
  deploymentStatus: token.deployment_status,
  bridgeDeploymentStatus: token.bridge_deployment_status,
})

export const adaptSilo = (
  silo: Silo,
  nativeToken?: Token | null,
): SiloSchema => ({
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
  nativeToken: nativeToken ? adaptToken(nativeToken) : null,
})

export const adaptList = (list: List): ListSchema => ({
  id: list.id,
  createdAt: list.created_at,
  name: list.name,
})
