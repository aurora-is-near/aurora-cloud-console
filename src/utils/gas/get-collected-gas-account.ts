import { keccak256, toUtf8Bytes } from "ethers"
import type { Silo } from "@/types/types"

/**
 * Generates an Ethereum EOA address for the collected gas account
 * by taking the last 20 bytes of the keccak256 hash of the engine account
 * @param silo - The Silo object containing engine_account
 * @returns Ethereum address in hex format with 0x prefix
 */
export function getCollectedGasAccount(silo: Silo): string {
  const hash = keccak256(toUtf8Bytes(silo.engine_account))

  return `0x${hash.substring(26)}`
}
