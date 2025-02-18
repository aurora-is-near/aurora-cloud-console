import {
  DealSchema,
  OracleSchema,
  RuleSchema,
  SiloSchema,
  TokenSchema,
} from "@/types/api-schemas"
import { AuroraOracle } from "@/types/oracle"
import { Deal, Rule, Silo, Token } from "@/types/types"
import { BASE_TOKEN_DECIMALS } from "@/constants/base-token"

const getIsoString = (date: number | null) => {
  return date ? new Date(date).toISOString() : null
}

export const adaptDeal = (deal: Deal): DealSchema => {
  return {
    id: deal.id,
    createdAt: deal.created_at,
    updatedAt: deal.updated_at,
    deletedAt: deal.deleted_at,
    name: deal.name,
    teamId: deal.team_id,
    siloId: deal.silo_id,
    enabled: deal.enabled,
    open: deal.open,
    startTime: deal.start_time
      ? getIsoString(new Date(deal.start_time).getTime())
      : null,
    endTime: deal.end_time
      ? getIsoString(new Date(deal.end_time).getTime())
      : null,
  }
}

export const adaptRule = (rule: Rule): RuleSchema => ({
  id: rule.id,
  createdAt: rule.created_at,
  updatedAt: rule.updated_at,
  dealId: rule.deal_id,
  chains: rule.chains,
  contracts: rule.contracts,
  exceptChains: rule.except_chains,
  exceptContracts: rule.except_contracts,
})

export const adaptToken = (token: Token): TokenSchema => ({
  id: token.id,
  address: token.address,
  createdAt: token.created_at,
  symbol: token.symbol,
  name: token.name,
  decimals: token.decimals,
  deploymentStatus: token.deployment_status,
  iconUrl: token.icon_url,
  type: token.type,
  bridge:
    token.bridge_deployment_status === "NOT_DEPLOYED"
      ? null
      : {
          deploymentStatus: token.bridge_deployment_status,
          isFast: token.fast_bridge,
          addresses: (token.bridge_addresses ?? []).map((bridgeAddress) => {
            const [network, address] = bridgeAddress.split(":")

            return {
              network,
              address,
            }
          }),
          origin: token.bridge_origin,
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
  nativeToken: {
    name: silo.base_token_name,
    symbol: silo.base_token_symbol,
    decimals: BASE_TOKEN_DECIMALS,
  },
})

export const adaptOracle = (oracle: AuroraOracle): OracleSchema => ({
  createdAt: oracle.created_at,
  updatedAt: oracle.updated_at,
  address: oracle.contract?.address ?? null,
})
