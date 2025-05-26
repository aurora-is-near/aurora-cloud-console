"use server"

import {
  OneClickService,
  OpenAPI,
  type TokenResponse,
} from "@defuse-protocol/one-click-sdk-typescript"

import { ONE_CLICK_API_URL } from "./constants"

OpenAPI.BASE = ONE_CLICK_API_URL

export const getTradableToken = async (
  symbol: string,
): Promise<TokenResponse | undefined> => {
  const tokens = await OneClickService.getTokens()

  return tokens.find((token) => token.symbol === symbol)
}
