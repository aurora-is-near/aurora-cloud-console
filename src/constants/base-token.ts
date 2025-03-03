import { BaseTokenSymbol } from "@/types/types"

export const BASE_TOKENS: Record<
  BaseTokenSymbol,
  {
    name: string
    nearAccountId: string
    decimals?: number
  } | null
> = {
  AURORA: {
    name: "Aurora",
    nearAccountId:
      "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
  },
  ETH: {
    name: "Ethereum",
    nearAccountId: "aurora",
  },
  WNEAR: {
    name: "Near",
    nearAccountId: "near",
  },
  USDC: null,
  USDT: null,
  BTC: null,
  CUSTOM: null,
}

export const AUTOMATED_BASE_TOKENS: BaseTokenSymbol[] = Object.keys(
  BASE_TOKENS,
).filter(
  (baseToken): baseToken is BaseTokenSymbol =>
    !!BASE_TOKENS[baseToken as BaseTokenSymbol],
)
