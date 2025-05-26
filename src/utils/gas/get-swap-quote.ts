"use server"

import {
  OneClickService,
  OpenAPI,
  QuoteRequest,
  TokenResponse,
  type QuoteResponse,
} from "@defuse-protocol/one-click-sdk-typescript"
import type { Silo } from "@/types/types"

import { ONE_CLICK_API_URL, WNEAR_ASSET_ID } from "./constants"

OpenAPI.BASE = ONE_CLICK_API_URL

/**
 * Gets a swap quote to transfer a portion of collected gas for a Silo to the
 * relayer account.
 *
 * @param silo - The Silo object containing engine_account
 * @param amount - The amount of gas to be swapped (usually is calculated with getChainTransactionsCost for the period)
 * @param token - Tradable token to swap from (get it with getTradableToken)
 * @returns The swap quote object
 */
export const getSwapQuote = async ({
  amount,
  recipient,
  refundTo,
  token,
}: {
  amount: string
  recipient: string
  refundTo: string
  token: TokenResponse
}): Promise<QuoteResponse["quote"]> => {
  const quoteRequest: QuoteRequest = {
    dry: false,
    slippageTolerance: 100, // 1%
    quoteWaitingTimeMs: 3000, // ms
    deadline: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 hour
    swapType: QuoteRequest.swapType.EXACT_INPUT,
    depositType: QuoteRequest.depositType.INTENTS,
    refundType: QuoteRequest.refundType.ORIGIN_CHAIN,
    recipientType: QuoteRequest.recipientType.DESTINATION_CHAIN,

    amount, // received from get-chain-transactions-cost
    refundTo, // collected gas account
    recipient, // silo's engine account
    originAsset: token.assetId, // silo's base token
    destinationAsset: WNEAR_ASSET_ID,
  }

  let quoteResponse: QuoteResponse

  try {
    quoteResponse = await OneClickService.getQuote(quoteRequest)
  } catch (e: unknown) {
    throw new Error("Failed to fetch swap quote")
  }

  return quoteResponse.quote
}
