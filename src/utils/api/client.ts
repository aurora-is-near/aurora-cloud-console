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

const del = async <T extends ApiOperation>(url: string) =>
  request<ApiResponseBody<T>>(url, {
    method: "DELETE",
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

  createWidget: async ({ id }: ApiRequestParams<"createWidget">) =>
    post<"createWidget">(`/api/silos/${id}/widget`, {}),

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

  getSilosTransactions: async (
    query?: ApiRequestQuery<"getSilosTransactions">,
  ) => get<"getSilosTransactions">("/api/transactions/silos", query),

  getSiloTransactions: async ({
    id,
    ...query
  }: ApiRequestParams<"getSiloTransactions"> &
    ApiRequestQuery<"getSiloTransactions">) =>
    get<"getSiloTransactions">(`/api/transactions/silos/${id}`, query),

  getDealsTransactions: async (
    query?: ApiRequestQuery<"getDealsTransactions">,
  ) => get<"getDealsTransactions">("/api/transactions/deals", query),

  getDealTransactions: async ({
    id,
    ...query
  }: ApiRequestParams<"getDealTransactions"> &
    ApiRequestQuery<"getDealTransactions">) =>
    get<"getDealTransactions">(`/api/transactions/deals/${id}`, query),

  getDealPriorities: async () =>
    get<"getDealPriorities">(`/api/deals/priorities`),

  updateDealPriorities: async (data: ApiRequestBody<"updateDealPriorities">) =>
    put<"updateDealPriorities">(`/api/deals/priorities`, data),

  getLists: async () => get<"getLists">("/api/lists"),

  createList: async (data: ApiRequestBody<"createList">) =>
    request<ApiResponseBody<"createList">>("/api/lists", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getList: async ({ id }: ApiRequestParams<"getList">) =>
    get<"getList">(`/api/lists/${id}`),

  updateList: async ({
    id,
    ...data
  }: ApiRequestParams<"updateList"> & ApiRequestBody<"updateList">) =>
    put<"updateList">(`/api/lists/${id}`, data),

  deleteList: async ({ id }: ApiRequestParams<"deleteList">) =>
    del<"deleteList">(`/api/lists/${id}`),

  getListItems: async ({
    id,
    ...query
  }: ApiRequestParams<"getListItems"> & ApiRequestQuery<"getListItems">) =>
    get<"getListItems">(`/api/lists/${id}/items`, query),

  createListItems: async ({
    id,
    ...data
  }: ApiRequestParams<"createListItems"> & ApiRequestBody<"createListItems">) =>
    post<"createListItems">(`/api/lists/${id}/items`, data),

  getListItem: async ({ id, item }: ApiRequestParams<"getListItem">) =>
    get<"getListItem">(`/api/lists/${id}/items/${encodeURIComponent(item)}`),

  deleteListItem: async ({ id, item }: ApiRequestParams<"deleteListItem">) =>
    del<"deleteListItem">(`/api/lists/${id}/items/${encodeURIComponent(item)}`),

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
