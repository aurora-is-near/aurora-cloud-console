import { createDebugger } from "@/debug"

const API_BASE_URL = "https://contract-changer.aurora-cloud.dev"

const request = async <T>(
  endpoint: string,
  {
    method = "GET",
    params,
    data,
  }: {
    method?: "GET" | "POST" | "PUT" | "DELETE"
    params?: Record<string, string>
    data?: Record<string, unknown>
  } = {},
): Promise<T> => {
  const debug = createDebugger("contract-changer")
  const url = new URL(endpoint, API_BASE_URL)

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }

  const { href } = url

  debug("Contract Changer API request", href)

  const res = await fetch(href, {
    method,
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: `Basic ${btoa("test:justfortunnel")}`, // temp auth
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error(`Contract Changer API call failed: ${res.status}`)
  }

  const resultData = (await res.json()) as T

  debug("Contract Changer API response", href, JSON.stringify(data, null, 2))

  return resultData
}

export type WhitelistKind = "env-admin" | "address"

/**
 * @see https://github.com/aurora-is-near/silo-deployer
 */
export const contractChangerApiClient = {
  setBaseToken: async ({
    siloEngineAccountId,
    baseTokenAccountId,
  }: {
    siloEngineAccountId: string
    baseTokenAccountId: string
  }) =>
    request<{ tx_hash?: string }>(
      `/api/v1/contract/${siloEngineAccountId}/base_token`,
      {
        method: "POST",
        data: {
          base_token_account_id: baseTokenAccountId,
        },
      },
    ),

  toggleWhitelist: async ({
    siloEngineAccountId,
    whitelistKind,
    action,
  }: {
    siloEngineAccountId: string
    whitelistKind: WhitelistKind
    action: "enable" | "disable"
  }) =>
    request<{ tx_hash?: string }>(
      `/api/v1/contract/${siloEngineAccountId}/whitelist/${whitelistKind}/${action}`,
      { method: "POST" },
    ),
}
