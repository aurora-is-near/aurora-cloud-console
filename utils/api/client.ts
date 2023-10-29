"use client"

import { Silo, List, Deal, ApiKey, User } from "@/types/types"
import { request } from "./request"

export const apiClient = {
  getCurrentUser: async () => request<User>("/api/admin/user"),

  updateCurrentUser: async (data: {
    newName?: string,
  }) => request<User>("/api/admin/user", {
    method: "PATCH",
    body: JSON.stringify(data),
  }),

  getSilos: async () => request<Silo[]>("/api/silos"),

  getLists: async () => request<List[]>("/api/lists"),

  getDeals: async () => request<Deal[]>("/api/borealis/deals"),

  getApiKeys: async () => request<ApiKey[]>("/api/admin/api-keys"),

  createApiKey: async (data: {
    description?: string,
    scopes: string[]
  }) => request("/api/admin/api-keys", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  deleteApiKey: async (id: number) => request(`/api/admin/api-keys/${id}`, {
    method: "DELETE",
  }),
}
