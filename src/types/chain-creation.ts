import { ComponentType } from "react"
import type { KnownBaseTokenSymbol } from "@/types/types"

export type NetworkType = "devnet" | "mainnet"
export type ChainPermission = "public" | "public_permissioned" | "private"
export type BaseToken = KnownBaseTokenSymbol | "CUSTOM"
export type GasMechanics = "usage" | "free" | "custom"
export type Integration =
  | "onramp"
  | "oracle"
  | "bridge_widget"
  | "cex_withdrawals_widget"
  | "block_explorer"
  | "intense_support"
  | "dex"

export interface TokenOption {
  id: KnownBaseTokenSymbol | "CUSTOM"
  name: string
  icon: ComponentType<React.SVGProps<SVGSVGElement>>
}
