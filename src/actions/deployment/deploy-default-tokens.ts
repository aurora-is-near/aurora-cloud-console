"use server"

import { JsonRpcProvider } from "ethers"
import { performSiloConfigTransaction } from "@/actions/deployment/perform-silo-config-transaction"
import {
  Silo,
  SiloConfigTransactionOperation,
  SiloConfigTransactionStatus,
} from "@/types/types"
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"
import { checkToken } from "@/utils/check-token-contract"
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

export const deployDefaultToken = async ({
  provider,
  silo,
  symbol,
}: {
  provider: JsonRpcProvider
  silo: Silo
  symbol: DefaultToken
}): Promise<SiloConfigTransactionStatus> => {
  if (await checkToken(provider, symbol)) {
    return "SUCCESSFUL"
  }

  return performSiloConfigTransaction(
    silo,
    SILO_CONFIG_TRANSACTION_OPERATIONS[symbol],
    async () =>
      contractChangerApiClient.mirrorErc20Token({
        siloEngineAccountId: silo.engine_account,
        token: CONTRACT_CHANGER_SYMBOLS[symbol],
      }),
  )
}

export const deployDefaultTokens = async (
  silo: Silo,
): Promise<SiloConfigTransactionStatus> => {
  const provider = new JsonRpcProvider(silo.rpc_url)

  const statuses = await Promise.all([
    deployDefaultToken({
      provider,
      silo,
      symbol: "NEAR",
    }),
    deployDefaultToken({
      provider,
      silo,
      symbol: "AURORA",
    }),
    deployDefaultToken({
      provider,
      silo,
      symbol: "USDt",
    }),
    deployDefaultToken({
      provider,
      silo,
      symbol: "USDC",
    }),
  ])

  if (statuses.includes("PENDING")) {
    return "PENDING"
  }

  if (statuses.includes("FAILED")) {
    return "FAILED"
  }

  return "SUCCESSFUL"
}
