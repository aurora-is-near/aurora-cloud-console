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

export type TeamSummary = Pick<Team, "id" | "name" | "team_key"> & {
  user_ids: number[]
  silo_ids: number[]
}

export type TableName = keyof Database["public"]["Tables"]

export type Tables<T extends TableName> = Database["public"]["Tables"][T]["Row"]

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T]

export type User = Tables<"users">

export type PublicApiScope = Enums<"api_key_scopes">

export type TokenType = Enums<"token_type">

export type DeploymentStatus = Enums<"deployment_status">

export type WidgetNetworkType = Enums<"widget_network_type">

export type RequestStatus = Enums<"request_status">

export type BaseTokenSymbol = Enums<"base_token_symbol">

export type ApiScope = PublicApiScope | "admin"

export type ApiKey = Tables<"api_keys">

export type Oracle = Tables<"oracles">

export type BlockscoutDatabase = Tables<"blockscout_databases">

export type Widget = Tables<"widgets">

export type Team = Tables<"teams">

export type Silo = Tables<"silos">

export type TeamSilo = Tables<"teams_silos">

export type SilosTeams = Tables<"silos_teams">

export type SiloConfigTransaction = Tables<"silo_config_transactions">

export type SiloConfigTransactionStatus =
  Enums<"silo_config_transaction_status">

export type SiloConfigTransactionOperation =
  Enums<"silo_config_transaction_operation">

export type SiloWhitelistAddress = Tables<"silo_whitelist_addresses">

export type List = Tables<"lists">

export type Deal = Tables<"deals">

export type Order = Tables<"orders">

export type Rule = Tables<"rules">

export type Userlist = Tables<"userlists">

export type RuleUser = Tables<"rule_users">

export type Filter = Tables<"filters">

export type FilterEntry = Tables<"filter_entries">

export type BridgedToken = Tables<"bridged_tokens">

export type SiloBridgedTokenMetadata = Tables<"silo_bridged_tokens">

export type SiloBridgedToken = BridgedToken & {
  is_deployment_pending: boolean
}

export type SiloBridgedTokenRequest = Tables<"bridged_token_requests">

export type OnboardingForm = Tables<"onboarding_form">

export type ChartColor = (typeof CHART_COLOURS)[number]

export type SiloWhitelistType = Enums<"address_whitelist_type">

type ChartData = {
  label: string
  chart: {
    day: number
    count: number
  }[]
}
