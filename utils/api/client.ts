"use client"

import {
  Silo,
  Deal,
  ApiKey,
  User,
  Transactions,
  Users,
  Deals,
} from "@/types/types"
import { request } from "./request"

export const apiClient = {
  getCurrentUser: async () => request<User>("/api/admin/user"),

  updateCurrentUser: async (data: Partial<Pick<User, "name">>) =>
    request<User>("/api/admin/user", {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  inviteUser: async (data: Partial<Pick<User, "email" | "name">>) =>
    request("/api/admin/user", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getSilo: async ({ id }: { id: string }) => request<Silo>(`/api/silos/${id}`),

  getSilos: async () => request<Silo[]>("/api/silos"),

  getUsers: async (query: {
    limit?: number
    offset?: number
    dealId?: string
  }) => request<Users>("/api/users", { query }),

  getUsersExport: async (query: { dealId?: string }) =>
    request<Users>("/api/users/export", { query }),

  getDeals: async () => request<Deals>("/api/deals"),

  getDeal: async ({ id }: { id: string }) => request<Deal>(`/api/deals/${id}`),

  getSilosTransactions: async (query?: { interval?: string }) =>
    request<Transactions>("/api/transactions/silos", { query }),

  getSiloTransactions: async ({
    id,
    ...query
  }: {
    id: string
    interval?: string
  }) => request<Transactions>(`/api/transactions/silos/${id}`, { query }),

  getDealsTransactions: async (query?: { interval?: string }) =>
    request<Transactions>("/api/transactions/deals", { query }),

  getDealTransactions: async ({
    id,
    ...query
  }: {
    id: string
    interval?: string
  }) => request<Transactions>(`/api/transactions/deals/${id}`, { query }),

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
    page: string
  }) =>
    request("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),
}
