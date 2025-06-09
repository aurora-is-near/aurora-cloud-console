"use server"

import { addMinutes } from "date-fns"
import { formatUnits, parseUnits } from "ethers"

import {
  getCollectedGasAccount,
  getCollectedGasBalance,
  getSwapQuote,
  getTradableToken,
} from "@/utils/gas"
import { queryGasCollected } from "@/utils/blockscout-db/query-gas-collected"
import { getSiloBlockscoutDatabase } from "@/actions/silo-blockscout-database/get-silo-blockscout-database"
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"
import { performSiloConfigTransaction } from "@/actions/deployment/perform-silo-config-transaction"
import type { Silo } from "@/types/types"

import { GAS_SWAP_TRANSACTION_TIME_BOUNDARY } from "./constants"
import { createGasSwapTransaction, getGasSwapTransactions } from "./db"

const NEAR_BURN_ACCOUNT = "system.near"

export const burnGas = async ({ silo }: { silo: Silo }) => {
  // 1. Check if silo's base token is tradable
  const token = await getTradableToken(silo.base_token_symbol)

  if (!token) {
    throw new Error("Silo base token is not tradable. Unable to burn gas.")
  }

  // 2. Make sure that gas transfer to relayer has been successful for the day
  const gasSwapsToRelayer = await getGasSwapTransactions({
    silo_id: silo.id,
    variant: "TO_RELAYER",
    status: ["SUCCEED"],
    startDate: GAS_SWAP_TRANSACTION_TIME_BOUNDARY,
    endDate: new Date().toISOString(),
  })

  if (gasSwapsToRelayer.length > 0) {
    throw new Error(
      "Multiple transfers to relayer found. Cannot calculate gas burn amount.",
    )
  }

  // no gas swapped to relayer yet - wait
  if (gasSwapsToRelayer.length === 0) {
    return
  }

  const dailyCostsAmount = parseUnits(
    gasSwapsToRelayer[0].amount,
    silo.base_token_decimals,
  )

  // 3. Get collected gas for the last 24 hours
  const siloBlockscoutDB = await getSiloBlockscoutDatabase(silo.id)

  if (!siloBlockscoutDB) {
    throw new Error(`Cannot get blockscout database for silo ${silo.id}`)
  }

  const dailyCollectedGasResult = await queryGasCollected(siloBlockscoutDB, {
    startDate: addMinutes(new Date(), 15).toISOString(),
    endDate: new Date().toISOString(),
  })

  const dailyCollectedGas = parseUnits(
    dailyCollectedGasResult[0].rows[0]?.count ?? "0",
    silo.base_token_decimals,
  )

  if (dailyCollectedGas < 0) {
    throw new Error(`No gas collected in the last 24 hours (silo: ${silo.id})`)
  }

  // 4. Just in case check real balance on the account
  const collectedGasResponse = await getCollectedGasBalance({ silo })
  const collectedGasBalance = parseUnits(
    collectedGasResponse.amount,
    silo.base_token_decimals,
  )

  if (collectedGasBalance < dailyCollectedGas) {
    throw new Error("Real gas balance is less than daily collected gas amount")
  }

  // 5. Initiate a swap quote
  const burnGasPortion = silo.gas_burn_percent ?? 0

  if (burnGasPortion < 0 || burnGasPortion > 100) {
    throw new Error("Invalid gas burn percentage configured for the silo")
  }

  const gasToBurn = formatUnits(
    BigInt(burnGasPortion / 100) * (dailyCollectedGas - dailyCostsAmount),
    silo.base_token_decimals,
  )

  const collectedGasAccount = getCollectedGasAccount(silo)
  const swapQuote = await getSwapQuote({
    token,
    refundTo: collectedGasAccount,
    recipient: NEAR_BURN_ACCOUNT,
    amount: gasToBurn,
    deadline: addMinutes(new Date(), 15).toISOString(),
  })

  if (!swapQuote?.depositAddress) {
    throw new Error("Swap initiation failed")
  }

  // 6. Do the transfer to a one-time deposit address
  const oneTimeDepositAddress = swapQuote.depositAddress

  await performSiloConfigTransaction(
    silo,
    "INTENTS_SWAP",
    async () =>
      contractChangerApiClient.collectGasToNear({
        amount: gasToBurn,
        siloEngineAccountId: collectedGasAccount,
        accountId: oneTimeDepositAddress,
        network: "near",
      }),
    { skipIfFailed: false, nearAccountId: oneTimeDepositAddress },
  )

  // 7. Save initiated swap to DB
  const swapTransaction = await createGasSwapTransaction({
    silo_id: silo.id,
    amount: gasToBurn,
    deposit_address: oneTimeDepositAddress,
    status: "INITIATED",
    variant: "BURN",
  })

  return swapTransaction
}
