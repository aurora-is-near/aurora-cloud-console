import { DEVNET_CHAIN_ID } from "@/constants/devnet"
import { Silo } from "@/types/types"

export const isDevNet = (silo: Silo) => silo.chain_id === DEVNET_CHAIN_ID
