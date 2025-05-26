"use server"

import { keccak256, toUtf8Bytes } from "ethers"
import type { Silo } from "@/types/types"

/**
 * Generates an Ethereum EOA address for the collected gas account
 * by taking the last 20 bytes of the keccak256 hash of the engine account
 * @param silo - The Silo object containing engine_account
 * @returns Ethereum address in hex format with 0x prefix
 */
export function getCollectedGasAccount(silo: Silo): string {
  if (!silo.engine_account) {
    throw new Error("Silo engine_account is not defined")
  }

  const hash = keccak256(toUtf8Bytes(silo.engine_account))
  const address = "0x" + hash.substring(26)
  return address
}
