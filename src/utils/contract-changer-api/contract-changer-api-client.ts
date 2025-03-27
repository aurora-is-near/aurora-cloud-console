import { createDebugger } from "@/debug"
import { getRequiredEnvVar } from "@/utils/get-required-env-var"

const API_BASE_URL = "https://silo-deployer.aurora-labs.net"

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

  const username = getRequiredEnvVar("CONTRACT_CHANGER_API_USERNAME")
  const password = getRequiredEnvVar("CONTRACT_CHANGER_API_PASSWORD")

  const res = await fetch(href, {
    method,
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      "Content-Type": "application/json",
    },
  })

  if (!res.ok) {
    throw new Error(
      `Contract Changer API call failed [${res.status}]: ${endpoint}`,
    )
  }

  const resultData = (await res.json()) as T

  debug("Contract Changer API response", href, JSON.stringify(data, null, 2))

  return resultData
}

export type WhitelistKind = "evm-admin" | "address"

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
  mirrorErc20Token: async ({
    siloEngineAccountId,
    token,
  }: {
    siloEngineAccountId: string
    token:
      | "Near"
      | "Aurora"
      | "Usdt"
      | "Usdc"
      | {
          erc20: string
          nep141: string
        }
  }) =>
    request<{ tx_hash?: string }>(
      `/api/v1/contract/${siloEngineAccountId}/erc20`,
      {
        method: "POST",
        data: {
          token,
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

  addAddressToWhitelist: async ({
    siloEngineAccountId,
    whitelistKind,
    addr,
  }: {
    siloEngineAccountId: string
    whitelistKind: WhitelistKind
    addr: string
  }) =>
    request<{ tx_hash?: string }>(
      `/api/v1/contract/${siloEngineAccountId}/whitelist`,
      {
        method: "POST",
        data: {
          addr,
          whitelist_kind: whitelistKind,
        },
      },
    ),

  removeAddressFromWhitelist: async ({
    siloEngineAccountId,
    whitelistKind,
    addr,
  }: {
    siloEngineAccountId: string
    whitelistKind: WhitelistKind
    addr: string
  }) =>
    request<{ tx_hash?: string }>(
      `/api/v1/contract/${siloEngineAccountId}/whitelist/${whitelistKind}/${addr}`,
      { method: "DELETE" },
    ),
  makeStorageDeposit: async ({
    siloEngineAccountId,
    amount,
    token,
  }: {
    siloEngineAccountId: string
    amount: string
    token: string
  }) =>
    request<{ tx_hash?: string }>("/api/v1/storage/deposit", {
      method: "POST",
      data: {
        account_id: siloEngineAccountId,
        amount,
        token,
      },
    }),
}
