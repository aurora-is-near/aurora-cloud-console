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
  DealPrioritiesSchema,
  DealSchema,
  ListSchema,
  SiloSchema,
  WalletDetailsSchema,
} from "@/types/api-schemas"
import { ApiRequestBody } from "@/types/api"

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

  getSilo: async ({ id }: { id: number }) =>
    request<SiloSchema>(`/api/silos/${id}`),

  getSilos: async () => request<{ items: SiloSchema[] }>("/api/silos"),

  getSiloTokens: async ({ id }: { id: number }) =>
    request<Token[]>(`/api/silos/${id}/tokens`),

  getDeals: async () => request<{ items: DealSchema[] }>("/api/deals"),

  getDeal: async ({ id }: { id: number }) =>
    request<DealSchema>(`/api/deals/${id}`),

  updateDeal: async ({
    id,
    ...data
  }: { id: number } & ApiRequestBody<"updateDeal">) =>
    request<DealSchema>(`/api/deals/${id}`, {
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
    request<{
      items: DealPrioritiesSchema[]
    }>(`/api/deals/priorities`),

  updateDealPriorities: async (data: {
    priorities: {
      dealId: number
      priority: string
    }[]
  }) =>
    request<DealPrioritiesSchema>(`/api/deals/priorities`, {
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

  getLists: async () => request<{ items: ListSchema[] }>("/api/lists"),

  createList: async (data: { name: string }) =>
    request<ListSchema>("/api/lists", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getList: async ({ id }: { id: number }) =>
    request<ListSchema>(`/api/lists/${id}`),

  updateList: async ({ id, ...data }: { id: number; name: string }) =>
    request<ListSchema>(`/api/lists/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  deleteList: async ({ id }: { id: number }) =>
    request(`/api/lists/${id}`, {
      method: "DELETE",
    }),

  getListItems: async ({
    id,
    ...query
  }: {
    id: number
    limit?: number
    offset?: number
  }) =>
    request<{ total: number; items: string[] }>(`/api/lists/${id}/items`, {
      query,
    }),

  createListItems: async ({ id, ...data }: { id: number; items: string[] }) =>
    request<{ count: number }>(`/api/lists/${id}/items`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  deleteListItem: async ({ id, item }: { id: number; item: string }) =>
    request(`/api/lists/${id}/items/${encodeURIComponent(item)}`, {
      method: "DELETE",
    }),

  getWallet: async ({ address }: { address: string }) =>
    request<WalletDetailsSchema>(`/api/wallets/${address}`),
}

export type ApiClient = typeof apiClient
