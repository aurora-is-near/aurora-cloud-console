import { ProxyApiViewOperation } from "@/types/proxy-api"
import { getDealVarKey } from "@/utils/proxy-api/get-deal-var-key"

export const getDealViewOperations = (
  teamId: number,
  dealId: number,
): ProxyApiViewOperation[] => [
  {
    // Check if the deal is enabled
    var_type: "number",
    key: getDealVarKey(teamId, dealId, "enabled"),
  },
]
