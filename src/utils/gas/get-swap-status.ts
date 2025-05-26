"use server"

import {
  type GetExecutionStatusResponse,
  OneClickService,
  OpenAPI,
} from "@defuse-protocol/one-click-sdk-typescript"

import { ONE_CLICK_API_URL } from "./constants"

OpenAPI.BASE = ONE_CLICK_API_URL

/**
 * Gets a swap status
 *
 * @param depositAddress - Temporary Intents deposit address
 * @returns Swap process status
 */
export const getSwapStatus = async ({
  depositAddress,
}: {
  depositAddress: string
}): Promise<GetExecutionStatusResponse["status"]> => {
  let statusResponse: GetExecutionStatusResponse

  try {
    statusResponse = await OneClickService.getExecutionStatus(depositAddress)
  } catch (e: unknown) {
    throw new Error("Failed to fetch swap status", { cause: e })
  }

  return statusResponse.status
}
