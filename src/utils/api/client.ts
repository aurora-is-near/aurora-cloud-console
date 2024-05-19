"use client"

import { request } from "./request"
import {
  ApiOperation,
  ApiRequestBody,
  ApiRequestParams,
  ApiRequestQuery,
  ApiResponseBody,
} from "@/types/api"

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

  getSiloOracle: async ({ id }: ApiRequestParams<"getSiloOracle">) =>
    get<"getSiloOracle">(`/api/silos/${id}/oracle`),

  createSiloOracle: async ({ id }: ApiRequestParams<"createSiloOracle">) =>
    post<"createSiloOracle">(`/api/silos/${id}/oracle`, {}),

  getSiloBridge: async ({ id }: ApiRequestParams<"getSiloBridge">) =>
    get<"getSiloBridge">(`/api/silos/${id}/bridge`),

  createSiloBridge: async ({ id }: ApiRequestParams<"createSiloBridge">) =>
    post<"createSiloBridge">(`/api/silos/${id}/bridge`, {}),

  getDeals: async () => get<"getDeals">("/api/deals"),

  getDeal: async ({ id }: ApiRequestParams<"getDeal">) =>
    get<"getDeal">(`/api/deals/${id}`),

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
}

export type ApiClient = typeof apiClient
