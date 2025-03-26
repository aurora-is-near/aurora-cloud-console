import { createDebugger } from "@/debug"
import {
  AuroraOracleContract,
  AuroraOracleToken,
} from "@/types/aurora-oracle-api"

const AURORA_ORACLE_BASE_URL = "https://aurora-oracle-mxdnqmgc2a-uc.a.run.app"

const request = async <T>(endpoint: string, init?: RequestInit): Promise<T> => {
  const debug = createDebugger("aurora-oracle")
  const { href } = new URL(endpoint, AURORA_ORACLE_BASE_URL)

  if (!process.env.AURORA_ORACLE_API_KEY) {
    throw new Error("AURORA_ORACLE_API_KEY is not set")
  }

  debug("Aurora Oracle API request", href)

  const res = await fetch(href, {
    cache: "no-store",
    method: "GET",
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.AURORA_ORACLE_API_KEY}`,
    },
    ...init,
  })

  const data = (await res.json()) as T

  if (!res.ok) {
    throw new Error(`Aurora Oracle API call failed[${res.status}]: ${endpoint}`)
  }

  debug("Aurora Oracle API response", href, JSON.stringify(data, null, 2))

  return data
}

export const auroraOracleApiClient = {
  getTokens: async () => request<{ items: AuroraOracleToken[] }>("/tokens"),
  addToken: async (data: { symbol: string; coinGeckoAlias: string }) =>
    request<{ id: string }>("/tokens", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getContracts: async () =>
    request<{ items: AuroraOracleContract[] }>("/contracts"),
}
