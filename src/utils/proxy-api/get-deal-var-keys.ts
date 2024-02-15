import { ProxyApiViewOperation } from "@/types/proxy-api"

export const getDealVarKeys = (
  teamId: number,
  dealId: number,
): ProxyApiViewOperation[] => {
  const baseVarKey = `deal::acc::customers::${teamId}::deals::${dealId}`

  const getOperation = (
    varType: ProxyApiViewOperation["var_type"],
    suffix: string,
  ): ProxyApiViewOperation => ({
    var_type: varType,
    key: `${baseVarKey}::${suffix}`,
  })

  return [
    getOperation("number", "enabled"),
    getOperation("number", "startTime"),
    getOperation("number", "endTime"),
    getOperation("string", "chainFilter"),
    getOperation("string", "contractFilter"),
    getOperation("string", "eoaFilter"),
    getOperation("string", "eoaBlacklist"),
  ]
}
