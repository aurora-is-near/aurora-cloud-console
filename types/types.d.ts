import { User } from "@prisma/client"

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

export type ApiScope = PublicApiScope | "admin"

export type ApiUser = User & {
  scopes: ApiScopes[]
}
