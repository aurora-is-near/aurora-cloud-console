"use server"

import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"
import type { Silo } from "@/types/types"

export const getCollectedGasBalance = async ({ silo }: { silo: Silo }) => {
  if (!silo.engine_account) {
    throw new Error("Silo engine account is not defined")
  }

  try {
    return await contractChangerApiClient.getCollectedGasBalance({
      siloEngineAccountId: silo.engine_account,
    })
  } catch (e: unknown) {
    throw new Error("Failed to get collected gas balance", { cause: e })
  }
}
