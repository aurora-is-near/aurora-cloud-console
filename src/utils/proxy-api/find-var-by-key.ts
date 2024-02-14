import {
  ProxyApiObjectVarTypes,
  ProxyApiResponseObject,
} from "@/types/proxy-api"
import { findObjectsByVarKey } from "@/utils/proxy-api/find-objects-by-var-key"

export const findVarByKey = <T extends keyof ProxyApiObjectVarTypes>(
  varKey: string,
  varType: T,
  responses: ProxyApiResponseObject[] = [],
): ProxyApiObjectVarTypes[T] | undefined => {
  const [object] = findObjectsByVarKey(varKey, responses) ?? []

  if (!object) {
    return
  }

  const objectVar = object.Data[varType]

  if (!objectVar) {
    return
  }

  return objectVar as ProxyApiObjectVarTypes[T]
}
