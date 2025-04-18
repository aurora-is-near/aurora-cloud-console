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
import { getStorageBalanceBySymbol } from "@/utils/near-storage"
import { NEAR_TOKEN_ADDRESSES } from "@/constants/near-token"
import { STORAGE_DEPOSIT_AMOUNT } from "@/constants/storage-deposits"

const CONTRACT_CHANGER_SYMBOLS: Record<
  DefaultToken,
  Parameters<typeof contractChangerApiClient.mirrorErc20Token>[0]["token"]
> = {
  NEAR: "Near",
  AURORA: "Aurora",
  USDt: "Usdt",
  USDC: "Usdc",
  ETH: {
    source_contract_id: "0x4e454160.c.aurora",
    nep141: "eth.bridge.near",
  },
}

const SILO_CONFIG_TRANSACTION_OPERATIONS: Record<
  DefaultToken,
  SiloConfigTransactionOperation
> = {
  NEAR: "DEPLOY_NEAR",
  AURORA: "DEPLOY_AURORA",
  USDt: "DEPLOY_USDT",
  USDC: "DEPLOY_USDC",
  ETH: "DEPLOY_ETH",
}

const checkContract = async ({
  provider,
  silo,
  symbol,
  skipIfFailed,
}: {
  provider: JsonRpcProvider
  silo: Silo
  symbol: DefaultToken
  skipIfFailed?: boolean
}) => {
  const isContractDeployed = await checkTokenBySymbol(provider, symbol)
  const nearAccountId = symbol === "NEAR" ? null : NEAR_TOKEN_ADDRESSES[symbol]

  if (isContractDeployed) {
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
    { skipIfFailed, nearAccountId },
  )
}

const checkStorageBalance = async ({
  silo,
  symbol,
  skipIfFailed,
}: {
  silo: Silo
  symbol: DefaultToken
  skipIfFailed?: boolean
}) => {
  if (symbol === "NEAR") {
    return "SUCCESSFUL"
  }

  const storageBalance = await getStorageBalanceBySymbol(
    silo.engine_account,
    symbol,
  )

  if (storageBalance?.total) {
    return "SUCCESSFUL"
  }

  const nearAccountId = NEAR_TOKEN_ADDRESSES[symbol]

  return performSiloConfigTransaction(
    silo,
    "STORAGE_DEPOSIT",
    async () =>
      contractChangerApiClient.makeStorageDeposit({
        siloEngineAccountId: silo.engine_account,
        amount: STORAGE_DEPOSIT_AMOUNT,
        token: nearAccountId,
      }),
    { skipIfFailed, nearAccountId },
  )
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
}): Promise<SiloConfigTransactionStatus[]> => {
  return Promise.all([
    checkContract({ provider, silo, symbol, skipIfFailed }),
    checkStorageBalance({ silo, symbol, skipIfFailed }),
  ])
}

export const deployDefaultTokens = async (
  silo: Silo,
  { skipIfFailed }: { skipIfFailed?: boolean } = {},
): Promise<SiloConfigTransactionStatus> => {
  const provider = new JsonRpcProvider(silo.rpc_url)

  const statuses = await DEFAULT_TOKENS.filter(
    (token) => token !== silo.base_token_symbol,
  ).reduce(
    async (acc, symbol) => {
      const previousStatuses = await acc
      const symbolStatuses = await deployDefaultToken({
        provider,
        silo,
        symbol,
        skipIfFailed,
      })

      return [...previousStatuses, ...symbolStatuses]
    },
    Promise.resolve([] as SiloConfigTransactionStatus[]),
  )

  if (statuses.includes("PENDING")) {
    return "PENDING"
  }

  if (statuses.includes("FAILED")) {
    return "FAILED"
  }

  return "SUCCESSFUL"
}
