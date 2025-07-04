import { SiloConfigTransactionStatuses } from "@/types/silo-config-transactions"

export const DEFAULT_SILO_CONFIG_TRANSACTION_STATUSES: SiloConfigTransactionStatuses =
  {
    SET_BASE_TOKEN: null,
    DEPLOY_NEAR: null,
    DEPLOY_USDC: null,
    DEPLOY_USDT: null,
    DEPLOY_AURORA: null,
    INITIALISE_MAKE_TXS_WHITELIST: null,
    INITIALISE_DEPLOY_CONTRACT_WHITELIST: null,
  }
