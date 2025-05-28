import { WalletDetailsSchema } from "@/types/api-schemas"
import { TransactionsQuery } from "@/types/types"

export const getWalletDetails = (
  row: TransactionsQuery,
): WalletDetailsSchema => ({
  walletAddress: `0x${row.wallet_address}`,
  numberOfTransactions: row.number_of_transactions,
  firstTransactionAt: row.first_transaction_at,
  lastTransactionAt: row.last_transaction_at,
})
