"use server"

import { BASE_TOKENS } from "@/constants/base-token"
import { performSiloConfigTransaction } from "@/actions/deployment/perform-silo-config-transaction"
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"
import type { BaseTokenSymbol, Silo } from "@/types/types"

const isValidBaseToken = (baseToken: string): baseToken is BaseTokenSymbol => {
  return Object.keys(BASE_TOKENS).includes(baseToken)
}

export const collectGas = async ({
  silo,
  amount,
}: {
  silo: Silo
  amount: string
}) => {
  if (!isValidBaseToken(silo.base_token_symbol)) {
    throw new Error(`Invalid base token symbol: ${silo.base_token_symbol}`)
  }

  if (!silo.gas_collection_address) {
    return "FAILED"
  }

  const baseTokenConfig = BASE_TOKENS[silo.base_token_symbol]

  // should not happen, just for TS check
  if (!baseTokenConfig) {
    throw new Error(
      `Attempted to use unsupported base token: ${silo.base_token_symbol}`,
    )
  }

  return performSiloConfigTransaction(
    silo,
    "COLLECT_GAS",
    async () =>
      contractChangerApiClient.collectGasToNear({
        siloEngineAccountId: silo.engine_account,
        address: silo.gas_collection_address as string,
        network: "near",
        amount,
      }),
    { skipIfFailed: false, nearAccountId: baseTokenConfig.nearAccountId },
  )
}
