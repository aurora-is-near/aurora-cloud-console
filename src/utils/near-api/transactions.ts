import { FinalExecutionStatusBasic } from "near-api-js/lib/providers"
import { SiloConfigTransactionStatus } from "@/types/types"
import { getNearApiConnection } from "@/utils/near-api/connect"

export const getNearTransactionStatus = async (
  txHash: string,
  accountId: string,
): Promise<SiloConfigTransactionStatus> => {
  const nearConnection = await getNearApiConnection()

  const { status } = await nearConnection.connection.provider.txStatus(
    txHash,
    accountId,
    "FINAL",
  )

  // https://github.com/near/near-api-js/blob/8ad6e73eff2ecf00f08301c9426cc0df372c6a26/packages/types/src/provider/response.ts#L21-L25
  if (typeof status === "string") {
    return status === FinalExecutionStatusBasic.Failure ? "FAILED" : "PENDING"
  }

  // https://docs.near.org/integrations/fungible-tokens#successful-transfer-and-call
  if ("SuccessValue" in status) {
    return "SUCCESSFUL"
  }

  // https://docs.near.org/integrations/fungible-tokens#failed-transfer-and-call
  if ("Failure" in status) {
    return "FAILED"
  }

  return "PENDING"
}
