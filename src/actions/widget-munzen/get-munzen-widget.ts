"use server"

import * as crypto from "crypto"

import { logger } from "@/logger"

const NETWORK_EVMS = {
  AURORA: "AURORA",
  USDT: "USDT",
  USDC: "USDC",
  ETH: "ETH",
} as const

const convertToParamsString = (rec: Record<string, string>): string[] => {
  return Object.keys(rec)
    .sort((a, b) => {
      return a < b ? -1 : a > b ? 1 : 0
    })
    .map((key) => {
      return key + ":" + (rec[key] === null ? "" : rec[key])
    })
}

export const generateSign = (rec: Record<string, string>, secret: string) => {
  const forSign = convertToParamsString(rec)
  return crypto
    .createHmac("sha256", secret)
    .setEncoding("hex")
    .update(forSign.join(""))
    .digest("hex")
}

export const getMunzenWidgetUrl = (): string => {
    const externalData = '{"silo":"aurora"}'
    const toCurrency = "AURORA-AURORA"
    const signature = generateSign(
      { toCurrency, externalData },
      process.env.MUNZEN_API_SECRET,
    )

    return "https://widget.munzen.io/?" +
      new URLSearchParams({
        signature,
        toCurrency,
        externalData,
        apiKey: process.env.NEXT_PUBLIC_MUNZEN_API_KEY,
      }).toString()
  }
