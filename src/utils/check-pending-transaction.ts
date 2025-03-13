import { updateSiloConfigTransaction } from "@/actions/silo-config-transactions/update-silo-config-transaction"
import {
  Silo,
  SiloConfigTransaction,
  SiloConfigTransactionStatus,
} from "@/types/types"
import { getNearTransactionStatus } from "@/utils/near-api/transactions"

export const checkPendingTransaction = async (
  transaction: SiloConfigTransaction,
  silo: Silo,
): Promise<SiloConfigTransactionStatus> => {
  const status = await getNearTransactionStatus(
    transaction.transaction_hash,
    silo.engine_account,
  )

  if (status !== "PENDING") {
    await updateSiloConfigTransaction(transaction.id, {
      status,
    })
  }

  return status
}
