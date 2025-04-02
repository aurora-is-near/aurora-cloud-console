import {
  DealSchema,
  OracleSchema,
  RuleSchema,
  SiloBridgedTokenSchema,
  SiloSchema,
} from "@/types/api-schemas"
import { AuroraOracle } from "@/types/oracle"
import {
  BridgedToken,
  Deal,
  Rule,
  Silo,
  SiloBridgedToken,
  SiloBridgedTokenMetadata,
} from "@/types/types"

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

export const adaptToken = (
  token: SiloBridgedToken,
): SiloBridgedTokenSchema => ({
  id: token.id,
  createdAt: token.created_at,
  name: token.name,
  symbol: token.symbol,
  decimals: token.decimals,
  aurora_address: token.aurora_address,
  ethereum_address: token.ethereum_address,
  near_address: token.near_address,
  iconUrl: token.icon_url,
  isDeploymentPending: token.is_deployment_pending,
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
  rpcUrl: silo.rpc_url,
  intentsIntegrationStatus: silo.intents_integration_status,
  trisolarisIntegrationStatus: silo.trisolaris_integration_status,
  nativeToken: {
    name: silo.base_token_name,
    symbol: silo.base_token_symbol,
    decimals: silo.base_token_decimals,
  },
})

export const adaptOracle = (oracle: AuroraOracle): OracleSchema => ({
  createdAt: oracle.created_at,
  updatedAt: oracle.updated_at,
  address: oracle.contract?.address ?? null,
})

export const adaptSiloBridgedToken = (
  siloId: number,
  token: BridgedToken & {
    silo_bridged_tokens: SiloBridgedTokenMetadata[]
  },
): SiloBridgedToken | null => {
  const bridgedTokenMeta = token.silo_bridged_tokens.find(
    (siloBridgedToken) => siloBridgedToken.silo_id === siloId,
  )

  // The token is not bridged for this silo
  if (!bridgedTokenMeta) {
    return null
  }

  return {
    ...token,
    is_deployment_pending: bridgedTokenMeta.is_deployment_pending,
  }
}
