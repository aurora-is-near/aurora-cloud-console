import { CHART_COLOURS } from "@/constants/charts"
import { Database } from "./supabase"

export type UserInfo = {
  email: string
  name: string | null
}

export type TransactionsQuery = {
  wallet_address: string
  number_of_transactions: number
  first_transaction_at: string
  last_transaction_at: string
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

export type TableName = keyof Database["public"]["Tables"]

export type Tables<T extends TableName> = Database["public"]["Tables"][T]["Row"]

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T]

export type User = Tables<"users">

export type PublicApiScope = Enums<"api_key_scopes">

export type TokenType = Enums<"token_type">

export type DeploymentStatus = Enums<"deployment_status">

export type OnboardingStatus = Enums<"team_onboarding_status">

export type WidgetNetworkType = Enums<"widget_network_type">

export type ApiScope = PublicApiScope | "admin"

export type ApiKey = Tables<"api_keys">

export type Token = Tables<"tokens">

export type Oracle = Tables<"oracles">

export type BlockscoutDatabase = Tables<"blockscout_databases">

export type Widget = Tables<"widgets">

export type Team = Tables<"teams">

export type Silo = Tables<"silos">

export type SilosTeams = Tables<"silos_teams">

export type List = Tables<"lists">

export type Deal = Tables<"deals">

export type Order = Tables<"orders">

export type Rule = Tables<"rules">

export type Userlist = Tables<"userlists">

export type RuleUser = Tables<"rule_users">

export type Limit = Tables<"limits">

export type LimitScope = Enums<"limit_scope">

export type LimitType = Enums<"limit_type">

export type OnboardingForm = Tables<"onboarding_form">

export type ChartColor = (typeof CHART_COLOURS)[number]

export type RuleResourceDefinition = {
  chains: string
  contracts: string[]
  blacklist?: boolean
}

type ChartData = {
  label: string
  chart: {
    day: number
    count: number
  }[]
}
