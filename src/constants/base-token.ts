import { BaseTokenSymbol } from "@/types/types"

export const BASE_TOKENS: Record<
  BaseTokenSymbol,
  {
    name: string
    nearAccountId: string
    decimals: number
  } | null
> = {
  AURORA: {
    name: "Aurora",
    nearAccountId:
      "aaaaaa20d9e0e2461697782ef11675f668207961.factory.bridge.near",
    decimals: 18,
  },
  ETH: {
    name: "Ethereum",
    nearAccountId: "aurora",
    decimals: 18,
  },
  WNEAR: {
    name: "Near",
    nearAccountId: "near",
    decimals: 18,
  },
  USDC: {
    name: "USD Coin",
    nearAccountId: "6k1r7pg8butk6qr7bb2vrcvf7vd46yw2ojgm9buvmw6u.p.aurora",
    decimals: 18,
  },
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

export const BASE_TOKEN_PLACEHOLDER_ADDRESS =
  "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
