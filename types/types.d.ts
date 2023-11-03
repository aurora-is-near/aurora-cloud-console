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

export type Silo = {
  href: string
  name: string
}

export type List = {
  href: string
  name: string
}

export type Transactions = {
  silos: {
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

export type User = Database["public"]["Tables"]["users"]["Row"]

export type PublicApiScope = Database["public"]["Enums"]["api_key_scopes"]

export type ApiScope = PublicApiScope | "admin"

export type ApiKey = Database["public"]["Tables"]["api_keys"]["Row"]

export type ApiUser = User & {
  scopes: ApiScopes[]
}
