import { DEVNET_CHAIN_ID } from "@/constants/devnet"
import { NetworkType } from "@/types/network-type"
import { Silo } from "@/types/types"

export const getNetworkType = (silos: Silo[]): NetworkType => {
  const [firstSilo] = silos

  if (!firstSilo) {
    return "none"
  }

  if (firstSilo.chain_id === DEVNET_CHAIN_ID) {
    return "devnet"
  }

  return "mainnet"
}
