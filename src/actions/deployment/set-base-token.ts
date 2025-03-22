"use server"

import { performSiloConfigTransaction } from "@/actions/deployment/perform-silo-config-transaction"
import { BASE_TOKENS } from "@/constants/base-token"
import {
  BaseTokenSymbol,
  Silo,
  SiloConfigTransactionStatus,
} from "@/types/types"
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"

const isValidBaseToken = (baseToken: string): baseToken is BaseTokenSymbol => {
  return Object.keys(BASE_TOKENS).includes(baseToken)
}

export const setBaseToken = async (
  silo: Silo,
  { skipIfFailed }: { skipIfFailed?: boolean } = {},
): Promise<SiloConfigTransactionStatus> => {
  if (!isValidBaseToken(silo.base_token_symbol)) {
    throw new Error(`Invalid base token symbol: ${silo.base_token_symbol}`)
  }

  // The default base token for all silos is ETH. Considering we can only ever
  // set the base token once, if the base token selected for the silo is ETH we
  // don't need to do anything.
  if (silo.base_token_symbol === "ETH") {
    return "SUCCESSFUL"
  }

  const baseTokenConfig = BASE_TOKENS[silo.base_token_symbol]

  if (!baseTokenConfig) {
    throw new Error(
      `Attempted to set unsupported base token: ${silo.base_token_symbol}`,
    )
  }

  return performSiloConfigTransaction(
    silo,
    "SET_BASE_TOKEN",
    async () => {
      return contractChangerApiClient.setBaseToken({
        siloEngineAccountId: silo.engine_account,
        baseTokenAccountId: baseTokenConfig.nearAccountId,
      })
    },
    { skipIfFailed },
  )
}
