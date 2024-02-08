import { ProxyApiViewOperation } from "@/types/proxy-api"
import { getDealVarKeys } from "@/utils/proxy-api/get-deal-var-keys"

export const getDealViewOperations = (
  teamId: number,
  dealId: number,
): ProxyApiViewOperation[] => Object.values(getDealVarKeys(teamId, dealId))
