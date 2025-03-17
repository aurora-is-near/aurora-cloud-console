"use server"

import { performSiloConfigTransaction } from "@/actions/deployment/perform-silo-config-transaction"
import {
  Silo,
  SiloConfigTransactionOperation,
  SiloConfigTransactionStatus,
} from "@/types/types"
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"
import { DefaultToken } from "@/types/default-tokens"

const CONTRACT_CHANGER_SYMBOLS: Record<
  DefaultToken,
  Parameters<typeof contractChangerApiClient.mirrorErc20Token>[0]["token"]
> = {
  NEAR: "Near",
  AURORA: "Aurora",
  USDt: "Usdt",
  USDC: "Usdc",
}

const SILO_CONFIG_TRANSACTION_OPERATIONS: Record<
  DefaultToken,
  SiloConfigTransactionOperation
> = {
  NEAR: "DEPLOY_NEAR",
  AURORA: "DEPLOY_AURORA",
  USDt: "DEPLOY_USDT",
  USDC: "DEPLOY_USDC",
}

export const performDeployTokenTransaction = async ({
  silo,
  symbol,
  skipIfFailed,
}: {
  silo: Silo
  symbol: DefaultToken
  skipIfFailed?: boolean
}): Promise<SiloConfigTransactionStatus> => {
  const operation = SILO_CONFIG_TRANSACTION_OPERATIONS[symbol]

  return performSiloConfigTransaction(
    silo,
    operation,
    async () =>
      contractChangerApiClient.mirrorErc20Token({
        siloEngineAccountId: silo.engine_account,
        token: CONTRACT_CHANGER_SYMBOLS[symbol],
      }),
    { skipIfFailed },
  )
}
