"use server"

import { createSiloConfigTransaction } from "@/actions/silo-config-transactions/create-silo-config-transaction"
import { getSiloConfigTransactions } from "@/actions/silo-config-transactions/get-silo-config-transactions"
import { BASE_TOKENS } from "@/constants/base-token"
import { BaseTokenSymbol, Silo } from "@/types/types"
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"

const isValidBaseToken = (baseToken: string): baseToken is BaseTokenSymbol => {
  return Object.keys(BASE_TOKENS).includes(baseToken)
}

export const setBaseToken = async (silo: Silo) => {
  if (!isValidBaseToken(silo.base_token_symbol)) {
    throw new Error(`Invalid base token symbol: ${silo.base_token_symbol}`)
  }

  // The default base token for all silos is ETH. Considering we can only ever
  // set the base token once, if the base token selected for the silo is ETH we
  // don't need to do anything.
  if (silo.base_token_symbol === "ETH") {
    return
  }

  const baseTokenConfig = BASE_TOKENS[silo.base_token_symbol]

  if (!baseTokenConfig) {
    throw new Error(
      `Attempted to set unsupported base token: ${silo.base_token_symbol}`,
    )
  }

  const pendingTransactions = await getSiloConfigTransactions(silo.id)
  const pendingBaseTokenTransaction = pendingTransactions.find(
    (transaction) =>
      transaction.operation === "SET_BASE_TOKEN" &&
      transaction.status === "PENDING",
  )

  // If there is already a pending transaction for setting the base token, we
  // don't need to trigger another one.
  if (!pendingBaseTokenTransaction) {
    return
  }

  const { tx_hash } = await contractChangerApiClient.setBaseToken({
    siloEngineAccountId: silo.engine_account,
    baseTokenAccountId: baseTokenConfig.nearAccountId,
  })

  if (!tx_hash) {
    return
  }

  await createSiloConfigTransaction({
    silo_id: silo.id,
    transaction_hash: tx_hash,
    operation: "SET_BASE_TOKEN",
    status: "PENDING",
  })
}
