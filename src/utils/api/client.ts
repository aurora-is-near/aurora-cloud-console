"use client"

import {
  ApiOperation,
  ApiRequestBody,
  ApiRequestParams,
  ApiRequestQuery,
  ApiResponseBody,
} from "@/types/api"
import { request } from "./request"

const get = async <T extends ApiOperation>(
  url: string,
  query?: ApiRequestQuery<T>,
) => request<ApiResponseBody<T>>(url, { query })

const post = async <T extends ApiOperation>(
  url: string,
  data: ApiRequestBody<T>,
) =>
  request<ApiResponseBody<T>>(url, {
    method: "POST",
    body: JSON.stringify(data),
  })

const put = async <T extends ApiOperation>(
  url: string,
  data: ApiRequestBody<T>,
) =>
  request<ApiResponseBody<T>>(url, {
    method: "PUT",
    body: JSON.stringify(data),
  })

export const apiClient = {
  getSilo: async ({ id }: ApiRequestParams<"getSilo">) =>
    get<"getSilo">(`/api/silos/${id}`),

  getSilos: async () => get<"getSilos">("/api/silos"),

  getSiloTokens: async ({ id }: ApiRequestParams<"getSiloTokens">) =>
    get<"getSiloTokens">(`/api/silos/${id}/tokens`),

  bridgeSiloToken: async ({
    id,
    ...data
  }: ApiRequestParams<"bridgeSiloToken"> & ApiRequestBody<"bridgeSiloToken">) =>
    post<"bridgeSiloToken">(`/api/silos/${id}/tokens/bridge`, data),

  getSiloOracle: async ({ id }: ApiRequestParams<"getSiloOracle">) =>
    get<"getSiloOracle">(`/api/silos/${id}/oracle`),

  createSiloOracle: async ({ id }: ApiRequestParams<"createSiloOracle">) =>
    post<"createSiloOracle">(`/api/silos/${id}/oracle`, {}),

  getWidget: async ({ id }: ApiRequestParams<"getWidget">) =>
    get<"getWidget">(`/api/silos/${id}/widget`),

  updateWidget: async ({
    id,
    ...data
  }: ApiRequestParams<"updateWidget"> & ApiRequestBody<"updateWidget">) =>
    put<"updateWidget">(`/api/silos/${id}/widget`, data),

  getDeals: async () => get<"getDeals">("/api/deals"),

  getDeal: async ({ id }: ApiRequestParams<"getDeal">) =>
    get<"getDeal">(`/api/deals/${id}`),

  createDeal: async (data: ApiRequestBody<"createDeal">) =>
    post<"createDeal">("/api/deals", data),

  updateDeal: async ({
    id,
    ...data
  }: ApiRequestParams<"updateDeal"> & ApiRequestBody<"updateDeal">) =>
    put<"updateDeal">(`/api/deals/${id}`, data),

  getSiloTransactions: async ({
    id,
    ...query
  }: ApiRequestParams<"getSiloTransactions"> &
    ApiRequestQuery<"getSiloTransactions">) =>
    get<"getSiloTransactions">(`/api/silos/${id}/transactions`, query),

  getSiloCollectedGas: async ({
    id,
    ...query
  }: ApiRequestParams<"getSiloCollectedGas"> &
    ApiRequestQuery<"getSiloCollectedGas">) =>
    get<"getSiloCollectedGas">(`/api/silos/${id}/gas-collected`, query),

  getSiloCollectedGasTotal: async ({
    id,
  }: ApiRequestParams<"getSiloCollectedGasTotal">) =>
    get<"getSiloCollectedGasTotal">(`/api/silos/${id}/gas-collected-total`),

  getWallet: async ({ address }: ApiRequestParams<"getWallet">) =>
    request<ApiResponseBody<"getWallet">>(`/api/wallets/${address}`),

  getSiloLatency: async ({
    id,
    ...query
  }: ApiRequestParams<"getSiloLatency"> & ApiRequestQuery<"getSiloLatency">) =>
    get<"getSiloLatency">(`/api/silos/${id}/latency`, query),

  getSiloRpcRequests: async ({ id }: ApiRequestParams<"getSiloRpcRequests">) =>
    get<"getSiloRpcRequests">(`/api/silos/${id}/rpc-requests`),

  getSiloFailureRate: async ({ id }: ApiRequestParams<"getSiloFailureRate">) =>
    get<"getSiloFailureRate">(`/api/silos/${id}/failure-rate`),
}

export type ApiClient = typeof apiClient
