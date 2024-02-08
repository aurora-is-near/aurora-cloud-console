import {
  ProxyApiObjectVarTypes,
  ProxyApiResponseObject,
} from "@/types/proxy-api"
import { findObjectsByVarKey } from "@/utils/proxy-api/find-objects-by-var-key"

type Foo = {
  NumberType: number
  StringType: string
}

export const findObjectByVarKey = <T extends keyof ProxyApiObjectVarTypes>(
  varKey: string,
  varType: T,
  responses: ProxyApiResponseObject[],
): ProxyApiObjectVarTypes[T] | undefined => {
  const [object] = findObjectsByVarKey(varKey, responses) ?? []

  if (!object) {
    return
  }

  const objectVar = object.Data[varType]

  if (!objectVar) {
    return
  }

  if (varType === "NumberVar") {
    return Number(objectVar.value) as ProxyApiObjectVarTypes[T]
  }

  return objectVar.value as ProxyApiObjectVarTypes[T]
}
