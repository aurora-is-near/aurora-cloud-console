"use server"

import { parseUnits } from "ethers"

import {
  getChainTransactionsCost,
  getCollectedGasAccount,
  getCollectedGasBalance,
  getSwapQuote,
  getTradableToken,
} from "@/utils/gas"
import { contractChangerApiClient } from "@/utils/contract-changer-api/contract-changer-api-client"
import { performSiloConfigTransaction } from "@/actions/deployment/perform-silo-config-transaction"
import type { Silo } from "@/types/types"

import { createGasSwapTransaction } from "./db"

export const swapGasToRelayer = async ({ silo }: { silo: Silo }) => {
  // 1. Check if silo's base token is tradable
  const token = await getTradableToken(silo.base_token_symbol)

  if (!token) {
    throw new Error("Silo base token is not tradable. Unable to swap gas.")
  }

  // 2. Get how much NEAR we spent on silo's transactions in the last 24 hours
  const lastDayTransactionsCumulativeCost = await getChainTransactionsCost(
    silo,
    {
      startDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      endDate: new Date().toISOString(),
    },
  )

  const lastDayTransactionsCumulativeCostInt = parseUnits(
    lastDayTransactionsCumulativeCost,
    24,
  )

  // 3. Check collected gas balance of a silo
  const collectedGasResponse = await getCollectedGasBalance({ silo })
  const collectedGasBalance = parseUnits(
    collectedGasResponse.amount,
    silo.base_token_decimals,
  )

  if (lastDayTransactionsCumulativeCostInt > collectedGasBalance) {
    throw new Error("Insufficient collected gas balance to cover chain costs")
  }

  // 4. Initiate a swap quote
  const collectedGasAccount = getCollectedGasAccount(silo)
  const swapQuote = await getSwapQuote({
    token,
    refundTo: collectedGasAccount,
    // TODO: update to use getSiloRelayer after https://github.com/aurora-is-near/aurora-cloud-console/pull/583 is merged
    recipient: silo.engine_account,
    amount: lastDayTransactionsCumulativeCost,
  })

  if (!swapQuote?.depositAddress) {
    throw new Error("Swap initiation failed")
  }

  // 5. Do the transfer to a one-time deposit address
  const oneTimeDepositAddress = swapQuote.depositAddress

  await performSiloConfigTransaction(
    silo,
    "INTENTS_SWAP",
    async () =>
      contractChangerApiClient.collectGasToNear({
        amount: lastDayTransactionsCumulativeCost,
        siloEngineAccountId: collectedGasAccount,
        accountId: oneTimeDepositAddress,
        network: "near",
      }),
    { skipIfFailed: false, nearAccountId: oneTimeDepositAddress },
  )

  // 7. Save initiated swap to DB
  const swapTransaction = await createGasSwapTransaction({
    silo_id: silo.id,
    amount: lastDayTransactionsCumulativeCost,
    deposit_address: oneTimeDepositAddress,
    variant: "TO_RELAYER",
    status: "INITIATED",
  })

  return swapTransaction
}
