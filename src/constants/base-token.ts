import { BaseTokenSymbol } from "@/types/types"

export const BASE_TOKEN_DECIMALS = 18

export const BASE_TOKENS: Record<
  BaseTokenSymbol,
  {
    name: string
    nearAccountId: string
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
  USDC: null,
  USDT: null,
  BTC: null,
  CUSTOM: null,
}
