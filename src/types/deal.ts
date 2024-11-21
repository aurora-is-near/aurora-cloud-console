import { ListType } from "@/types/lists"
import { Database } from "@/types/supabase_deals"

export type ProxyApiDealData = {
  enabled: boolean
  lists: Record<ListType, number | null>
  startTime: number | null
  endTime: number | null
  updatedAt: string | null
}

export type ProxyApiListData = {
  id: number
  length: number
}

export type ProxyApiListOfListsData = {
  id: number
}

export type TableName = keyof Database["public"]["Tables"]

export type Tables<T extends TableName> = Database["public"]["Tables"][T]["Row"]

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T]

export type DealAPIData = Tables<"deals">

export type Limit = Tables<"limits">

export type Filter = Tables<"filters">

export type FilterEntry = Tables<"filter_entries">
