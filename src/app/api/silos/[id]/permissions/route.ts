import { createApiEndpoint } from "@/utils/api"
import { updateSilo } from "@/actions/silos/update-silo"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"
import { getSiloWhitelistAddress } from "@/actions/silo-whitelist/get-silo-whitelist-address"
import { insertSiloWhitelistAddress } from "@/actions/silo-whitelist/insert-silo-whitelist-address"
import { updateSiloWhitelistAddress } from "@/actions/silo-whitelist/update-silo-whitelist-address"
import { createSiloConfigTransaction } from "@/actions/silo-config-transactions/create-silo-config-transaction"
import { getLastSiloConfigTransaction } from "@/actions/silo-config-transactions/get-last-silo-config-transaction"
import { getSiloConfigTransactionById } from "@/actions/silo-config-transactions/get-silo-config-transaction-by-id"
import type { ApiRequestContext } from "@/types/api"
import type { Silo, SiloConfigTransaction } from "@/types/types"

import { abort } from "../../../../../utils/abort"

import {
  toggleSiloPermissionUpdateMap,
  whitelistKindToggleOperationMap,
  whitelistKindPopulateOperationMap,
  whitelistKindActionMap,
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
    if (!ctx.body[typedParam]) {
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

export const POST = createApiEndpoint(
  "addAddressToPermissionsWhitelist",
  async (_, ctx) => {
    const silo = await getSiloOrAbort(ctx.team.id, Number(ctx.params.id))
    const { action, address } = getBodyParamsOrAbort(ctx, ["action", "address"])

    let transaction: SiloConfigTransaction | undefined

    // 1. Try to retrieve address from the list to get related tx hash
    const whitelistedAddress = await getSiloWhitelistAddress(
      silo.id,
      action,
      address,
    )

    // 2. If not in the list - add
    if (!whitelistedAddress) {
      const { tx_hash } = await contractChangerApiClient.addAddressToWhitelist({
        siloEngineAccountId: silo.engine_account,
        whitelistKind: whitelistKindActionMap[action],
        addr: address,
      })

      // if no tx hash is returned - assume transaction was successful
      if (!tx_hash) {
        await insertSiloWhitelistAddress({
          address,
          list: action,
          silo_id: silo.id,
          tx_id: null,
        })

        return {
          action,
          address,
          status: "SUCCESSFUL" as const,
        }
      }

      transaction = await createSiloConfigTransaction({
        silo_id: silo.id,
        transaction_hash: tx_hash,
        operation: whitelistKindPopulateOperationMap[action],
        status: "PENDING",
      })

      await insertSiloWhitelistAddress({
        address,
        list: action,
        silo_id: silo.id,
        tx_id: transaction.id,
      })

      return {
        action,
        address,
        status: "PENDING" as const,
      }
    }

    // 3. If address is already whitelisted - do nothing
    if (whitelistedAddress.is_applied) {
      return {
        action,
        address,
        status: "SUCCESSFUL",
      }
    }

    // 4. If whitelisted address has no tx_id means it was whitelisted above
    if (!whitelistedAddress.tx_id) {
      return {
        action,
        address,
        status: "SUCCESSFUL" as const,
      }
    }

    // 5. Check status of a transaction (is is_applied is false)
    const tx = await getSiloConfigTransactionById(
      silo.id,
      whitelistKindPopulateOperationMap[action],
      whitelistedAddress.tx_id,
    )

    // 6. If not txs (should not happen)
    if (!transaction && !tx) {
      abort(404, "Transaction not found")
    } else {
      transaction = transaction ?? tx!
    }

    // 7. Handle actual tx status
    switch (transaction.status) {
      case "SUCCESSFUL":
        await updateSiloWhitelistAddress(whitelistedAddress.address, {
          is_applied: true,
        })
        return {
          action,
          address,
          status: "SUCCESSFUL" as const,
        }
      case "PENDING":
        return {
          action,
          address,
          status: "PENDING" as const,
        }
      case "FAILED":
      default:
        abort(500, "Unexpected transaction status")
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
  async (_, ctx) => {
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

    // const { tx_hash } =
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
