import { getNearTransactionStatus } from "@/utils/near-api/transactions"
import { updateSiloConfigTransaction } from "@/actions/silo-config-transactions/update-silo-config-transaction"
import type {
  Silo,
  SiloConfigTransaction,
  SiloConfigTransactionStatus,
} from "@/types/types"

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
