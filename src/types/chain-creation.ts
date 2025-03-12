import { ComponentType } from "react"
import { BaseTokenSymbol } from "@/types/types"

export type NetworkType = "devnet" | "mainnet"
export type ChainPermission = "public" | "public_permissioned" | "private"
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
  symbol: BaseTokenSymbol
  name: string
  icon: ComponentType<React.SVGProps<SVGSVGElement>>
}
