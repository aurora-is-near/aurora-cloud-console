import { Database } from "./supabase"

export type UserInfo = {
  email: string
  name: string | null
}

type Contract = {
  address: string
  name: string
}

export type Deal = {
  contracts: Contract[]
  created_at: string
  id: string
  name: string
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

export type Transactions = {
  items: {
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
  }[]
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

export type UserDeal = {
  id: string
  name: string
  slug: string
}

export type UserDeals = {
  deals: UserDeal[]
}

export type User = Database["public"]["Tables"]["users"]["Row"]

export type PublicApiScope = Database["public"]["Enums"]["api_key_scopes"]

export type ApiScope = PublicApiScope | "admin"

export type ApiKey = Database["public"]["Tables"]["api_keys"]["Row"]

export type ApiUser = User & {
  scopes: ApiScopes[]
}
