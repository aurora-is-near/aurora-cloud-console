import { ProxyApiResponseObject } from "@/types/proxy-api"
import { findVarByKey } from "@/utils/proxy-api/find-var-by-key"

export const findStringVar = (
  varKey: string,
  responses: ProxyApiResponseObject[] = [],
): string | null => {
  const { value } = findVarByKey(varKey, "StringVar", responses) ?? {}

  return value ?? null
}
