import { createApiEndpoint } from "@/utils/api"
import { updateSilo } from "@/actions/silos/update-silo"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"
import { createSiloConfigTransaction } from "@/actions/silo-config-transactions/create-silo-config-transaction"
import { getLastSiloConfigTransaction } from "@/actions/silo-config-transactions/get-last-silo-config-transaction"
import type { Silo } from "@/types/types"

import { abort } from "../../../../../utils/abort"

import {
  whitelistKindActionMap,
  whitelistKindToggleOperationMap,
  toggleSiloPermissionUpdateMap,
} from "./maps"

import { isTransactionExpired, checkPendingTransaction } from "./utils"

const getSiloOrAbort = async (
  teamId: number,
  siloId: number,
): Promise<Silo> => {
  const silo = await getTeamSilo(teamId, siloId)

  if (!silo) {
    abort(404)
  }

  return silo
}

export const PUT = createApiEndpoint(
  "toggleSiloPermissions",
  async (reg, ctx) => {
    const { action, isEnabled } = ctx.body
    const silo = await getSiloOrAbort(ctx.team.id, Number(ctx.params.id))

    // 1. Get last transaction that tried to toggle a whitelist
    let previousTransaction = await getLastSiloConfigTransaction(
      silo.id,
      whitelistKindToggleOperationMap[action],
    )

    // 2. If it has expired or was successful - consider current request as new
    if (
      !previousTransaction ||
      isTransactionExpired(previousTransaction) ||
      previousTransaction.status === "SUCCESSFUL"
    ) {
      const { tx_hash } = await contractChangerApiClient.toggleWhitelist({
        siloEngineAccountId: silo.engine_account,
        action: isEnabled ? "enable" : "disable",
        whitelistKind: whitelistKindActionMap[action],
      })

      // if no tx hash is returned - assume transaction was successful
      if (!tx_hash) {
        await updateSilo(
          silo.id,
          toggleSiloPermissionUpdateMap[action](isEnabled),
        )

        return {
          action,
          isEnabled,
          status: "SUCCESSFUL" as const,
        }
      }

      previousTransaction = await createSiloConfigTransaction({
        silo_id: silo.id,
        transaction_hash: tx_hash,
        operation: whitelistKindToggleOperationMap[action],
        status: "PENDING",
      })

      return {
        action,
        isEnabled: !isEnabled,
        status: "PENDING" as const,
      }
    }

    // 3. Check and update the transaction status
    if (
      previousTransaction.status === "FAILED" ||
      previousTransaction.status === "PENDING"
    ) {
      const txStatus = await checkPendingTransaction(previousTransaction, silo)

      if (txStatus === "FAILED") {
        abort(500, "On-chain transaction failed. Try again.")
      }

      if (txStatus === "PENDING") {
        return {
          action,
          isEnabled: !isEnabled,
          status: "PENDING" as const,
        }
      }
    }

    // 4. Transaction is successful
    const updatedSilo = await updateSilo(
      silo.id,
      toggleSiloPermissionUpdateMap[action](!isEnabled),
    )

    return {
      action,
      isEnabled,
      status: "SUCCESSFUL" as const,
    }
  },
  {
    cache: {
      maxAge: "1h",
      staleWhileRevalidate: "1y",
    },
  },
)

export const POST = createApiEndpoint(
  "addAddressToPermissionsWhitelist",
  async (reg, ctx) => {
    const { action, address } = ctx.body

    if (!action) {
      abort(
        400,
        "Missing action query parameter (MAKE_TRANSACTIONS or DEPLOY_CONTRACTS must be provided)",
      )
    }

    if (!address) {
      abort(
        400,
        "Missing address query parameter (the address to add must be provided)",
      )
    }

    const silo = await getSiloOrAbort(ctx.team.id, Number(ctx.params.id))

    const { tx_hash } = await contractChangerApiClient.addAddressToWhitelist({
      siloEngineAccountId: silo.engine_account,
      whitelistKind: whitelistKindActionMap[action],
      addr: address,
    })

    return {
      address,
      action,
    }
  },
  {
    cache: {
      maxAge: "1h",
      staleWhileRevalidate: "1y",
    },
  },
)

export const DELETE = createApiEndpoint(
  "removeAddressFromPermissionsWhitelist",
  async (reg, ctx) => {
    const { action, address } = ctx.body

    if (!action) {
      abort(
        400,
        "Missing action query parameter (MAKE_TRANSACTIONS or DEPLOY_CONTRACTS must be provided)",
      )
    }

    if (!address) {
      abort(
        400,
        "Missing address query parameter (the address to add must be provided)",
      )
    }

    const silo = await getSiloOrAbort(ctx.team.id, Number(ctx.params.id))

    const { tx_hash } =
      await contractChangerApiClient.removeAddressFromWhitelist({
        siloEngineAccountId: silo.engine_account,
        whitelistKind: whitelistKindActionMap[action],
        addr: address,
      })

    return {
      address,
      action,
    }
  },
  {
    cache: {
      maxAge: "1h",
      staleWhileRevalidate: "1y",
    },
  },
)
