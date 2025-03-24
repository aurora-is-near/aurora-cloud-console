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
  { skipIfFailed = false }: { skipIfFailed?: boolean } = {},
): Promise<SiloConfigTransactionStatus> => {
  const previousTransactions = await getSiloConfigTransactions(
    silo.id,
    operation,
  )

  // If there has already been a successful transaction for this operation
  // we don't need to trigger another one.
  if (findTransactionWithStatus(previousTransactions, "SUCCESSFUL")) {
    return "SUCCESSFUL"
  }

  const pendingTransaction = findTransactionWithStatus(
    previousTransactions,
    "PENDING",
  )

  // If there is already a pending transaction we can check its status and
  // return the result.
  if (pendingTransaction) {
    return checkPendingTransaction(pendingTransaction, silo)
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
  })

  return "PENDING"
}
