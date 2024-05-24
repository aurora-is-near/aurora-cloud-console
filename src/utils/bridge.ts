import { BRIDGE_NETWORKS } from "@/constants/bridge"
import { BridgeNetworkType } from "@/types/types"

export const isValidNetwork = (
  network: string,
): network is BridgeNetworkType => {
  return BRIDGE_NETWORKS.includes(network as BridgeNetworkType)
}
