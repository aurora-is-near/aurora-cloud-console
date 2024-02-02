import { ProxyApiUpateOperation } from "@/types/proxy-api"
import { getDealVarKey } from "@/utils/proxy-api/get-deal-var-key"

export const getDealUpdateOperations = (
  teamId: number,
  dealId: number,
  {
    enabled,
  }: {
    enabled: boolean
  },
): ProxyApiUpateOperation[] => [
  {
    op_type: "set_value",
    var_type: "number",
    var_key: getDealVarKey(teamId, dealId, "enabled"),
    number_value: enabled ? 1 : 0,
  },
]
