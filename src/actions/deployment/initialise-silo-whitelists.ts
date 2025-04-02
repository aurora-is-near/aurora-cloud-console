"use server"

import { performSiloConfigTransaction } from "@/actions/deployment/perform-silo-config-transaction"
import { Silo, SiloConfigTransactionStatus } from "@/types/types"
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"

export const initialiseSiloWhitelists = async (
  silo: Silo,
  {
    skipIfFailed,
  }: {
    skipIfFailed?: boolean
  } = {},
): Promise<SiloConfigTransactionStatus> => {
  const promises = []

  if (!silo.is_make_txs_public) {
    promises.push(
      performSiloConfigTransaction(
        silo,
        "ENABLE_MAKE_TXS_WHITELIST",
        async () => {
          return contractChangerApiClient.toggleWhitelist({
            siloEngineAccountId: silo.engine_account,
            action: "disable",
            whitelistKind: "address",
          })
        },
        { skipIfFailed, nearAccountId: silo.engine_account },
      ),
    )
  }

  if (!silo.is_deploy_contracts_public) {
    promises.push(
      performSiloConfigTransaction(
        silo,
        "ENABLE_DEPLOY_CONTRACT_WHITELIST",
        async () => {
          return contractChangerApiClient.toggleWhitelist({
            siloEngineAccountId: silo.engine_account,
            action: "disable",
            whitelistKind: "evm-admin",
          })
        },
        { skipIfFailed, nearAccountId: silo.engine_account },
      ),
    )
  }

  const [statuses] = await Promise.all(promises)

  if (statuses.includes("PENDING")) {
    return "PENDING"
  }

  if (statuses.includes("FAILED")) {
    return "FAILED"
  }

  return "SUCCESSFUL"
}
