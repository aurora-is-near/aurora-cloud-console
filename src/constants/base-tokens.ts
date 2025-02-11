import { BaseTokenSymbol } from "@/types/types"

export type BaseTokenConfig = {
  name: string
  nearAccountId: string
}

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
  USDC: {
    name: "USD Coin",
    nearAccountId:
      "17208628f84f5d6ad33f0da3bbbeb27ffcb398eac501a31bd6ad2011e36133a1",
  },
  USDT: {
    name: "Tether",
    nearAccountId: "usdt.tether-token.near",
  },
  CUSTOM: null,
  BTC: null,
}
