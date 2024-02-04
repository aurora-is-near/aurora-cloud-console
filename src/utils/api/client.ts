"use client"

import {
  ApiKey,
  User,
  TeamMembers,
  Team,
  Token,
  SiloTransactionCharts,
  DealTransactionCharts,
} from "@/types/types"
import { request } from "./request"
import {
  ApiRequestBody,
  ApiRequestParams,
  ApiRequestQuery,
  ApiResponseBody,
} from "@/types/api"

export const apiClient = {
  getCurrentUser: async () => request<User>("/api/admin/current-user"),

  updateCurrentUser: async (data: Partial<Pick<User, "name">>) =>
    request<User>("/api/admin/user", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  inviteUser: async (data: Partial<Pick<User, "email" | "name">>) =>
    request("/api/admin/team/invite", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  reinviteUser: async (data: Partial<Pick<User, "email">>) =>
    request("/api/admin/team/reinvite", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getSilo: async ({ id }: ApiRequestParams<"getSilo">) =>
    request<ApiResponseBody<"getSilo">>(`/api/silos/${id}`),

  getSilos: async () => request<ApiResponseBody<"getSilos">>("/api/silos"),

  getSiloTokens: async ({ id }: { id: number }) =>
    request<Token[]>(`/api/silos/${id}/tokens`),

  getDeals: async () => request<ApiResponseBody<"getDeals">>("/api/deals"),

  getDeal: async ({ id }: { id: number }) =>
    request<ApiResponseBody<"getDeal">>(`/api/deals/${id}`),

  updateDeal: async ({
    id,
    ...data
  }: ApiRequestParams<"updateDeal"> & ApiRequestBody<"updateDeal">) =>
    request<ApiResponseBody<"updateDeal">>(`/api/deals/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  getSilosTransactions: async (query?: { interval?: string | null }) =>
    request<SiloTransactionCharts>("/api/transaction-charts/silos", { query }),

  getSiloTransactions: async ({
    id,
    ...query
  }: {
    id: number
    interval?: string | null
  }) =>
    request<SiloTransactionCharts>(`/api/transaction-charts/silos/${id}`, {
      query,
    }),

  getDealsTransactions: async (query?: { interval?: string | null }) =>
    request<DealTransactionCharts>("/api/transaction-charts/deals", { query }),

  getDealTransactions: async ({
    id,
    ...query
  }: {
    id: number
    interval?: string | null
  }) =>
    request<DealTransactionCharts>(`/api/transaction-charts/deals/${id}`, {
      query,
    }),

  getDealPriorities: async () =>
    request<ApiResponseBody<"getDealPriorities">>(`/api/deals/priorities`),

  updateDealPriorities: async (data: ApiRequestBody<"updateDealPriorities">) =>
    request<ApiResponseBody<"updateDealPriorities">>(`/api/deals/priorities`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  getApiKeys: async () => request<ApiKey[]>("/api/admin/api-keys"),

  getApiKey: async ({ id }: Partial<Pick<ApiKey, "id">>) =>
    request<ApiKey>(`/api/admin/api-keys/${id}`),

  createApiKey: async (data: Partial<Pick<ApiKey, "note" | "scopes">>) =>
    request<ApiKey>("/api/admin/api-keys", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  updateApiKey: async ({
    id,
    ...data
  }: Partial<Pick<ApiKey, "id" | "note" | "scopes">>) =>
    request<ApiKey>(`/api/admin/api-keys/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteApiKey: async ({ id }: Partial<Pick<ApiKey, "id">>) =>
    request(`/api/admin/api-keys/${id}`, {
      method: "DELETE",
    }),

  sendContactMessage: async (data: {
    subject: string
    message: string
    pageUri: string
  }) =>
    request("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getTeam: async () => request<Team>("/api/admin/team"),

  getTeamMembers: async () => request<TeamMembers>("/api/admin/team/members"),

  deleteTeamMember: async ({ id }: { id: number }) =>
    request(`/api/admin/team/members/${id}`, {
      method: "DELETE",
    }),

  getLists: async () => request<ApiResponseBody<"getLists">>("/api/lists"),

  createList: async (data: ApiRequestBody<"createList">) =>
    request<ApiResponseBody<"createList">>("/api/lists", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getList: async ({ id }: ApiRequestParams<"getList">) =>
    request<ApiResponseBody<"getList">>(`/api/lists/${id}`),

  updateList: async ({
    id,
    ...data
  }: ApiRequestParams<"updateList"> & ApiRequestBody<"updateList">) =>
    request<ApiResponseBody<"updateList">>(`/api/lists/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteList: async ({ id }: ApiRequestParams<"deleteList">) =>
    request<ApiResponseBody<"deleteList">>(`/api/lists/${id}`, {
      method: "DELETE",
    }),

  getListItems: async ({
    id,
    ...query
  }: ApiRequestParams<"getListItems"> & ApiRequestQuery<"getListItems">) =>
    request<ApiResponseBody<"getListItems">>(`/api/lists/${id}/items`, {
      query,
    }),

  createListItems: async ({
    id,
    ...data
  }: ApiRequestParams<"createListItems"> & ApiRequestBody<"createListItems">) =>
    request<ApiResponseBody<"createListItems">>(`/api/lists/${id}/items`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  deleteListItem: async ({ id, item }: ApiRequestParams<"deleteListItem">) =>
    request<ApiResponseBody<"deleteListItem">>(
      `/api/lists/${id}/items/${encodeURIComponent(item)}`,
      {
        method: "DELETE",
      },
    ),

  getWallet: async ({ address }: ApiRequestParams<"getWallet">) =>
    request<ApiResponseBody<"getWallet">>(`/api/wallets/${address}`),
}

export type ApiClient = typeof apiClient
