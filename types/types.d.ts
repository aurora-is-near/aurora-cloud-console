import { CHART_COLOURS } from "@/constants/charts"
import { Database } from "./supabase"

export type UserInfo = {
  email: string
  name: string | null
}

type Contract = {
  id: number
  created_at: string
  deal_id: number
  address: string
  name: string
}

export type Deal = {
  created_at: string
  id: number
  name: string
  key: string
  enabled: boolean
}

export type Token = {
  name: string
  address: string
  type: string
}

export type Silo = {
  id: string
  name: string
  chainId: string
  tokens: Token[]
}

type TransactionChart = {
  label: string
  transactionsCount: number
  walletsCount: number
  transactionsPerDay: {
    day: string
    count: number
  }[]
  walletsPerDay: {
    day: string
    count: number
  }[]
}

export type Transactions = {
  items: TransactionChart[]
}

export type UserDetails = {
  walletAddress: string
  transactionsCount: number
  createdAt: string
  lastTransactionAt: string
}

export type UserDetailsQuery = {
  wallet_address: string
  transactions_count: number
  created_at: string
  last_transaction_at: string
}

export type Users = {
  total: number
  users: UserDetails[]
}

export type Deals = {
  deals: Deal[]
}

export type Team = {
  id: number
  name: string
  team_key: string
}

export type Teams = {
  teams: Team[]
}

export type TeamMember = {
  id: number
  name: string | null
  email: string
}

export type TeamMembers = {
  total: number
  teamMembers: TeamMember[]
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"]

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T]

export type User = Tables<"users">

export type PublicApiScope = Enums<"api_key_scopes">

export type ApiScope = PublicApiScope | "admin"

export type ApiKey = Tables<"api_keys">

export type ApiUser = User & {
  scopes: ApiScopes[]
}

export type ChartColor = (typeof CHART_COLOURS)[number]
