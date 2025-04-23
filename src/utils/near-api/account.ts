import { Account } from "near-api-js"

import { getNearApiConnection } from "@/utils/near-api/connect"

export const getNearAccount = async (siloEngineAccountId: string) => {
  const nearConnection = await getNearApiConnection()

  return new Account(nearConnection.connection, siloEngineAccountId)
}
