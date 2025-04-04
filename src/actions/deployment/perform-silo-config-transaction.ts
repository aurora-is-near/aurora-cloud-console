import { createSiloConfigTransaction } from "@/actions/silo-config-transactions/create-silo-config-transaction"
import { getSiloConfigTransactions } from "@/actions/silo-config-transactions/get-silo-config-transactions"
import { logger } from "@/logger"
import {
  Silo,
  SiloConfigTransactionOperation,
  SiloConfigTransactionStatus,
} from "@/types/types"
import { checkPendingTransaction } from "@/utils/check-pending-transaction"
import { findTransactionWithStatus } from "@/utils/find-transaction-with-status"

export const performSiloConfigTransaction = async (
  silo: Silo,
  operation: SiloConfigTransactionOperation,
  performTransaction: () => Promise<{ tx_hash?: string }>,
  {
    skipIfFailed = false,
    nearAccountId,
  }: {
    skipIfFailed?: boolean
    nearAccountId?: string | null
  } = {},
): Promise<SiloConfigTransactionStatus> => {
  const previousTransactions = await getSiloConfigTransactions(
    silo.id,
    [operation],
    nearAccountId,
  )

  const pendingTransactions = previousTransactions.filter(
    (transaction) => transaction.status === "PENDING",
  )

  // Update the status of all transactions that are still pending.
  const updatedStatuses = await Promise.all(
    pendingTransactions.map(async (transaction) =>
      checkPendingTransaction(transaction, silo),
    ),
  )

  // If there was already a successful transaction for this operation
  // we don't need to trigger another one.
  if (findTransactionWithStatus(previousTransactions, "SUCCESSFUL")) {
    return "SUCCESSFUL"
  }

  // If a pending transaction was subsequently successful we can return
  // that status.
  if (updatedStatuses.includes("SUCCESSFUL")) {
    return "SUCCESSFUL"
  }

  // Return the result of the first transaction that was previously pending.
  if (updatedStatuses.length) {
    return updatedStatuses[0]
  }

  const failedTransaction = findTransactionWithStatus(
    previousTransactions,
    "FAILED",
  )

  // In some cases we may want to skip the transaction if it has previously
  // failed. If something needs to be fixed before the transaction has a chance
  // of succeeding there is no point in some of our automated processes spamming
  // the network with transactions that we know will still fail.
  if (failedTransaction && skipIfFailed) {
    return "FAILED"
  }

  let tx_hash: string | undefined

  try {
    ;({ tx_hash } = await performTransaction())
  } catch (error) {
    logger.error(error)

    return "FAILED"
  }

  // If no hash was returned we assume the transaction was successful.
  if (!tx_hash) {
    return "SUCCESSFUL"
  }

  // Otherwise, we store the transaction details in the database so we can later
  // check its status.
  await createSiloConfigTransaction({
    silo_id: silo.id,
    transaction_hash: tx_hash,
    operation,
    status: "PENDING",
    target: nearAccountId ?? null,
  })

  return "PENDING"
}
