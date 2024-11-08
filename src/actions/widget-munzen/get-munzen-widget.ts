"use server"

import * as crypto from "crypto"

const convertToParamsString = (rec: Record<string, string>): string[] => {
  return Object.keys(rec)
    .sort((a, b) => {
      if (a < b) {
        return -1
      }

      if (a > b) {
        return 1
      }

      return 0
    })
    .map((key) => {
      return `${key}:${rec[key] ?? ""}`
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

export const getMunzenWidgetUrl = async (): Promise<string> => {
  const externalData = '{"silo":"aurora"}'
  const toCurrency = "AURORA-AURORA"
  const signature = generateSign(
    { toCurrency, externalData },
    process.env.MUNZEN_API_SECRET,
  )

  const url = `https://widget.munzen.io/?${new URLSearchParams({
    signature,
    toCurrency,
    externalData,
    apiKey: process.env.NEXT_PUBLIC_MUNZEN_API_KEY,
  }).toString()}`

  return url
}
