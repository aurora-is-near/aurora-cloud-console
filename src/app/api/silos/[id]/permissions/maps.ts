import type { WhitelistKind } from "@/utils/contract-changer-api/contract-changer-api-client"
import type {
  Silo,
  SiloConfigTransactionOperation,
  SiloWhitelistType,
} from "@/types/types"

export const whitelistKindActionMap: Record<SiloWhitelistType, WhitelistKind> =
  {
    MAKE_TRANSACTION: "address",
    DEPLOY_CONTRACT: "evm-admin",
  }

export const whitelistKindToggleOperationMap: Record<
  SiloWhitelistType,
  SiloConfigTransactionOperation
> = {
  MAKE_TRANSACTION: "TOGGLE_MAKE_TXS_WHITELIST",
  DEPLOY_CONTRACT: "TOGGLE_DEPLOY_CONTRACT_WHITELIST",
}

export const whitelistKindPopulateOperationMap: Record<
  SiloWhitelistType,
  SiloConfigTransactionOperation
> = {
  MAKE_TRANSACTION: "POPULATE_MAKE_TXS_WHITELIST",
  DEPLOY_CONTRACT: "POPULATE_DEPLOY_CONTRACT_WHITELIST",
}

export const whitelistKindPurgeOperationMap: Record<
  SiloWhitelistType,
  SiloConfigTransactionOperation
> = {
  MAKE_TRANSACTION: "PURGE_MAKE_TXS_WHITELIST",
  DEPLOY_CONTRACT: "PURGE_DEPLOY_CONTRACT_WHITELIST",
}

export const toggleSiloPermissionUpdateMap: Record<
  SiloWhitelistType,
  (isEnabled: boolean) => Partial<Silo>
> = {
  MAKE_TRANSACTION: (isEnabled) => ({ is_make_txs_public: isEnabled }),
  DEPLOY_CONTRACT: (isEnabled) => ({
    is_deploy_contracts_public: isEnabled,
  }),
}
