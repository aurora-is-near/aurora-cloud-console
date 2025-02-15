import { SiloConfigTransactionStatus } from "@/types/types"
import { getNearApiConnection } from "@/utils/near-api/connect"

export const getNearTransactionStatus = async (
  txHash: string,
  accountId: string,
): Promise<SiloConfigTransactionStatus> => {
  const nearConnection = await getNearApiConnection()

  const result = await nearConnection.connection.provider.txStatus(
    txHash,
    accountId,
    "FINAL",
  )

  // https://docs.near.org/integrations/fungible-tokens#successful-transfer-and-call
  if ("SuccessValue" in result) {
    return "SUCCESSFUL"
  }

  // https://docs.near.org/integrations/fungible-tokens#failed-transfer-and-call
  if ("Failure" in result) {
    return "FAILED"
  }

  return "PENDING"
}
