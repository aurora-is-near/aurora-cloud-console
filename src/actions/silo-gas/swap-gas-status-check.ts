"use server"

import { subDays, addHours } from "date-fns"
import { GetExecutionStatusResponse } from "@defuse-protocol/one-click-sdk-typescript"

import { logger } from "@/logger"
import { checkPendingTransaction } from "@/utils/check-pending-transaction"
import { getSiloConfigTransactions } from "@/actions/silo-config-transactions/get-silo-config-transactions"
import { getSwapStatus } from "@/utils/gas/get-swap-status"
import type { Silo, SiloGasSwap } from "@/types/types"

import { GAS_SWAP_TRANSACTION_TIME_BOUNDARY } from "./constants"
import { getGasSwapTransactions, updateGasSwapTransaction } from "./db"

export const swapGasStatusCheck = async ({
  silo,
  variant,
}: {
  silo: Silo
  variant: SiloGasSwap["variant"]
}) => {
  const gasSwaps = await getGasSwapTransactions({
    variant,
    silo_id: silo.id,
    status: ["INITIATED", "PENDING"],
    startDate: GAS_SWAP_TRANSACTION_TIME_BOUNDARY,
    endDate: new Date().toISOString(),
  })

  const failedStartDate = subDays(new Date(), 1)
  const failedGasSwapsFromPreviousDay = await getGasSwapTransactions({
    variant,
    silo_id: silo.id,
    status: ["FAILED"],
    startDate: failedStartDate.toISOString(),
    endDate: addHours(failedStartDate, 1).toISOString(),
  })

  if (gasSwaps.length > 1) {
    throw new Error(
      "Multiple transfers for a single silo are pending to the relayer account",
    )
  }

  // no pending gas swaps, nothing to check
  if (gasSwaps.length === 0) {
    return
  }

  const gasSwap = gasSwaps[0]
  const previousTransactions = await getSiloConfigTransactions(
    silo.id,
    ["INTENTS_SWAP"],
    gasSwap.deposit_address,
  )

  // can't be multiple transactions with the same deposit address (impossible)
  if (previousTransactions.length > 0) {
    throw new Error(
      "Multiple deposit transactions found with the same one-time address",
    )
  }

  // no deposit transaction created but swap record exists (impossible)
  if (previousTransactions.length === 0) {
    await updateGasSwapTransaction(gasSwap.id, { status: "FAILED" })
    throw new Error("No deposit transaction found for the gas swap")
  }

  const depositTransaction = previousTransactions[0]
  const currentTxStatus = await checkPendingTransaction(
    depositTransaction,
    silo,
  )

  let swapStatus = GetExecutionStatusResponse.status.PENDING_DEPOSIT

  switch (currentTxStatus) {
    case "SUCCESSFUL": {
      // check 1Click swap status after deposit to one-time address is made
      swapStatus = await getSwapStatus({
        depositAddress: gasSwap.deposit_address,
      })
      break
    }

    case "FAILED":
      await updateGasSwapTransaction(gasSwap.id, { status: "FAILED" })

      return
    // still pending - do nothing
    case "PENDING":
    default:
      return
  }

  switch (swapStatus) {
    case GetExecutionStatusResponse.status.PENDING_DEPOSIT:
      // initiated - do nothing
      return
    case GetExecutionStatusResponse.status.PROCESSING:
    case GetExecutionStatusResponse.status.KNOWN_DEPOSIT_TX:
      // still pending
      await updateGasSwapTransaction(gasSwap.id, { status: "PENDING" })

      return
    case GetExecutionStatusResponse.status.FAILED:
    case GetExecutionStatusResponse.status.REFUNDED:
      await updateGasSwapTransaction(gasSwap.id, { status: "FAILED" })

      return
    case GetExecutionStatusResponse.status.SUCCESS:
      await updateGasSwapTransaction(gasSwap.id, { status: "SUCCEED" })

      return
    case GetExecutionStatusResponse.status.INCOMPLETE_DEPOSIT:
      // some special error, is it possible in our case?
      // change status to FAILED and log it to Sentry
      await updateGasSwapTransaction(gasSwap.id, { status: "FAILED" })
      logger.error(`Swap gas ${variant} failed with: INCOMPLETE_DEPOSIT`)

      return
    default:
      logger.error(
        `Swap gas ${variant} finished with unknown status: ${swapStatus}`,
      )

      return
  }
}
