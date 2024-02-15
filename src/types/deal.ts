import { ListType } from "@/types/lists"

export type ProxyApiDealData = {
  enabled: boolean
  lists: Record<ListType, number | null>
}

export type ProxyApiListData = {
  length: number
}
