"use server"

import { connect, utils as nearUtils } from "near-api-js"
import type { Silo } from "@/types/types"
import { getSiloRelayer } from "@/actions/silo-relayers/get-silo-relayer"

type Balances = {
  near: string
}

/**
 * Returns the available balance of NEAR for a given relayer account of a
 * specific user's silo.
 *
 * @param accountId - The NEAR account ID of the relayer (silo.engine_account)
 * @returns The available NEAR balance formatted as a string with precision
 */
export const getRelayerBalance = async (silo: Silo): Promise<Balances> => {
  const near = await connect({
    networkId: "mainnet",
    nodeUrl: "https://rpc.mainnet.near.org",
  })

  const siloRelayer = await getSiloRelayer(silo)
  const relayerAccountId = siloRelayer?.account_id ?? silo.engine_account
  const account = await near.account(relayerAccountId)
  const state = await account.state()

  // NEAR balance
  const yoctoAmount = state.amount
  const nearBalance = nearUtils.format.formatNearAmount(yoctoAmount, 6)

  return {
    near: nearBalance,
  }
}
