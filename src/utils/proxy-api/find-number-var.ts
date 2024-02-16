import { ProxyApiResponseObject } from "@/types/proxy-api"
import { findVarByKey } from "@/utils/proxy-api/find-var-by-key"

export const findNumberVar = (
  varKey: string,
  responses: ProxyApiResponseObject[] = [],
): number | null => {
  const { value } = findVarByKey(varKey, "NumberVar", responses) ?? {}

  return value ? Number(value) : null
}
