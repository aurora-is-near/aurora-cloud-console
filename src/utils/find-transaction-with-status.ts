import {
  SiloConfigTransaction,
  SiloConfigTransactionStatus,
} from "@/types/types"

export const findTransactionWithStatus = (
  transactions: SiloConfigTransaction[],
  status: SiloConfigTransactionStatus,
): SiloConfigTransaction | undefined => {
  return transactions.find((transaction) => transaction.status === status)
}
