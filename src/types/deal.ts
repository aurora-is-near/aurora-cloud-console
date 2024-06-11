import { ListType } from "@/types/lists"

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
