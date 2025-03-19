"use server"

import { JsonRpcProvider } from "ethers"
import { performSiloConfigTransaction } from "@/actions/deployment/perform-silo-config-transaction"
import {
  Silo,
  SiloConfigTransactionOperation,
  SiloConfigTransactionStatus,
} from "@/types/types"
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"
import { checkTokenBySymbol } from "@/utils/check-token-contract"
import { DefaultToken } from "@/types/default-tokens"
import { DEFAULT_TOKENS } from "@/constants/default-tokens"

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

const deployDefaultToken = async ({
  provider,
  silo,
  symbol,
  skipIfFailed,
}: {
  provider: JsonRpcProvider
  silo: Silo
  symbol: DefaultToken
  skipIfFailed?: boolean
}): Promise<SiloConfigTransactionStatus> => {
  if (await checkTokenBySymbol(provider, symbol)) {
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
    { skipIfFailed },
  )
}

export const deployDefaultTokens = async (
  silo: Silo,
  { skipIfFailed }: { skipIfFailed?: boolean } = {},
): Promise<SiloConfigTransactionStatus> => {
  const provider = new JsonRpcProvider(silo.rpc_url)

  const statuses = await Promise.all(
    DEFAULT_TOKENS.filter((token) => token !== silo.base_token_symbol).map(
      async (symbol) =>
        deployDefaultToken({
          provider,
          silo,
          symbol,
          skipIfFailed,
        }),
    ),
  )

  if (statuses.includes("PENDING")) {
    return "PENDING"
  }

  if (statuses.includes("FAILED")) {
    return "FAILED"
  }

  return "SUCCESSFUL"
}
