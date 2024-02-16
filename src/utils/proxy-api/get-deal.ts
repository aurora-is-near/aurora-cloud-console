import { LIST_TYPES } from "@/constants/lists"
import { ProxyApiDealData } from "@/types/deal"
import { ListMap } from "@/types/lists"
import { ProxyApiResponseObject } from "@/types/proxy-api"
import { proxyApiClient } from "@/utils/proxy-api/client"
import { findNumberVar } from "@/utils/proxy-api/find-number-var"
import { findStringVar } from "@/utils/proxy-api/find-string-var"
import { getDealViewOperations } from "@/utils/proxy-api/get-deal-view-operations"
import { getLastWrite } from "@/utils/proxy-api/get-last-write"

const getListId = (varKey: string, responses: ProxyApiResponseObject[]) => {
  const value = findStringVar(varKey, responses)

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
    enabled: !!findNumberVar(`${baseVarKey}::enabled`, responses),
    startTime: findNumberVar(`${baseVarKey}::startTime`, responses),
    endTime: findNumberVar(`${baseVarKey}::endTime`, responses),
    updatedAt: getLastWrite(responses),
    lists: LIST_TYPES.reduce<ListMap>(
      (acc, listType) => ({
        ...acc,
        [listType]: getListId(`${baseVarKey}::${listType}`, responses),
      }),
      {} as ListMap,
    ),
  }
}
