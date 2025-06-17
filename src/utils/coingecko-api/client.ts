import type CoinGecko from "coingecko-api"
import { createDebugger } from "@/debug"

const COINGECKO_BASE_URL = "https://api.coingecko.com/"

const request = async <T>(endpoint: string, init?: RequestInit): Promise<T> => {
  const debug = createDebugger("coingecko")
  const { href } = new URL(endpoint, COINGECKO_BASE_URL)

  debug("CoinGecko API request", href)

  const res = await fetch(href, {
    cache: "no-store",
    method: "GET",
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
    },
    ...init,
  })

  const data = (await res.json()) as T

  if (!res.ok) {
    throw new Error(`CoinGecko API call failed [${res.status}]: ${endpoint}`)
  }

  debug("CoinGecko API response", href, JSON.stringify(data, null, 2))

  return data
}

export const coinGeckoApiClient = {
  getCoin: async (id: string) =>
    request<Promise<Awaited<ReturnType<CoinGecko["coins"]["fetch"]>>["data"]>>(
      `/api/v3/coins/${id}`,
    ),

  getNearUsdPrice: async () =>
    request<Promise<Awaited<ReturnType<CoinGecko["simple"]["price"]>>["data"]>>(
      "/api/v3/simple/price?ids=near&vs_currencies=usd",
    ),
}
