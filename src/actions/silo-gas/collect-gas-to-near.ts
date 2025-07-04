"use server"

import { getNearAccount } from "@/utils/near-api/account"
import { performSiloConfigTransaction } from "@/actions/deployment/perform-silo-config-transaction"
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"
import type { Silo } from "@/types/types"

export const collectGasToNear = async ({
  silo,
  amount,
}: {
  silo: Silo
  amount: string
}) => {
  if (!silo.gas_collection_address) {
    return "FAILED"
  }

  try {
    const nearAccount = await getNearAccount(silo.gas_collection_address)

    await nearAccount.state()
  } catch (e: unknown) {
    return "FAILED"
  }

  return performSiloConfigTransaction(
    silo,
    "COLLECT_GAS",
    async () =>
      contractChangerApiClient.collectGasToNear({
        siloEngineAccountId: silo.engine_account,
        accountId: silo.gas_collection_address as string,
        network: "near",
        amount,
      }),
    { skipIfFailed: false, nearAccountId: silo.gas_collection_address },
  )
}
