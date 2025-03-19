import { createApiEndpoint } from "@/utils/api"
import { updateSilo } from "@/actions/silos/update-silo"
import { getTeamSilo } from "@/actions/team-silos/get-team-silo"
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"
import { getSiloWhitelistAddress } from "@/actions/silo-whitelist/get-silo-whitelist-address"
import { createSiloWhitelistAddress } from "@/actions/silo-whitelist/create-silo-whitelist-address"
import { updateSiloWhitelistAddress } from "@/actions/silo-whitelist/update-silo-whitelist-address"
import { deleteSiloWhitelistAddress } from "@/actions/silo-whitelist/delete-silo-whitelist-address"
import { createSiloConfigTransaction } from "@/actions/silo-config-transactions/create-silo-config-transaction"
import { getLastSiloConfigTransaction } from "@/actions/silo-config-transactions/get-last-silo-config-transaction"
import { getSiloConfigTransactionById } from "@/actions/silo-config-transactions/get-silo-config-transaction-by-id"
import { checkPendingTransaction } from "@/utils/check-pending-silo-config-transaction"
import type { ApiRequestContext } from "@/types/api"
import type { Silo, SiloConfigTransaction } from "@/types/types"

import { abort } from "../../../../../utils/abort"

import {
  toggleSiloPermissionUpdateMap,
  whitelistKindActionMap,
  whitelistKindPopulateOperationMap,
  whitelistKindPurgeOperationMap,
  whitelistKindToggleOperationMap,
} from "./maps"

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
      whitelistKindToggleOperationMap[action](isEnabled),
    )

    // 2. If it has expired or was successful - consider current request as new
    if (
      !previousTransaction ||
      previousTransaction.status === "FAILED" ||
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
        operation: whitelistKindToggleOperationMap[action](isEnabled),
        status: "PENDING",
      })

      return {
        action,
        isEnabled: !isEnabled,
        status: "PENDING" as const,
      }
    }

    // 3. Check and update the transaction status
    if (previousTransaction.status === "PENDING") {
      const txStatus = await checkPendingTransaction(previousTransaction, silo)

      if (txStatus === "FAILED") {
        abort(503, "On-chain transaction failed. Try again.")
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
)

export const POST = createApiEndpoint(
  "addAddressToPermissionsWhitelist",
  async (_, ctx) => {
    const silo = await getSiloOrAbort(ctx.team.id, Number(ctx.params.id))
    const { action, address } = getBodyParamsOrAbort(ctx, ["action", "address"])

    let transaction: SiloConfigTransaction | null | undefined

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
        await createSiloWhitelistAddress({
          address,
          list: action,
          silo_id: silo.id,
          add_tx_id: null,
          remove_tx_id: null,
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

      await createSiloWhitelistAddress({
        address,
        list: action,
        silo_id: silo.id,
        add_tx_id: transaction.id,
        remove_tx_id: null,
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
        status: "SUCCESSFUL" as const,
      }
    }

    // 4. If whitelisted address has no tx_id means it was whitelisted above
    if (!whitelistedAddress.add_tx_id) {
      return {
        action,
        address,
        status: "SUCCESSFUL" as const,
      }
    }

    // 5. Check status of a transaction
    if (!transaction) {
      transaction = await getSiloConfigTransactionById(
        silo.id,
        whitelistKindPopulateOperationMap[action],
        whitelistedAddress.add_tx_id,
      )
    }

    // 6. If not txs (should not happen)
    if (!transaction) {
      abort(404, "Transaction not found")
    }

    // 7. Handle actual tx status
    switch (transaction.status) {
      case "PENDING": {
        const txStatus = await checkPendingTransaction(transaction, silo)

        if (txStatus === "FAILED") {
          abort(503, "On-chain transaction failed. Try again.")
        }

        if (txStatus === "PENDING") {
          return {
            action,
            address,
            status: "PENDING" as const,
          }
        }

        return {
          action,
          address,
          status: "PENDING" as const,
        }
      }

      case "SUCCESSFUL":
        await updateSiloWhitelistAddress(whitelistedAddress.address, {
          is_applied: true,
          list: action,
        })

        return {
          action,
          address,
          status: "SUCCESSFUL" as const,
        }

      case "FAILED":
      default:
        abort(503, "Unexpected transaction status")
    }
  },
)

export const DELETE = createApiEndpoint(
  "removeAddressFromPermissionsWhitelist",
  async (_, ctx) => {
    const silo = await getSiloOrAbort(ctx.team.id, Number(ctx.params.id))
    const { action, address } = getBodyParamsOrAbort(ctx, ["action", "address"])

    let transaction: SiloConfigTransaction | undefined | null

    // 1. Try to retrieve address from the list to get related tx hash
    const whitelistedAddress = await getSiloWhitelistAddress(
      silo.id,
      action,
      address,
    )

    // 2. Find related tx and check it's status
    const existingTxId = whitelistedAddress?.remove_tx_id

    if (existingTxId) {
      transaction = await getSiloConfigTransactionById(
        silo.id,
        whitelistKindPurgeOperationMap[action],
        existingTxId,
      )
    }

    // 3. If tx is not found or failed, create a new one
    if (!transaction || transaction.status === "FAILED") {
      const { tx_hash } =
        await contractChangerApiClient.removeAddressFromWhitelist({
          siloEngineAccountId: silo.engine_account,
          whitelistKind: whitelistKindActionMap[action],
          addr: address,
        })

      // if no tx hash is returned - assume transaction was successful
      if (!tx_hash) {
        await deleteSiloWhitelistAddress({
          address,
          list: action,
          silo_id: silo.id,
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
        operation: whitelistKindPurgeOperationMap[action],
        status: "PENDING",
      })

      await updateSiloWhitelistAddress(address, {
        list: action,
        remove_tx_id: transaction.id,
      })
    }

    // 4. Poll for the actual on chain tx status
    if (transaction.status === "PENDING") {
      const txStatus = await checkPendingTransaction(transaction, silo)

      if (txStatus === "FAILED") {
        abort(503, "On-chain transaction failed. Try again.")
      }

      if (txStatus === "PENDING") {
        return {
          action,
          address,
          status: "PENDING" as const,
        }
      }
    }

    // 5. On-chain tx was successful
    await deleteSiloWhitelistAddress({
      address,
      list: action,
      silo_id: silo.id,
    })

    return {
      action,
      address,
      status: "SUCCESSFUL" as const,
    }
  },
)
