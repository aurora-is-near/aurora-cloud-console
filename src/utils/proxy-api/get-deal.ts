import { ProxyApiDealData } from "@/types/deal"
import { proxyApiClient } from "@/utils/proxy-api/client"
import { findVarByKey } from "@/utils/proxy-api/find-var-by-key"
import { getDealViewOperations } from "@/utils/proxy-api/get-deal-view-operations"

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
  }
}
