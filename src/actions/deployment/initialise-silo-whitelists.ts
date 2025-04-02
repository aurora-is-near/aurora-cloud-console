"use server"

import { performSiloConfigTransaction } from "@/actions/deployment/perform-silo-config-transaction"
import { Silo, SiloConfigTransactionStatus } from "@/types/types"
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"

export const initialiseSiloWhitelists = async (
  silo: Silo,
  {
    skipIfFailed,
    enableOnly,
  }: {
    skipIfFailed?: boolean
    enableOnly?: boolean
  } = {},
): Promise<SiloConfigTransactionStatus> => {
  const promises = []

  if (!enableOnly || silo.is_make_txs_public) {
    promises.push(
      performSiloConfigTransaction(
        silo,
        "ENABLE_MAKE_TXS_WHITELIST",
        async () => {
          return contractChangerApiClient.toggleWhitelist({
            siloEngineAccountId: silo.engine_account,
            action: silo.is_make_txs_public ? "enable" : "disable",
            whitelistKind: "address",
          })
        },
        { skipIfFailed, nearAccountId: silo.engine_account },
      ),
    )
  }

  if (!enableOnly || silo.is_deploy_contracts_public) {
    promises.push(
      performSiloConfigTransaction(
        silo,
        "ENABLE_DEPLOY_CONTRACT_WHITELIST",
        async () => {
          return contractChangerApiClient.toggleWhitelist({
            siloEngineAccountId: silo.engine_account,
            action: silo.is_deploy_contracts_public ? "enable" : "disable",
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
