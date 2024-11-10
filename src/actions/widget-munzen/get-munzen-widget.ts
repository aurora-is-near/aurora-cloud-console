"use server"

import * as crypto from "crypto"
import { Silo } from "@/types/types"

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

const generateSign = (rec: Record<string, string>, secret: string) => {
  const forSign = convertToParamsString(rec)

  return crypto
    .createHmac("sha256", secret)
    .setEncoding("hex")
    .update(forSign.join(""))
    .digest("hex")
}

export const getMunzenWidgetUrl = async (silo: Silo): Promise<string> => {
  const siloName =
    silo.chain_id === "1313161554" ? "aurora" : silo.engine_account

  const externalData = JSON.stringify({ silo: siloName })
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
