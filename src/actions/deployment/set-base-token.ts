"use server"

import { createSiloConfigTransaction } from "@/actions/silo-config-transactions/create-silo-config-transaction"
import { getSiloConfigTransactions } from "@/actions/silo-config-transactions/get-silo-config-transactions"
import { updateSiloConfigTransaction } from "@/actions/silo-config-transactions/update-silo-config-transaction"
import { BASE_TOKENS } from "@/constants/base-token"
import {
  BaseTokenSymbol,
  Silo,
  SiloConfigTransactionStatus,
  SilosConfigTransaction,
} from "@/types/types"
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"
import { getNearTransactionStatus } from "@/utils/near-api/transactions"

const checkPendingTransaction = async (
  transaction: SilosConfigTransaction,
  silo: Silo,
): Promise<SiloConfigTransactionStatus> => {
  const status = await getNearTransactionStatus(
    transaction.transaction_hash,
    silo.engine_account,
  )

  console.log(`Transaction status: ${status}`)

  if (status !== "PENDING") {
    await updateSiloConfigTransaction(transaction.id, {
      status,
    })
  }

  return status
}

const isValidBaseToken = (baseToken: string): baseToken is BaseTokenSymbol => {
  return Object.keys(BASE_TOKENS).includes(baseToken)
}

const findTransactionWithStatus = (
  transactions: SilosConfigTransaction[],
  status: SiloConfigTransactionStatus,
): SilosConfigTransaction | undefined => {
  return transactions.find((transaction) => transaction.status === status)
}

export const setBaseToken = async (
  silo: Silo,
): Promise<SiloConfigTransactionStatus> => {
  console.log("setting", silo.base_token_symbol)

  if (!isValidBaseToken(silo.base_token_symbol)) {
    throw new Error(`Invalid base token symbol: ${silo.base_token_symbol}`)
  }

  // The default base token for all silos is ETH. Considering we can only ever
  // set the base token once, if the base token selected for the silo is ETH we
  // don't need to do anything.
  if (silo.base_token_symbol === "ETH") {
    return "SUCCESSFUL"
  }

  const previousTransactions = await getSiloConfigTransactions(silo.id)

  // If there has already been a successful transaction for setting the base
  // token we don't need to trigger another one.
  if (findTransactionWithStatus(previousTransactions, "SUCCESSFUL")) {
    return "SUCCESSFUL"
  }

  const pendingBaseTokenTransaction = findTransactionWithStatus(
    previousTransactions,
    "PENDING",
  )

  // If there is already a pending transaction we can check its status and
  // return the result.
  if (pendingBaseTokenTransaction) {
    return checkPendingTransaction(pendingBaseTokenTransaction, silo)
  }

  const baseTokenConfig = BASE_TOKENS[silo.base_token_symbol]

  if (!baseTokenConfig) {
    throw new Error(
      `Attempted to set unsupported base token: ${silo.base_token_symbol}`,
    )
  }

  const { tx_hash } = await contractChangerApiClient.setBaseToken({
    siloEngineAccountId: silo.engine_account,
    baseTokenAccountId: baseTokenConfig.nearAccountId,
  })

  // If no hash was returned we assume the transaction was successful.
  if (!tx_hash) {
    return "SUCCESSFUL"
  }

  // Otherwise, we store the transaction details in the database so we can later
  // check its status.
  await createSiloConfigTransaction({
    silo_id: silo.id,
    transaction_hash: tx_hash,
    operation: "SET_BASE_TOKEN",
    status: "PENDING",
  })

  return "PENDING"
}
