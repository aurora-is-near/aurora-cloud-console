import { CHART_COLOURS } from "@/constants/charts"
import { Database } from "./supabase"

export type UserInfo = {
  email: string
  name: string | null
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

export type SiloTransactionCharts = {
  items: {
    siloId: number
    chart: TransactionChart
  }[]
}

export type DealTransactionCharts = {
  items: {
    dealId: number
    chart: TransactionChart
  }[]
}

export type TransactionsSummary = {
  walletAddress: string
  numberOfTransactions: number
  firstTransactionAt: string
  lastTransactionAt: string
}

export type TransactionsQuery = {
  wallet_address: string
  number_of_transactions: number
  first_transaction_at: string
  last_transaction_at: string
}

export type DealEnabled = {
  enabled: boolean
}

export type Teams = {
  teams: Team[]
}

export type TeamMember = {
  id: number
  name: string | null
  email: string
  isPending: boolean
}

export type TeamMembers = {
  total: number
  teamMembers: TeamMember[]
}

export type TableName = keyof Database["public"]["Tables"]

export type Tables<T extends TableName> = Database["public"]["Tables"][T]["Row"]

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T]

export type User = Tables<"users">

export type PublicApiScope = Enums<"api_key_scopes">

export type ApiScope = PublicApiScope | "admin"

export type ApiKey = Tables<"api_keys">

export type Token = Tables<"tokens">

export type Team = Tables<"teams">

export type Silo = Tables<"silos">

export type List = Tables<"lists">

export type Deal = Omit<Tables<"deals">, "enabled">

export type ApiUser = User & {
  scopes: ApiScope[]
  teams: string[]
}

export type ChartColor = (typeof CHART_COLOURS)[number]

export type ProxyDatabase = (typeof DATABASES)[number]
