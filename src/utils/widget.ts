import { WIDGET_NETWORKS } from "@/constants/bridge"
import { WidgetNetworkType } from "@/types/types"

export const isValidNetwork = (
  network: string,
): network is WidgetNetworkType => {
  return WIDGET_NETWORKS.includes(network as WidgetNetworkType)
}
