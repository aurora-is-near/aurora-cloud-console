import { LIST_TYPES } from "@/constants/lists"
import { ProxyApiDealData } from "@/types/deal"
import { ListMap, ListType } from "@/types/lists"
import { ProxyApiResponseObject } from "@/types/proxy-api"
import { proxyApiClient } from "@/utils/proxy-api/client"
import { findVarByKey } from "@/utils/proxy-api/find-var-by-key"
import { getDealViewOperations } from "@/utils/proxy-api/get-deal-view-operations"

const getListId = (varKey: string, responses: ProxyApiResponseObject[]) => {
  const { value } = findVarByKey(varKey, "StringVar", responses) ?? {}

  if (!value) {
    return null
  }

  return Number(value)
}

export const getDeal = async (
  teamId: number,
  dealId: number,
): Promise<ProxyApiDealData> => {
  const baseVarKey = `deal::acc::customers::${teamId}::deals::${dealId}`

  const result = await proxyApiClient.view(
    getDealViewOperations(teamId, dealId),
  )

  const responses = result.responses ?? []

  return {
    enabled: !!findVarByKey(`${baseVarKey}::enabled`, "NumberVar", responses)
      ?.value,
    lists: LIST_TYPES.reduce<ListMap>(
      (acc, listType) => ({
        ...acc,
        [listType]: getListId(`${baseVarKey}::${listType}`, responses),
      }),
      {} as ListMap,
    ),
  }
}
