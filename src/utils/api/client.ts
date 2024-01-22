"use client"

import {
  Silo,
  Deal,
  ApiKey,
  User,
  Users,
  Contract,
  TeamMembers,
  Team,
  Token,
  SiloTransactionCharts,
  DealTransactionCharts,
  DealEnabled,
} from "@/types/types"
import { request } from "./request"

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

  getSilo: async ({ id }: { id: number }) => request<Silo>(`/api/silos/${id}`),

  getSilos: async () => request<{ items: Silo[] }>("/api/silos"),

  getSiloTokens: async ({ id }: { id: number }) =>
    request<Token[]>(`/api/silos/${id}/tokens`),

  getUsers: async (query: {
    limit?: number
    offset?: number
    dealId?: number
  }) => request<Users>("/api/users", { query }),

  getUsersExport: async (query: { dealId?: number }) =>
    request<Users>("/api/users/export", { query }),

  getDeals: async () => request<{ items: Deal[] }>("/api/deals"),

  getDeal: async ({ id }: { id: number }) => request<Deal>(`/api/deals/${id}`),

  getDealEnabled: async ({ id }: { id: number }) =>
    request<DealEnabled>(`/api/deals/${id}/enabled`),

  getSilosTransactions: async (query?: { interval?: string | null }) =>
    request<SiloTransactionCharts>("/api/transactions/silos", { query }),

  getSiloTransactions: async ({
    id,
    ...query
  }: {
    id: number
    interval?: string | null
  }) =>
    request<SiloTransactionCharts>(`/api/transactions/silos/${id}`, { query }),

  getDealsTransactions: async (query?: { interval?: string | null }) =>
    request<DealTransactionCharts>("/api/transactions/deals", { query }),

  getDealTransactions: async ({
    id,
    ...query
  }: {
    id: number
    interval?: string | null
  }) =>
    request<DealTransactionCharts>(`/api/transactions/deals/${id}`, { query }),

  enableDeal: async ({ id, ...data }: { id: number; enabled: boolean }) =>
    request<Deal>(`/api/deals/${id}/enabled`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  getDealContracts: async ({ id }: { id: number }) =>
    request<Contract[]>(`/api/deals/${id}/contracts`),

  getDealContract: async ({
    id,
    contractId,
  }: {
    id: number
    contractId: number
  }) => request<Contract>(`/api/deals/${id}/contracts/${contractId}`),

  addDealContract: async ({
    id,
    ...data
  }: { id: number } & Pick<Contract, "name" | "address">) =>
    request<Contract>(`/api/deals/${id}/contracts`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  deleteDealContract: async ({
    id,
    contractId,
  }: {
    id: number
    contractId: number
  }) =>
    request(`/api/deals/${id}/contracts/${contractId}`, {
      method: "DELETE",
    }),

  updateDealContract: async ({
    id,
    contractId,
    ...data
  }: {
    id: number
    contractId: number
  } & Pick<Contract, "name" | "address">) =>
    request<Contract>(`/api/deals/${id}/contracts/${contractId}`, {
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
}

export type ApiClient = typeof apiClient
