import { Account } from "near-api-js"
import { getNearApiConnection } from "@/utils/near-api/connect"
import { logger } from "@/logger"
import { BASE_TOKEN_PLACEHOLDER_ADDRESS } from "@/constants/base-token"
import { NEAR_TOKEN_ADDRESSES } from "@/constants/near-token"

type StorageBalanceResult = { total: string; available: string } | null

const getNearAccount = async (siloEngineAccountId: string) => {
  const nearConnection = await getNearApiConnection()

  return new Account(nearConnection.connection, siloEngineAccountId)
}

const getAccountBalance = async (
  siloEngineAccountId: string,
): Promise<StorageBalanceResult> => {
  const acc = await getNearAccount(siloEngineAccountId)
  const { total, available } = await acc.getAccountBalance()

  return { total, available }
}

export const getStorageBalanceByAddress = async (
  siloEngineAccountId: string,
  contractId: string,
): Promise<StorageBalanceResult> => {
  if (contractId === BASE_TOKEN_PLACEHOLDER_ADDRESS) {
    return getAccountBalance(siloEngineAccountId)
  }

  const acc = await getNearAccount(siloEngineAccountId)

  let result: StorageBalanceResult

  try {
    result = await acc.viewFunction({
      contractId,
      methodName: "storage_balance_of",
      args: { account_id: siloEngineAccountId },
    })
  } catch (error) {
    logger.error("Error checking storage balance:", error)

    return null
  }

  return result
}

export const getStorageBalanceBySymbol = async (
  siloEngineAccountId: string,
  symbol: keyof typeof NEAR_TOKEN_ADDRESSES | "NEAR",
): Promise<StorageBalanceResult> => {
  if (symbol === "NEAR") {
    return getAccountBalance(siloEngineAccountId)
  }

  const tokenContractAddress = NEAR_TOKEN_ADDRESSES[symbol]

  if (!tokenContractAddress) {
    throw new Error(`Near token address not found for symbol: ${symbol}`)
  }

  return getStorageBalanceByAddress(siloEngineAccountId, tokenContractAddress)
}
