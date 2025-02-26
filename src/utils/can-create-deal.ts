import {
  MAX_DEALS_PER_DEVNET_SILO,
  MAX_DEALS_PER_SILO,
} from "@/constants/deals"
import { Deal, Silo } from "@/types/types"
import { isDevNet } from "./is-dev-net"

export const canCreateDeal = (silo: Silo, deals: Deal[]) => {
  if (isDevNet(silo)) {
    return deals.length < MAX_DEALS_PER_DEVNET_SILO
  }

  return deals.length < MAX_DEALS_PER_SILO
}
