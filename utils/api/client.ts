"use client"

import { Silo, List, Deal, ApiKey, User } from "@/types/types"
import { request } from "./request"

export const apiClient = {
  getCurrentUser: async () => request<User>("/api/admin/user"),

  updateCurrentUser: async (
    data: Partial<Pick<User, 'name'>>,
  ) => request<User>("/api/admin/user", {
    method: "PATCH",
    body: JSON.stringify(data),
  }),

  getSilos: async () => request<Silo[]>("/api/silos"),

  getUsers: async () => request<List[]>("/api/users"),

  getDeals: async () => request<Deal[]>("/api/borealis/deals"),

  getApiKeys: async () => request<ApiKey[]>("/api/admin/api-keys"),

  createApiKey: async (
    data: Partial<Pick<ApiKey, 'description' | 'scopes'>>,
  ) => request("/api/admin/api-keys", {
    method: "POST",
    body: JSON.stringify(data),
  }),

  deleteApiKey: async (id: number) => request(`/api/admin/api-keys/${id}`, {
    method: "DELETE",
  }),
}
