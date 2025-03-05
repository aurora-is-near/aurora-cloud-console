import type { SiloConfigTransaction } from "@/types/types"

// consider that a transaction older than an hour is expired
// and for us it's the same as it has been never sent
export const isTransactionExpired = (
  transaction: SiloConfigTransaction,
): boolean => {
  return (
    new Date(transaction.created_at) < new Date(Date.now() - 1000 * 60 * 60)
  )
}
