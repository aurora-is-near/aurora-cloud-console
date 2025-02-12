"use server"

import { BASE_TOKENS } from "@/constants/base-token"
import { BaseTokenSymbol, Silo } from "@/types/types"
import { createSiloDeployerApiClient } from "@/utils/silo-deployer-api/silo-deployer-api-client"

const isValidBaseToken = (baseToken: string): baseToken is BaseTokenSymbol => {
  return Object.keys(BASE_TOKENS).includes(baseToken)
}

export const setBaseToken = async (silo: Silo) => {
  const siloDeployerApiClient = createSiloDeployerApiClient()

  if (!isValidBaseToken(silo.base_token_symbol)) {
    throw new Error(`Invalid base token symbol: ${silo.base_token_symbol}`)
  }

  const baseTokenConfig = BASE_TOKENS[silo.base_token_symbol]

  if (!baseTokenConfig) {
    throw new Error(
      `Attempted to set unsupported base token: ${silo.base_token_symbol}`,
    )
  }

  // TODO: Place the transaction hash returned from this API call in a database,
  // so that we can track success or failure.
  await siloDeployerApiClient.setBaseToken({
    params: {
      contract_id: silo.engine_account,
    },
    data: {
      base_token_account_id: baseTokenConfig.nearAccountId,
    },
  })
}
