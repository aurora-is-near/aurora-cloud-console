import { ComponentType } from "react"

export type NetworkType = "devnet" | "mainnet"
export type ChainPermission = "public" | "public_permissioned" | "private"
export type BaseToken = "AURORA" | "BTC" | "ETH" | "USDC" | "USDT" | "CUSTOM"
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
  symbol: BaseToken
  name: string
  icon: ComponentType<React.SVGProps<SVGSVGElement>>
}
