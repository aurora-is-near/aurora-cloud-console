import { NetworkType } from "@/types/network-type"
import { Silo } from "@/types/types"
import { isDevNet } from "@/utils/is-dev-net"

export const getNetworkVariant = <T>(
  silo: Silo | null,
  { none, devnet, mainnet }: Record<NetworkType, T>,
): T => {
  if (!silo) {
    return none
  }

  if (isDevNet(silo)) {
    return devnet
  }

  return mainnet
}
