"use server"

import { connect, utils as nearUtils } from "near-api-js"

import type { Silo } from "@/types/types"

/**
 * Returns the available balance of NEAR for a given relayer account of a
 * specific user's silo.
 *
 * @param silo - Silo with an engine account
 * @returns The available NEAR balance formatted as a string with precision
 */
export const getRelayerBalance = async (silo: Silo): Promise<string> => {
  const near = await connect({
    networkId: "mainnet",
    nodeUrl: "https://rpc.mainnet.near.org",
  })

  const account = await near.account(silo.engine_account)
  const state = await account.state()
  const nearBalance = nearUtils.format.formatNearAmount(state.amount, 6)

  return nearBalance
}
