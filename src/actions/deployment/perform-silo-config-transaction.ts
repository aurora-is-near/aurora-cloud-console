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
): Promise<SiloConfigTransactionStatus> => {
  const previousTransactions = await getSiloConfigTransactions(
    silo.id,
    operation,
  )

  if (findTransactionWithStatus(previousTransactions, "SUCCESSFUL")) {
    return "SUCCESSFUL"
  }

  const pendingBaseTokenTransaction = findTransactionWithStatus(
    previousTransactions,
    "PENDING",
  )

  if (pendingBaseTokenTransaction) {
    return checkPendingTransaction(pendingBaseTokenTransaction, silo)
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
    operation: "SET_BASE_TOKEN",
    status: "PENDING",
  })

  return "PENDING"
}
