import { createApiEndpoint } from "@/utils/api"
import { updateSilo } from "@/actions/silos/update-silo"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"
import { createSiloConfigTransaction } from "@/actions/silo-config-transactions/create-silo-config-transaction"
import { getLastSiloConfigTransaction } from "@/actions/silo-config-transactions/get-last-silo-config-transaction"
import type { ApiRequestContext } from "@/types/api"
import type { Silo } from "@/types/types"

import { abort } from "../../../../../utils/abort"

import {
  toggleSiloPermissionUpdateMap,
  whitelistKindActionMap,
  whitelistKindToggleOperationMap,
} from "./maps"

import { checkPendingTransaction, isTransactionExpired } from "./utils"

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

const getBodyParamsOrAbort = <P extends Record<string, unknown>>(
  ctx: ApiRequestContext<P>,
  params: Array<keyof P>,
) => {
  params.forEach((param) => {
    const typedParam = param as string

    if (ctx.body[typedParam] === undefined) {
      abort(
        400,
        `Missing ${typedParam} value in request (${typedParam} must be provided)`,
      )
    }
  })

  return ctx.body
}

export const PUT = createApiEndpoint(
  "toggleSiloPermissions",
  async (_, ctx) => {
    const silo = await getSiloOrAbort(ctx.team.id, Number(ctx.params.id))
    const { action, isEnabled } = getBodyParamsOrAbort(ctx, [
      "action",
      "isEnabled",
    ])

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
    await updateSilo(silo.id, toggleSiloPermissionUpdateMap[action](!isEnabled))

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
