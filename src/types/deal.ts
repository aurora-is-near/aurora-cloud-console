import { ListType } from "@/types/lists"

export type ProxyApiDealData = {
  enabled: boolean
  lists: Record<ListType, number | null>
  startTime: number | null
  endTime: number | null
  updatedAt: string | null
}

export type ProxyApiListData = {
  length: number
}
