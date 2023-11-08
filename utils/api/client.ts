"use client"

import {
  Silo,
  Deal,
  ApiKey,
  User,
  Transactions,
  Users,
  UserDeals,
} from "@/types/types"
import { request } from "./request"

export const apiClient = {
  getCurrentUser: async () => request<User>("/api/admin/user"),

  updateCurrentUser: async (data: Partial<Pick<User, "name">>) =>
    request<User>("/api/admin/user", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  getSilos: async () => request<Silo[]>("/api/silos"),

  getUsers: async (query: {
    limit?: number
    offset?: number
    dealId?: string
  }) => request<Users>("/api/users", { query }),

  getUserDeals: async () => request<UserDeals>("/api/users/deals"),

  getDeals: async () => request<Deal[]>("/api/borealis/deals"),

  getTransactions: async (query: { interval?: string }) =>
    request<Transactions>("/api/transactions", { query }),

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
}
